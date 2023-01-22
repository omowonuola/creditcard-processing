CREDIT CARD PROCESSING API

- REST API Nestjs
- Swagger documentation, nextjs logger, ...
- Folder structure, code samples and best practices

## 1. Getting started

### 1.1 Requirements

Before starting, make sure you have these components on your local machine:

- An up-to-date release of [NodeJS](https://nodejs.org/) and NPM/YARN
- An in-memory database such as @nestjs-addons/in-memory-db (https://www.npmjs.com/package/@nestjs-addons/in-memory-db)

### 1.2 Project configuration

Start by cloning this project on your local machine.

``` sh
git clone https://github.com/omowonuola/creditcard-processing
NOTE: The Main branch is the update branch for the codebase
```

The next step will be to install all the dependencies of the project.

```sh
yarn install
```

For a standard development configuration, you can leave the default values for PORT, which has the default value of 3000 in the main.ts file.

### 1.3 Launch and discover

You are now ready to launch the NestJS application using the command below.

```sh
# Launch the development server with yarn command
yarn start:dev
```

You can now head to `http://localhost:3000/api#/cards` and see the API Swagger docs. The example card API that gets all cards in the system is located at the `http://localhost:3000/api#/cards/CardsController_getAllCards` endpoint in the documentation.

## 2. Project structure

This template was made with a well-defined directory structure.

```sh
src/
├── cards
│   ├── cards.controller.ts # The card controller file contains the api calls for creating new cards, getting all cards and getting card by card number
│   ├── card.entity.ts/  # The entity file contains the data model structure and type, it references to the in-memory-db-entity
│   ├── cards.module.ts
│   ├── cards.repository.ts # The repository file references the database
│   ├── cards.service.ts # The service file has the create and get database query
│   ├── cards.service.spec.ts # The service.spec file has the test file for the service functions
├── dto
│   ├── create-card.dto.ts # The file contains the data DTO
├── validators
│   ├── cards-number.validator.spec.ts # The test file for card number validator
│   ├── cards-number.validator.ts # The file for card number validation
└── main.ts
```

## 3. Default YARN commands

The YARN commands below are already included with this template and can be used to quickly run, build and test the project.

```sh
# Start the application using yarn NodeJS in development
yarn start:dev (use this to start the application locally)

# Run the project' unit tests
yarn test:watch(use this to start the unit testing locally)

```

## 4. Project goals

The goal of this project is to build a credit card process which includes creating new card details in the system with NestJS.

