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
- **Husky**: Pre-commit hooks to automate code formatting and quality checks.
- **Vite**: Fast and efficient build tool.

## Screenshots
![image](https://github.com/user-attachments/assets/30bc4b69-d697-4233-a46a-04181f26531e)

![image](https://github.com/user-attachments/assets/b7df4659-7146-486a-904f-fd9310988aee)

![image](https://github.com/user-attachments/assets/7d68f2c2-fc94-48c3-94bc-83a021108b48)

![image](https://github.com/user-attachments/assets/22e31b83-a31c-4119-a742-2eb85434565e)

![image](https://github.com/user-attachments/assets/692e4c25-ad89-4bb4-b1be-8a83f8da1a93)

![image](https://github.com/user-attachments/assets/f02e37af-2809-4fb2-817f-892728344a69)

![image](https://github.com/user-attachments/assets/7f438bbf-01f0-4d97-b7fb-70d517478c16)

![image](https://github.com/user-attachments/assets/44108c73-a191-4da3-82d1-0814ad53d68d)

![image](https://github.com/user-attachments/assets/459d0404-9e7d-4eaa-b0cb-f91c74f049ea)

![image](https://github.com/user-attachments/assets/365e83ce-8b15-493d-b013-bfa436e7e333)

![image](https://github.com/user-attachments/assets/275e8197-2195-40dc-9f31-8f88b8159389)

![image](https://github.com/user-attachments/assets/001bf888-7ee0-4dab-ac77-a2c5aeaaf049)

![image](https://github.com/user-attachments/assets/1fc35329-eb5e-4df9-83db-c2a453c76bd9)

![image](https://github.com/user-attachments/assets/08826a4b-0478-490a-b602-57adf74ba64f)

![image](https://github.com/user-attachments/assets/40ff6bb1-82b8-45f8-b128-a2e4bde73b2c)


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



## Project Structure
- **`src/`**: Contains all the application code.
- **`public/`**: Static assets.
- **`db.json`**: Mock database for JSON Server.
