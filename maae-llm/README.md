# MAAe LLM Component

This is the LLM (Large Language Model) component of the MAAe project, built using FastAPI and following hexagonal architecture principles.

## Project Structure

```
maae-llm/
├── src/
│   ├── adapters/
│   │   ├── driven/         # Secondary/Output adapters
│   │   │   └── repository_adapter.py
│   │   └── driver/         # Primary/Input adapters
│   │       └── llm_adapter.py
│   ├── domain/
│   │   └── schemas/        # Domain models/schemas
│   │       └── interaction.py
│   ├── ports/
│   │   ├── driven/         # Secondary/Output ports
│   │   │   └── repository_port.py
│   │   └── driver/         # Primary/Input ports
│   │       └── llm_port.py
│   └── main.py            # FastAPI application entry point
```

## Setup and Running

1. Install dependencies:
```bash
pip install fastapi uvicorn pydantic sqlalchemy python-dotenv
```

2. Run the application:
```bash
uvicorn src.main:app --reload
```

The API will be available at http://localhost:8000

## API Endpoints

- `GET /`: Welcome message
- `POST /process-prompt`: Process a prompt through the LLM
- `GET /interaction-history`: Get history of LLM interactions

## Hexagonal Architecture

This project follows hexagonal architecture (also known as ports and adapters) principles:

- **Ports**: Define interfaces for primary (driver) and secondary (driven) operations
- **Adapters**: Implement the ports to connect with external systems
- **Domain**: Contains core business logic and models

## Development

To implement a new adapter:
1. Identify the appropriate port interface
2. Create a new adapter class implementing the port
3. Update the main application to use the new adapter