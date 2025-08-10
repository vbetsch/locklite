[//]: # (<img src="LOGO_PATH" alt="LOGO_NAME" style="width: 500px;">)

# Locklite

🔐 Intranet password manager for
businesses [![Build Status](https://github.com/vbetsch/lockLite/actions/workflows/ci.yml/badge.svg)](https://github.com/vbetsch/lockLite/actions)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=black)

### Documentation

- [Test Plan (C2.3.1)](docs/RECETTES.md)
- [Defect Correction Plan (C2.3.2)](docs/BOGUES.md)

### Dependencies

You have to install these softwares before starting :

- [**Docker** Engine](https://docs.docker.com/engine/install/)
- [**Docker** Compose](https://docs.docker.com/compose/install/)
- [**NodeJS** (v.22.17.1)](https://nodejs.org/en/blog/release/v22.17.1)

### Table of contents

Choose your operating system :

- [Windows](#windows)
- [MacOS](#macos)
- [Linux](#linux)

<h2 id="windows">Windows</h2>

We recommend using a WSL for this project. If so, please follow the [Linux](#linux) procedure.

### Installation

1. Create a `.env` file by copying the example file `.env.example` file. These values are only for the local
   environment, you can modify it if you want.

2. Start docker services with the following command

```shell
docker-compose up -d
```

3. You need to install NodeJS packages

```shell
npm install
```

4. Generate database schema

```shell
npm run prisma:push
```

5. Generate data with Prisma seed

```shell
npm run prisma:seed
```

### Getting Started

1. Launch the application in development mode

```shell
npm run dev
```

2. Well done, the application is running!

- UI : http://localhost:3000/ui (homepage)
- API : http://localhost:3000/api/docs (Swagger documentation)

### Quality Assurance

- Run unit tests

```shell
npm test
```

- Run unit tests with coverage

```shell
npm run test:cov
```

### Database

- Reset Prisma database

```shell
npm run prisma:reset
npm run prisma:seed
```

<h2 id="macos">MacOS</h2>

### Installation

1. Create a `.env` file by copying the example file `.env.example` file. You can modify it if you want.

2. Start docker services with the following command

```shell
docker-compose up -d
```

3. You need to install NodeJS packages

```shell
npm install
```

4. Generate database schema

```shell
npm run prisma:push
```

5. Generate data with Prisma seed

```shell
npm run prisma:seed
```

### Getting Started

1. Launch the application in development mode

```shell
npm run dev
```

2. Well done, the application is running!

- UI : http://localhost:3000/ui (homepage)
- API : http://localhost:3000/api/docs (Swagger documentation)

### Quality Assurance

- Run unit tests

```shell
npm test
```

- Run unit tests with coverage

```shell
npm run test:cov
```

### Database

- Reset Prisma database

```shell
npm run prisma:reset
npm run prisma:seed
```

<h2 id="linux">Linux</h2>

### Installation

1. Create a `.env` file by copying the example file `.env.example` file. You can modify it if you want.

2. Start docker services with the following command

```shell
docker-compose up -d
```

3. You need to install NodeJS packages

```shell
npm install
```

4. Generate database schema

```shell
npm run prisma:push
```

5. Generate data with Prisma seed

```shell
npm run prisma:seed
```

### Getting Started

1. Launch the application in development mode

```shell
npm run dev
```

2. Well done, the application is running!

- UI : http://localhost:3000/ui (homepage)
- API : http://localhost:3000/api/docs (Swagger documentation)

### Quality Assurance

- Run unit tests

```shell
npm test
```

- Run unit tests with coverage

```shell
npm run test:cov
```

### Database

- Reset Prisma database

```shell
npm run prisma:reset
npm run prisma:seed
```
