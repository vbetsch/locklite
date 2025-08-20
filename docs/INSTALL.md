[Back to README](README.md)

# Installation guide

### Dependencies

You have to install these softwares before starting :

- [**Docker** Engine](https://docs.docker.com/engine/install/)
- [**Docker** Compose](https://docs.docker.com/compose/install/)
- [**NodeJS** v.22.17.1](https://nodejs.org/en/blog/release/v22.17.1)

### Table of contents

Choose your operating system :

- [Windows](#windows)
- [MacOS](#macos)
- [Linux](#linux)

<h2 id="windows">Windows</h2>

We recommend using a WSL for this project. If so, please follow the [Linux](#linux) procedure.

### A. Requirements

1. Create a `.env` file by copying the example file [.env.example](../.env.example) file. These values are only for the local
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

### B. Getting Started

1. Launch the application in development mode

```shell
npm run dev
```

2. Well done, the application is running!

- UI : http://localhost:3000/ui (homepage)
- API : http://localhost:3000/api/docs (Swagger documentation)

### C. Quality Assurance

- Run unit tests

```shell
npm test
```

- Run unit tests with coverage

```shell
npm run test:cov
```

### D. Database

- Reset Prisma database

```shell
npm run prisma:reset
npm run prisma:seed
```

<h2 id="macos">MacOS</h2>

### A. Requirements

1. Create a `.env` file by copying the example file [.env.example](../.env.example) file. You can modify it if you want.

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

### B. Getting Started

1. Launch the application in development mode

```shell
npm run dev
```

2. Well done, the application is running!

- UI : http://localhost:3000/ui (homepage)
- API : http://localhost:3000/api/docs (Swagger documentation)

### C. Quality Assurance

- Run unit tests

```shell
npm test
```

- Run unit tests with coverage

```shell
npm run test:cov
```

### D. Database

- Reset Prisma database

```shell
npm run prisma:reset
npm run prisma:seed
```

<h2 id="linux">Linux</h2>

### A. Requirements

1. Create a `.env` file by copying the example file [.env.example](../.env.example) file. You can modify it if you want.

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

### B. Getting Started

1. Launch the application in development mode

```shell
npm run dev
```

2. Well done, the application is running!

- UI : http://localhost:3000/ui (homepage)
- API : http://localhost:3000/api/docs (Swagger documentation)

### C. Quality Assurance

- Run unit tests

```shell
npm test
```

- Run unit tests with coverage

```shell
npm run test:cov
```

### D. Database

- Reset Prisma database

```shell
npm run prisma:reset
npm run prisma:seed
```
