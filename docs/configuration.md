

# 설정 및 운영 (Configuration)

VectorWave는 `pydantic-settings`를 기반으로 강력하고 타입 안전한 설정 관리를 제공합니다.
모든 설정은 **`.env` 파일** 또는 **시스템 환경 변수**를 통해 제어할 수 있습니다.

## 1. 연결 및 스키마 (Connection & Schema)

Weaviate 데이터베이스 연결과 데이터가 저장될 컬렉션(Table) 이름을 정의합니다.

| 변수명 | 설명 | 기본값 |
| :--- | :--- | :--- |
| `WEAVIATE_HOST` | Weaviate 인스턴스 호스트 주소 | `localhost` |
| `WEAVIATE_PORT` | HTTP 포트 (REST API) | `8080` |
| `WEAVIATE_GRPC_PORT` | gRPC 포트 (대량 데이터 전송용) | `50051` |
| `COLLECTION_NAME` | 함수 메타데이터(정적 정보) 저장 컬렉션명 | `VectorWaveFunctions` |
| `EXECUTION_COLLECTION_NAME` | 실행 로그(동적 정보) 저장 컬렉션명 | `VectorWaveExecutions` |
| `GOLDEN_COLLECTION_NAME` | 테스트용 골든 데이터셋 저장 컬렉션명 | `VectorWaveGoldenDataset` |
| `IS_VECTORIZE_COLLECTION_NAME` | 함수 정의(정적 데이터) 저장 여부 (False면 로그만 저장) | `True` |

## 2. AI 및 벡터화 전략 (AI & Vectorizer)

데이터를 임베딩(Vectorize)하는 엔진과 모델을 설정합니다.

### 전략 선택 (`VECTORIZER`)

| 값 | 설명 |
| :--- | :--- |
| **`huggingface`** | (기본값) 로컬에서 `sentence-transformers` 모델 사용. 무료 & 보안 우수. |
| `openai_client` | OpenAI API 사용. 높은 정확도, 과금 발생. |
| `weaviate_module` | Weaviate 서버 내부의 모듈(`text2vec-*`) 위임. |
| `none` | 벡터화 비활성화 (단순 저장). |

### 세부 설정

| 변수명 | 설명 | 기본값 |
| :--- | :--- | :--- |
| `HF_MODEL_NAME` | HuggingFace 모델명 (로컬 모드 시 사용) | `sentence-transformers/all-MiniLM-L6-v2` |
| `OPENAI_API_KEY` | OpenAI API 키 (`sk-...`) | `None` |
| `WEAVIATE_VECTORIZER_MODULE` | Weaviate 모듈 모드 시 사용할 모듈명 | `text2vec-openai` |
| `WEAVIATE_GENERATIVE_MODULE` | Weaviate 생성 모듈명 (RAG 용) | `generative-openai` |

## 3. 성능 및 배치 (Performance & Batching)

실시간 처리와 대량 데이터 처리 사이의 균형을 조절합니다. VectorWave는 기본적으로 **비동기 배치(Async Batch)**를 사용합니다.

| 변수명 | 설명 | 기본값 |
| :--- | :--- | :--- |
| `BATCH_THRESHOLD` | 배치 버퍼 크기. 이 개수가 차면 DB로 전송합니다. | `20` |
| `FLUSH_INTERVAL_SECONDS` | 버퍼가 차지 않아도 이 시간이 지나면 강제 전송합니다. | `2.0` (초) |

> **Tip:** 트래픽이 많은 프로덕션 환경에서는 `BATCH_THRESHOLD`를 `100` 이상으로 높여 처리량을 극대화하세요.

## 4. 보안 및 데이터 마스킹 (Security)

민감한 개인정보나 비밀키가 벡터 DB에 저장되지 않도록 자동으로 마스킹합니다.

| 변수명 | 설명 | 기본값 |
| :--- | :--- | :--- |
| `SENSITIVE_FIELD_NAMES` | 마스킹할 키워드 목록 (콤마로 구분). 해당 키워드가 포함된 인자는 `[MASKED]`로 치환됩니다. | `password,api_key,token,secret,auth_token` |

```python
# 예시: password 인자는 자동으로 마스킹되어 저장됨
@vectorize
def login(username, password): ... 

```

## 5. 모니터링 및 알림 (Monitoring & Alerting)

에러 발생 시 외부로 알림을 보냅니다.

| 변수명 | 설명 | 기본값 |
| --- | --- | --- |
| `ALERTER_STRATEGY` | 알림 전략 (`webhook`, `log`, `none`) | `none` |
| `ALERTER_WEBHOOK_URL` | 슬랙/디스코드 웹훅 URL | `None` |
| `ALERTER_MIN_LEVEL` | 알림을 보낼 최소 로그 레벨 (`INFO`, `WARNING`, `ERROR`) | `ERROR` |

## 6. 고급 분석 (Advanced Analytics)

데이터의 변화를 감지하거나 추천 시스템을 위한 설정입니다.

### 📉 데이터 드리프트 (Drift Detection)

입력 데이터의 분포가 학습(또는 과거) 데이터와 달라지는 현상을 감지합니다.

| 변수명 | 설명 | 기본값 |
| --- | --- | --- |
| `DRIFT_DETECTION_ENABLED` | 드리프트 감지 기능 활성화 여부 | `False` |
| `DRIFT_DISTANCE_THRESHOLD` | 드리프트로 판정할 벡터 거리 임계값 (0~2) | `0.25` |
| `DRIFT_NEIGHBOR_AMOUNT` | 비교할 최근 이웃 데이터 개수 | `5` |

### 🎯 추천 마진 (Recommendation Margins)

유사도 검색 시 탐색 범위를 조절합니다.

| 변수명 | 설명 | 기본값 |
| --- | --- | --- |
| `RECOMMENDATION_STEADY_MARGIN` | 안정적인(유사한) 추천 범위 | `0.05` |
| `RECOMMENDATION_DISCOVERY_MARGIN` | 새로운(다양한) 추천 발견 범위 | `0.15` |

## 7. 파일 경로 설정

| 변수명 | 설명 | 기본값 |
| --- | --- | --- |
| `CUSTOM_PROPERTIES_FILE_PATH` | 커스텀 메타데이터 스키마 파일 경로 | `.weaviate_properties` |
| `FAILURE_MAPPING_FILE_PATH` | 에러 코드 매핑 파일 경로 | `.vectorwave_errors.json` |

