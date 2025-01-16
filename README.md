# Frontowcy-CarShop

Frontowcy-CarShop is a web application designed as part of the **Frontowcy course project**, aimed at creating a car configuration and ordering system. This project showcases modern web development practices and technologies.

## Features

- **Category and Parts Management**: Add and remove categories and parts dynamically.
- **Step-by-Step Car Configuration**: Navigate through categories to configure your car, ensuring at least one part is selected per category.
- **Global State Management**: Real-time state management using Zustand.
- **Price Tracking**: Displays the current total order value at each step.
- **User Details Form**: Collects user information at the final step.
- **Local Storage Integration**: Saves progress automatically, allowing users to resume where they left off.
- **Order Summary and History**: Displays a summary of the order and a history of all orders.
- **Material UI Interface**: Uses Material UI for a responsive and accessible design.
- **TypeScript Support**: Ensures type safety and better code maintainability.
- **Advanced Routing**: Powered by @tanstack/react-router for dynamic and efficient routing.

## Technical Stack

### Frontend
- **React** (v18.3.1): Core framework for building the application.
- **React Query** (@tanstack/react-query): Optimized data fetching and caching.
- **React Hook Form**: Simplifies form handling and validation.
- **Material UI**: Ensures modern, accessible UI components.
- **@tanstack/react-router**: Efficient and modern routing management.

### State Management
- **Zustand**: Lightweight state management for global and local state.

### Backend
- **JSON Server**: Serves as a mock API for managing categories, parts, and orders.

### Development Tools
- **TypeScript**: Ensures type safety and improved developer experience.
- **ESLint**: Linting to maintain consistent code quality.
- **Vite**: Fast and efficient build tool.

## Screenshots



## Installation and Setup

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/Dzumanet/Frontowcy-CarShop
    cd Frontowcy-CarShop
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Run the Application**:
    ```bash
    npm run dev
    ```

4. **Start JSON Server**:
    ```bash
    npm run json-server
    ```

5. Open the application in your browser at `http://localhost:5173`.

## Dependencies

### Core Dependencies
```json
"dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "@mui/icons-material": "^6.3.1",
    "@mui/material": "^6.3.0",
    "@tanstack/react-query": "^5.62.11",
    "@tanstack/react-router": "^1.92.9",
    "json-server": "^1.0.0-beta.3",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.54.2",
    "zustand": "^5.0.2"
}
```

### Development Dependencies
```json
"devDependencies": {
    "@eslint/js": "^9.17.0",
    "@tanstack/router-devtools": "^1.92.9",
    "@tanstack/router-plugin": "^1.91.1",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react-swc": "^3.5.0",
    "eslint": "^9.17.0",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.16",
    "globals": "^15.14.0",
    "typescript": "~5.6.2",
    "typescript-eslint": "^8.18.2",
    "vite": "^6.0.5"
}
```

## Project Structure
- **`src/`**: Contains all the application code.
- **`public/`**: Static assets.
- **`db.json`**: Mock database for JSON Server.


[Add screenshots here]