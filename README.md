# PDF Extractor

## Prerequisites

- node >= 14.x
- graphicsmagick
- ghostscript
- configured AWS credentials

Follow [this](https://github.com/yakovmeister/pdf2image/blob/HEAD/docs/gm-installation.md) guide to install graphicsmagick and ghostscript.

## Backend

### Run

```
cd backend &&
npm install &&
cp .env.example .env &&
npm run start
```

### Tests

`npm run test:e2e`

## Frontend

### Run

```
cd frontend &&
npm install &&
cp .env.example .env &&
npm run start
```