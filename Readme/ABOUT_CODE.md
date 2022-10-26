# About Code

## Requirements

- [Docker](https://docs.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [Make](https://www.gnu.org/software/make/) (optional)

or

- [Node](https://nodejs.org/) 

## Developer Experience

The code is programmed inside `docker` to make it easy for the developer to install tools and configure the project. In addition to this, we ensure that all developers have the same environment and errors do not occur due to external causes. `Make` is used to write docker commands more easily.

If for some reason you don't want to use docker, you can always use the typical node commands and run the `package.json` scripts.

## Commands

### Install dependencies
```sh
make install
make install deps="express"
make install deps="-D jest"
```

### Build project
```sh
make buildImage/local # This load de .env.local file
make buildImage/prod # This load de .env.production file
```

### Start project
```sh
make start/local # This load de .env.local file
make start/prod # This load de .env.production file
```

### Run eslint
```sh
make eslint/check
make eslint/fix
```

### Run test
```sh
make test/all
make test/unit
make test/unit/watch
make test/unit/coverage
```

## Architecture

The architecture chosen for the project is the hexagonal architecture, a type of clean architecture (also known as ports and adapters architecture).

This architecture is based on separating the project into 3 layers (infrastructure, application and domain), where the flow of dependencies goes from outside to inside, leaving the domain isolated from the infrastructure so as not to depend on it and to be able to change without modifying the business logic. To achieve this we rely on dependency inversion.

## DDD

Domain Driven Design (DDD) is used in this project creating entities and value object that encapsulate the business logic and have more semantic properties and methods making an ubiquitous language with the business

## Testing

The chosen test library is `jest`. The tests for this project are unit tests and are located in the `app/test/Unit` folder.

When the command `make test/unit/coverage` is executed, a folder with the code coverage called `coverage-unit` is generated, to see the code coverage you have to open the file `coverage-unit/lcov-report/ index.html` in a browser.
