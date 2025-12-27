
# 시작하기 (Getting Started)

VectorWave를 설치하고 첫 번째 벡터화 함수를 만들어봅시다. 5분이면 충분합니다.

## 1. 사전 요구사항 (Prerequisites)

* **Python**: 3.10~3.13
* **Docker**: Weaviate 데이터베이스 실행을 위해 필요합니다.
* (선택) **OpenAI API Key**: AI 자동 문서화 및 고성능 임베딩 사용 시 필요합니다.

## 2. 설치 (Installation)

### 라이브러리 설치

터미널에서 `pip`를 사용하여 VectorWave 패키지를 설치합니다.

```bash
pip install vectorwave

```

### Weaviate 데이터베이스 실행

VectorWave는 Weaviate를 백엔드로 사용합니다. 프로젝트에 포함된 `docker-compose` 파일을 사용하거나, 아래 명령어로 실행할 수 있습니다.

```bash
# vw_docker.yml 다운로드 및 실행
curl -O [https://raw.githubusercontent.com/cozymori/vectorwave/main/test_ex/vw_docker.yml](https://raw.githubusercontent.com/cozymori/vectorwave/main/test_ex/vw_docker.yml)
docker-compose -f vw_docker.yml up -d

```

### 환경 변수 설정 (.env)

프로젝트 루트에 `.env` 파일을 생성하고 다음 설정을 추가하세요. 로컬 테스트를 위해 별도의 API 키가 필요 없는 `huggingface` 모드를 권장합니다.

```ini
# .env 파일 내용
WEAVIATE_HOST=localhost
WEAVIATE_PORT=8080
WEAVIATE_GRPC_PORT=50051

# 벡터화 전략 선택: huggingface (로컬 CPU, 무료)
VECTORIZER="huggingface"
HF_MODEL_NAME="sentence-transformers/all-MiniLM-L6-v2"

# 선택: OpenAI 사용 시 (VECTORIZER="openai_client")
# OPENAI_API_KEY="sk-..."

```

## 3. 퀵스타트 (Quickstart)

이제 첫 번째 VectorWave 스크립트를 작성해 보겠습니다.

### DB 초기화 및 함수 정의

`quickstart.py` 파일을 생성하고 아래 코드를 작성하세요.

```python
import time
from vectorwave import vectorize, initialize_database

# 1. 데이터베이스 연결 및 스키마 초기화
# 스크립트 시작 시 한 번만 호출하면 됩니다.
initialize_database()

# 2. 함수에 @vectorize 적용
@vectorize(
    search_description="사용자 결제를 처리하고 영수증을 반환합니다.", # 검색용 설명
    team="billing",  # 커스텀 태그
    priority=1       # 커스텀 태그
)
def process_payment(user_id: str, amount: int):
    print(f"Processing payment for {user_id}...")
    time.sleep(0.1) # 처리 시간 시뮬레이션
    return {"status": "success", "receipt_id": f"rcpt_{amount}"}

# 3. 함수 실행 (자동으로 저장됨)
if __name__ == "__main__":
    print("Function Calling...")
    result = process_payment("user_123", 5000)
    print(f"Result: {result}")

```

### 실행 결과 확인

작성한 스크립트를 실행합니다.

```bash
python quickstart.py

```

실행하면 다음과 같은 작업이 자동으로 수행됩니다:

1. `process_payment` 함수의 소스 코드와 설명이 `VectorWaveFunctions` 컬렉션에 저장됩니다.
2. 함수 실행 기록(입력값 `user_123`, `5000` 및 반환값)이 `VectorWaveExecutions` 컬렉션에 저장됩니다.

이제 이 데이터는 검색 가능하며, 추후 RAG나 테스트에 활용될 수 있습니다.
