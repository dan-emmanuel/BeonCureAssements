# R&D Full-Stack Application Assignment

## Overview

This project demonstrates a full-stack application where the backend serves static JSON files and the frontend, built with Angular, parses and displays them.

## Highlights
- **Backend**: Express server with logging capability using a custom logger. Implemented factory and strategy design patterns. Contextual information is managed using CLS.
- **Frontend**: Fast-tracked learning and application of Angular, including advanced features like Angular Router and NgRx.

## Setup & Running

### Prerequisites
- Node.js v14.x.x or higher.
- Angular CLI v12.x.x or higher.

### Installation
1. Navigate to both `./backend` and `./frontend` directories and run the following to install dependencies:
  ```bash
   npm install
  ```

### Running in Development Mode
1. Open two separate shell sessions - one for the backend and one for the frontend.

2. For the backend:
  ```bash
  cd backend
  npm run dev
  ```
3. For the frontend:
  ```bash
  cd frontend
  ng serve
  ```
4. Visit http://localhost:4200 to access the application.

### Running in Production Mode

1. Build both backend and frontend for production:
```bash
cd backend
npm run build
cd ../frontend
npm run build
```

2. After building, start the application:
```bash
npm start
```



