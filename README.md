## DevBank Frontend

React + Vite SPA with a single page to test a configurable backend `/health` endpoint. Uses Material UI for styling and includes ready-to-use pipelines for Docker, Jenkins, and AWS CodeBuild.

### Quick view
- Single screen to enter the backend base URL and test `/health` via `fetch`.
- Pretty-printed JSON response (or error message).
- UI built with Material UI components (button, typography, container, card) in [src/App.jsx](src/App.jsx).

### Requirements
- Node.js 20+ (build image uses `node:20-alpine`).
- npm 9+.

### Install and run locally
- Install deps: `npm ci`
- Dev server: `npm run dev` (Vite defaults to `http://localhost:5173`).
- Lint: `npm run lint`
- Production build: `npm run build`
- Preview build: `npm run preview`

### How to use the page
- Enter the backend base URL, e.g. `http://localhost:3000`.
- Click “Probar /health”; the app sends `GET {baseUrl}/health` and shows the JSON response.

### Docker
- Build locally: `docker build -t devbank-frontend:local .`
- Run: `docker run -p 8080:80 devbank-frontend:local` then open `http://localhost:8080`.
- Two-stage image: Vite build on Node 20 Alpine, static serve with Nginx (see [Dockerfile](Dockerfile)).

### Jenkins
- Declarative pipeline in [Jenkinsfile](Jenkinsfile).
- Uses agent label `ec2-agent1` and Node installation `node25`.
- Steps: checkout → `npm ci` → `npm run build` → Docker image build → push to Docker Hub using credential `dockerhub-matucho01`.
- Vars: `IMAGE_REPO` (`matucho01/devbank-frontend`), `IMAGE_TAG` (`v${BUILD_NUMBER}`).

### AWS CodeBuild
- Defined in [buildspec.yml](buildspec.yml).
- Phases: Docker Hub login with `$DOCKERHUB_USERNAME` and `$DOCKERHUB_TOKEN`, image build with short commit tag, push, and `imagedefinitions.json` generation for ECS/ECR-like deploys.
- Artifact: `imagedefinitions.json`.

### Relevant structure
- [src/App.jsx](src/App.jsx): UI and `/health` check logic with Material UI.
- [Dockerfile](Dockerfile): multi-stage build and Nginx static serve.
- [Jenkinsfile](Jenkinsfile): Docker Hub CI/CD pipeline.
- [buildspec.yml](buildspec.yml): AWS CodeBuild pipeline to build and publish the image.

### Notes
- Ensure Docker Hub variables are set in both pipelines before running.
- Adjust the base URL to your environment (localhost, EC2, ECS, etc.).
