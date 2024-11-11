# Service "User"

## Description

User service for some system

## Requirements

* NodeJS 18.18+
* TypeScript 5+

## Swagger
http://HOST:PORT/api/docs#/

## Installation and launch

### Environment variables

| Variable      | Description       | Type      | Value  |
|---------------|-------------------|-----------|--------|
| **Server**    |                   |           |        |
| `PORT`        | HTTP server PORT  | `Number`  | 8000   |
| `HOST`        | HTTP server HOST  | `String`  |        |
| `LOG_LEVEL`   | Logging level     | `String`  | `info` |
| **Database**  |                   |           |        |
| `DB_HOST`     | Database host     | `String`  |        |
| `DB_PORT`     | Database port     | `Number`  |        |
| `DB_USERNAME` | Database user     | `String`  |        |
| `DB_PASSWORD` | Database password | `String`  |        |
| `DB_NAME`     | Database name     | `String`  |        |

Preset file values in `.env.(development|production)`

To apply the required configurations for a loop:

```bash
$ cp .env.(development|production) .env
```

### Development

```bash
$ yarn && yarn start:debug
```

### Production

```bash
$ yarn && yarn build
$ yarn start:prod
```

## Creating a new version of application

Add a new changes

```bash
$ git add .
```

Create a commit

```bash
$ git commit -m 'Commit comments'
```

Version increment (patch), a new commit and tag will be created automatically

```bash
$ yarn version --patch # specify the exact assembly version, for example: 0.0.1
$ yarn version --minor # auto increase minor version: 0.1.0
$ yarn version --major # auto increase minor version: 1.0.0
```

Publishing changes

```bash
$ git push
$ git push --tags
```
