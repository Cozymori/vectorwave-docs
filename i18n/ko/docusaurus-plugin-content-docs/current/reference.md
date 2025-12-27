
# 참고 자료

자주 묻는 질문과 문제 해결 가이드입니다.

## 🛠 문제 해결 (Troubleshooting)

### DB 초기화 실패
`ConnectionError: Database initialization failed` 오류가 발생하나요?
1. Docker 컨테이너가 실행 중인지 확인하세요: `docker ps`
2. `.env` 파일의 `WEAVIATE_PORT`가 컨테이너 포트와 일치하는지 확인하세요.

### 벡터화가 너무 느려요
* **HuggingFace 모드:** 처음 실행 시 모델을 다운로드하느라 시간이 걸릴 수 있습니다. 이후에는 캐시됩니다.
* **OpenAI 모드:** 네트워크 상태를 확인하세요. 대량의 데이터를 처리할 때는 `batch` 처리를 고려해야 합니다.

## 🤝 기여하기 (Contributing)

VectorWave는 오픈 소스 프로젝트이며 여러분의 기여를 환영합니다!

### 기여 분야
* 버그 제보 및 기능 제안 (GitHub Issues)
* 문서 개선 및 번역
* 새로운 기능 구현 (Pull Requests)

자세한 내용은 [GitHub 저장소의 CONTRIBUTING.md](https://github.com/cozymori/vectorwave/blob/main/CONTRIBUTING.md)를 참고해 주세요.

## 📜 라이선스

이 프로젝트는 **MIT License** 하에 배포됩니다. 자유롭게 수정하고 배포할 수 있습니다.

