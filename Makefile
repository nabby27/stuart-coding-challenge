BACK_CONTAINER_NAME=stuart_back
ENV_FILE_LOCAL=.env.local
ENV_FILE_PROD=.env.production

setEnv/local:
	sudo cp $(ENV_FILE_LOCAL) .env

setEnv/prod:
	sudo cp $(ENV_FILE_PROD) .env

install: setEnv/local
	@docker compose run --rm $(BACK_CONTAINER_NAME) npm install $(deps)
	@docker compose run --rm $(BACK_CONTAINER_NAME) chown -R node:node .

buildApp/prod:
	@docker compose run --rm --service-ports $(BACK_CONTAINER_NAME) npm run build

buildApp/dev:
	@docker compose run --rm --service-ports $(BACK_CONTAINER_NAME) npm run build

buildImage/local: setEnv/local buildApp
	@docker build -t $(REGISTRY)/$(REPOSITORY):$(TAG) .

buildImage/prod: setEnv/prod buildApp
	@docker build -t $(REGISTRY)/$(REPOSITORY):$(TAG) .

start/local: setEnv/local
	@docker compose run --rm --service-ports $(BACK_CONTAINER_NAME) npm run start

start/prod: setEnv/local
	@docker compose run --rm --service-ports $(BACK_CONTAINER_NAME) npm run start

eslint/check:
	@docker compose run --rm $(BACK_CONTAINER_NAME) npm run eslint:check

eslint/fix:
	@docker compose run --rm $(BACK_CONTAINER_NAME) npm run eslint:fix
	@docker compose run --rm $(BACK_CONTAINER_NAME) chown -R node:node .

test/all: setEnv/local
	@docker compose run --rm $(BACK_CONTAINER_NAME) npm run test:all

test/unit: setEnv/local
	@docker compose run --rm $(BACK_CONTAINER_NAME) npm run test:unit

test/unit/watch: setEnv/local
	@docker compose run --rm $(BACK_CONTAINER_NAME) npm run test:unit:watch

test/unit/coverage: setEnv/local
	@docker compose run --rm $(BACK_CONTAINER_NAME) npm run test:unit:coverage
	@docker compose run --rm $(BACK_CONTAINER_NAME) chown -R node:node .
