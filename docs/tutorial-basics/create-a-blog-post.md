말씀하신 대로 `VectorWaveAutoInjector`는 단순히 `inject`만 호출하는 것이 아니라, **`configure`를 통한 전역 설정**과 **`auto=True` 모드에서의 메타데이터 일괄 등록** 과정이 핵심입니다.

보여주신 내용을 바탕으로 **심화 기능 (Advanced Features)** 문서의 **"3. 자동 주입 (Auto-Injection)"** 섹션을 상세하게 수정했습니다.

아래 내용을 `docs/advanced-features.md` 파일에 덮어씌워 주세요.

### 📄 `docs/advanced-features.md` (Auto-Injection 섹션 대폭 수정됨)

```markdown
---
sidebar_position: 4
---

# 심화 기능

VectorWave를 활용하여 자동화된 문서화, 강력한 회귀 테스트, 그리고 자가 치유 시스템을 구축하는 방법을 알아봅니다.

## 1. AI 자동 문서화 (Auto-Documentation)

일일이 `search_description`을 작성하기 귀찮으신가요? LLM에게 맡기세요.
함수의 코드를 분석하여 설명(Description)을 생성하고, 이를 **벡터 DB에 저장**하거나 **소스 코드에 직접 주입(Inject)**할 수 있습니다.

### 설정 및 실행

1.  **OpenAI 설정:** `.env` 파일에 `OPENAI_API_KEY`가 있어야 합니다.
2.  **`auto=True` 마킹:** 데코레이터에 `auto=True`를 추가합니다.
3.  **메타데이터 생성:** 서버 시작 시점이 아닌, 별도의 스크립트로 실행하는 것을 권장합니다.

```python
# 1. 마킹 (소스 코드)
@vectorize(auto=True)
def complex_algo(data):
    pass

# 2. 생성 및 주입 스크립트 (generate_docs.py)
from vectorwave import generate_and_register_metadata

# inject=True: 생성된 설명을 소스 파일의 Docstring으로 자동 삽입합니다.
generate_and_register_metadata(inject=True)

```

## 2. 테스트 및 리플레이 (Replay Testing)

운영 환경(Production)의 실제 데이터를 테스트 케이스로 활용하는 강력한 기능입니다.

### 🚀 더 강력한 검증: VectorCheck (CLI)

단순한 문자열 비교(`assert a == b`)는 AI 응답 테스트에 적합하지 않습니다.
**[VectorCheck](https://github.com/cozymori/vectorcheck)**는 벡터 유사도를 기반으로 AI의 **"의도(Intent)"**를 검증하는 독립적인 CLI 도구입니다.

**설치:**

```bash
pip install vectorcheck

```

**설정 (`vwtest.ini`):**

```ini
[vectorcheck]
python_paths = src

; 1. LLM 요약 함수 (랜덤성 높음) -> 유사도 85% 이상이면 통과
[test:my_module.generate_summary]
strategy = similarity
threshold = 0.85

; 2. URL 생성 함수 (결정적) -> 정확히 일치해야 함
[test:my_module.generate_url]
strategy = exact

```

**실행:**

```bash
vw test
vw test --target my_module.generate_summary
vw test --exact

```

### 코드 기반 리플레이 (Basic)

CLI 도구 없이 코드 내에서 간단히 리플레이하고 싶다면 `VectorWaveReplayer`를 사용할 수 있습니다.

```python
from vectorwave.utils.replayer import VectorWaveReplayer
replayer = VectorWaveReplayer()
result = replayer.replay("my_module.process_payment", limit=10)
print(f"성공: {result['passed']}, 실패: {result['failed']}")

```

## 3. 자동 주입 (Auto-Injection)

비즈니스 로직 코드를 직접 수정하지 않고(`@vectorize` 없이), 외부에서 VectorWave 기능을 주입할 수 있습니다. 레거시 코드나 수정 권한이 없는 라이브러리에 유용합니다.

### 사용 방법 (How to use)

1. **초기화 (Initialize):** DB 연결을 먼저 수행합니다.
2. **전역 설정 (Configure):** `team`, `priority` 등 공통 태그를 설정합니다.
3. **주입 (Inject):** 타겟 모듈 경로를 문자열로 지정합니다.
4. **등록 (Register):** `auto=True` 모드 사용 시, 메타데이터를 일괄 등록합니다.

```python
from vectorwave import initialize_database, VectorWaveAutoInjector, generate_and_register_metadata
import my_service.payment # 타겟 모듈 (예시)

