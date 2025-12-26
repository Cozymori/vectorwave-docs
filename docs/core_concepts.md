
# 핵심 기능

VectorWave의 3대 핵심 기둥인 **벡터화(Vectorization)**, **분산 추적(Distributed Tracing)**, **시맨틱 캐싱(Semantic Caching)**에 대해 깊이 알아봅니다.

## 1. 함수 벡터화 (@vectorize)

`@vectorize` 데코레이터는 VectorWave의 심장입니다. 이 데코레이터는 함수를 감싸서 **정적 정보**와 **동적 실행 정보**를 분리하여 저장합니다.

### 작동 원리

1.  **정적 저장 (Static Storage):** 코드가 로드될 때, 함수의 소스 코드, Docstring, 함수명 등을 임베딩하여 `VectorWaveFunctions` 컬렉션에 저장합니다. 이는 RAG(검색 증강 생성) 시스템의 지식 베이스가 됩니다.
2.  **동적 저장 (Dynamic Logging):** 함수가 실행될 때마다 입력값(Arguments), 반환값(Return Value), 실행 시간, 성공/실패 여부를 `VectorWaveExecutions` 컬렉션에 기록합니다.

### 주요 파라미터

```python
@vectorize(
    search_description="함수가 하는 일에 대한 요약", # 검색 정확도에 가장 중요
    sequence_narrative="함수 호출 전후의 맥락 설명", # 워크플로우 이해에 도움
    team="backend",      # (선택) 커스텀 태그
    priority=1,          # (선택) 커스텀 태그
    replay=True          # (선택) 리플레이 테스트를 위해 입출력 캡처 활성화
)
def my_function(arg1):
    pass

```

## 2. 분산 추적 (Distributed Tracing)

복잡한 비즈니스 로직은 여러 함수가 연쇄적으로 호출되는 형태를 띱니다. VectorWave는 이를 하나의 `trace_id`로 묶어 시각화할 수 있게 해줍니다.

### Root와 Span

* **Root Span (`@vectorize`)**: 추적의 시작점입니다. 여기서 고유한 `trace_id`가 생성됩니다.
* **Child Span (`@trace_span`)**: Root 함수 내부에서 호출되는 하위 함수들입니다. 부모의 `trace_id`를 자동으로 상속받습니다.

### 사용 예시

```python
from vectorwave import vectorize, trace_span

# 1. 하위 스팬 (인자 캡처 가능)
@trace_span(attributes_to_capture=['user_id'])
def validate_user(user_id):
    print("User validated.")

# 2. 루트 스팬
@vectorize(search_description="회원 가입 프로세스")
def sign_up(user_id):
    # validate_user는 sign_up과 동일한 trace_id를 공유합니다.
    validate_user(user_id) 

```

### 트레이스 검색

`search_executions` 함수를 통해 특정 트레이스 ID에 속한 모든 실행 로그를 시간순으로 조회할 수 있습니다.

## 3. 시맨틱 캐싱 (Semantic Caching)

동일한 입력뿐만 아니라, **의미적으로 유사한 입력**이 들어왔을 때 함수 실행을 건너뛰고 저장된 결과를 반환합니다. LLM 호출과 같은 고비용 연산에 매우 효과적입니다.

### 설정 방법

`semantic_cache=True`와 함께 `cache_threshold`(유사도 임계값)를 설정합니다.

```python
@vectorize(
    semantic_cache=True,        # 캐싱 활성화
    cache_threshold=0.95,       # 95% 이상 유사하면 캐시 히트
    capture_return_value=True   # 반환값 저장은 필수
)
def summarize_text(text: str):
    # 값비싼 LLM API 호출...
    return llm_response

```

* **Cache Hit:** 유사도가 0.95 이상인 과거 기록이 있다면, 함수를 실행하지 않고 즉시 결과를 반환합니다.
* **Cache Miss:** 유사한 기록이 없다면, 함수를 실행하고 그 결과를 DB에 저장합니다.

## 4. 검색 인터페이스 (Search)

저장된 데이터는 언제든지 자연어로 검색할 수 있습니다.

* **`search_functions(query="...")`**: 기능이나 목적을 자연어로 설명하여 관련 함수 코드를 찾습니다.
* **`search_executions(filters={...})`**: 특정 에러 코드, 팀, 함수명 등으로 실행 로그를 필터링하여 조회합니다.
