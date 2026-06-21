# Code The Dream Todo App

![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-7-purple)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Active-success)

This is a simple todo app that allows a user to manage daily tasks. This app allows helps users stay organized by providing a straight-forward way to create, read, update and delete todos all in one place with a minimalist, feature rich user-interface.

---

## Live Demo

[View Live Demo](your-live-demo-link-here) (WIP)

---

## Screenshots

### Desktop View

<img src="src/assets/screenshot-6.png" alt="Description of image" width="400" />
<img src="src/assets/screenshot-1.png" alt="Description of image" width="400" />
<img src="src/assets/screenshot-2.png" alt="Description of image" width="400" />
<img src="src/assets/screenshot-3.png" alt="Description of image" width="400" />
<img src="src/assets/screenshot-4.png" alt="Description of image" width="400" />
<img src="src/assets/screenshot-5.png" alt="Description of image" width="400" />
<img src="src/assets/screenshot-7.png" alt="Description of image" width="400" />
<img src="src/assets/screenshot-8.png" alt="Description of image" width="400" />
<img src="src/assets/screenshot-9.png" alt="Description of image" width="400" />

### Mobile View

_Add screenshot here_

### Feature Demo (Optional)

<img src="src/assets/recording-1-800.gif" alt="Description of image" width="600" />

<img src="src/assets/recording-2-800.gif" alt="Description of image" width="800" />

---

## Table of Contents

- [Features](#features)
- [Why I Built This](#why-i-built-this)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Design Decisions](#design-decisions)
- [Challenges Faced](#challenges-faced)
- [Future Improvements](#future-improvements)
- [License](#license)
- [Contact](#contact)

---

## Features

- Create Todos
- Manage Todos
- Persistent Storage
- User Todo-Related Stats

---

## Why I Built This

I built this project as part of my Code the Dream curriculum to deepen my understanding of React by building a production-quality todo application with persistent state, secure input handling, and reusable components.

---

## Installation

### Prerequisites

#### NVM

```bash
nvm -v
```

#### Node.js

```bash
node -v
```

#### npm

```bash
npm -v
```

---

### Clone the repository

```bash
git clone ctd-todo-list-2026
```

### Navigate into the project

```bash
cd ctd-todo-list-2026
```

### Install dependencies

```bash
npm install
```

or

```bash
npm i
```

### Run the development server

```bash
npm run dev
```

---

## Usage

How to use this application.

Example:

1. Open the application in your browser.
2. Sign up for an account or log in.
3. Create new todo items.
4. Manage tasks by editing, completing, or deleting them.

---

## Available Scripts

### `npm run dev`

Starts the Vite development server using the current working directory as the project root. This provides fast development features such as Hot Module Replacement (HMR) for instant updates while editing.

source: https://vite.dev/guide/

---

### `npm run build`

Builds the application for production. Vite bundles the project into optimized static assets and outputs them into the dist directory by default.

source: https://v4.vitejs.dev/guide/static-deploy

---

### `npm run preview`

Starts a local static web server to preview the production build from the dist folder. This is useful for testing how the application will behave after deployment. Note: this is intended only for local previewing, not as a production server.

source: https://v4.vitejs.dev/guide/static-deploy

---

## Project Structure

```text
src/
├── assets/
├── components/
├── contexts/
├── features/
├── hooks/
├── pages/
├── reducers/
├── shared/
├── utils/
└── App.jsx
```

This project’s folder structure is based on the organizational patterns provided through the Code the Dream curriculum, with minor adjustments to improve clarity and maintainability. The goal is to create an intuitive structure that makes it easier for developers new to the codebase to navigate components, features, and application logic.

---

## Technologies Used

- React
- Vite
- JavaScript (ES6+)
- DOMPurify (for sanitizing user input)
- Tailwind CSS

---

## Design Decisions

### State Management

Explain your approach and why.

---

### Security / Validation

Explain how you handle user input or data validation.

---

### Styling Approach

Explain your styling decisions.

---

### Architecture

Explain any notable architectural patterns.

---

## Challenges Faced

Describe challenges you encountered.

What was difficult?

How did you solve it?

What did you learn?

---

## Future Improvements

- Implement a light and dark mode toggle for improved accessibility and user preference customization.
- Add a streak tracking system to encourage consistency and habit-building.
- Develop a comprehensive statistics dashboard for tracking productivity and task completion trends, including an average time of a todos lifecycle.
- Create a trash bin system to allow recovery of accidentally deleted tasks.
- Introduce due dates and editable deadlines for improved task scheduling and prioritization.

---

## License

This project is licensed under the **MIT** License.

See the `LICENSE` file for details.

---

## Contact

**Edward Bordenave**

GitHub: https://www.github.com/ebordenave

LinkedIn: https://www.linkedin.com/in/ebordenave

Email: edward.bordenave@gmail.com