# 1. DB 초기화
initialize_database()

# 2. 전역 설정 구성 (Configure)
VectorWaveAutoInjector.configure(
    team="billing-team", # 모든 주입 대상 함수에 적용될 태그
    priority=1,
    auto=True            # True: 메타데이터 수집 후 대기 (Pending), False: 즉시 저장
)

# 3. 모듈 주입 (Inject)
# 'my_service.payment' 모듈 내의 함수들에 자동으로 VectorWave가 적용됩니다.
# 소스 코드를 건드릴 필요가 없습니다!
VectorWaveAutoInjector.inject("my_service.payment")

# 4. 메타데이터 등록 (auto=True인 경우 필수)
# 메모리에 수집된 메타데이터를 DB에 일괄 저장합니다.
generate_and_register_metadata()

# 5. 비즈니스 로직 실행
# 이제 함수가 실행될 때마다 자동으로 벡터화 및 로깅이 수행됩니다.
my_service.payment.process_transaction()

```

## 4. 자가 치유 (Self-Healing)

`VectorWaveHealer`는 에러가 발생한 함수에 대해, 과거의 성공했던 로그와 현재의 실패 로그, 그리고 소스 코드를 종합 분석하여 수정된 코드를 제안합니다.

```python
from vectorwave import VectorWaveHealer

healer = VectorWaveHealer(model="gpt-4")
patch = healer.diagnose_and_heal("buggy_function_name")
print(patch) # 제안된 코드 패치 출력

```

## 5. 데이터 아카이빙 (Archiving)

데이터베이스 용량 관리를 위해 오래된 로그를 JSONL 파일로 내보내거나 삭제할 수 있습니다.

```python
from vectorwave.database.archiver import VectorWaveArchiver

archiver = VectorWaveArchiver()
archiver.export_and_clear(
    function_name="my_func",
    output_file="data_backup.jsonl",
    clear_after_export=True
)

```

## 6. 데이터 드리프트 감지 (Data Drift)

사용자 입력 패턴이 기존 학습 데이터와 달라지는 현상(Drift)을 감지합니다.

### 작동 원리

새로운 입력 데이터가 들어올 때, 기존에 저장된 데이터들과의 **벡터 거리(Vector Distance)**를 계산합니다. 거리가 임계값(`DRIFT_DISTANCE_THRESHOLD`)보다 멀다면, 이는 새로운 유형의 데이터일 가능성이 높습니다.

### 설정 (.env)

```ini
DRIFT_DETECTION_ENABLED=True
DRIFT_DISTANCE_THRESHOLD=0.25

```

## 7. 골든 데이터셋 관리 (Golden Dataset)

회귀 테스트나 자가 치유의 기준이 되는 **검증된 정답 데이터**를 구축합니다.

### 데이터셋 매니저 사용

```python
from vectorwave.database.dataset import VectorWaveDatasetManager
manager = VectorWaveDatasetManager()

```

### 1. 골든 데이터 등록 (Register)

검증된 실행 로그를 골든 데이터로 승격시킵니다.

```python
manager.register_as_golden(log_uuid="...", note="표준 성공 케이스")

```

### 2. AI 추천 시스템 (Recommendation)

**밀도 기반 추천(Density-Based Recommendation)**을 통해 테스트 케이스로 적합한 로그를 AI가 제안합니다.

```python
candidates = manager.recommend_candidates(function_name="process_payment", limit=5)
for item in candidates:
    # STEADY: 기존 패턴과 유사 (안정성 검증용)
    # DISCOVERY: 새로운 패턴 (커버리지 확장용)
    print(f"[{item['type']}] UUID: {item['uuid']}")

```

```

```