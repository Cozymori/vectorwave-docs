# Reference

Frequently asked questions and troubleshooting guide.

## 🛠 Troubleshooting

### DB Initialization Failure
Are you getting a `ConnectionError: Database initialization failed` error?
1. Check if the Docker container is running: `docker ps`
2. Check if `WEAVIATE_PORT` in the `.env` file matches the container port.

### Vectorization is too slow
* **HuggingFace Mode:** It may take time to download the model on the first run. It will be cached afterwards.
* **OpenAI Mode:** Check your network status. Consider `batch` processing when handling large amounts of data.

## 🤝 Contributing

VectorWave is an open-source project and we welcome your contributions!

### Contribution Areas
* Bug reports and feature suggestions (GitHub Issues)
* Documentation improvement and translation
* New feature implementation (Pull Requests)

Please refer to [CONTRIBUTING.md in the GitHub repository](https://github.com/cozymori/vectorwave/blob/main/CONTRIBUTING.md) for details.

## 📜 License

This project is distributed under the **MIT License**. You are free to modify and distribute it.
