# ✅ Todo App

A task management application built using **Vue 3**, **Vite**, **TypeScript**, and **Pinia**. It allows users to create, edit, delete, and filter tasks, with persistent state across browser reloads using `localStorage`.

---

## 🛠️ Setup Instructions

1. **Clone the repository**
   ```bash
   https://github.com/adr143/todo_app_vue.git
   cd todo_app_vue
   
2. Install Dependencies

   Make sure you have [Node.js](https://nodejs.org/) (v16 or higher) installed.
   
   Then install the project dependencies using:

   ```bash
   npm install

3. Running the Development Server

   To start the development server:
   
   ```bash
   npm run dev

## 💡 Brief Description of the Solution

This Todo App is built using modern front-end technologies, with the following key features:

- **Vue 3 Composition API** for modular and reactive component architecture.
- **Vite** for fast development and optimized production builds.
- **TypeScript** for type safety and better development experience.
- **Pinia** for state management, allowing centralized task handling and state persistence using the LocalSctorage.
- **LocalStorage** used via Pinia plugins to maintain tasks even after browser reloads.
- **Tailwind CSS** for a clean, responsive, and modern UI design to minimize writing custom CSS.
- **Component-based structure** for maintainability and scalability.

The application includes a task form, a filtered task list, and animation effects for dynamic UX.

---

## 🗃️ Explanation of State Persistence

State persistence in this app is achieved using **Pinia's `store.$subscribe()` API** in combination with the browser's **`localStorage`**.

### Implementation Details

1. **Saving to `localStorage`:**

   When the `taskStore` is initialized, we subscribe to store changes:

   ```ts
   taskStore.$subscribe((mutation, state) => {
     localStorage.setItem('tasks', JSON.stringify(state.tasks))
   })

2. **Loading from localStorage on initialization**

   When the store is created, it loads tasks from localStorage if available:

   ```ts
   const stored = localStorage.getItem('tasks')
   tasks.value = stored ? JSON.parse(stored) : []
   ```
   
This ensures that every time a task is added, updated, or deleted, the new state is serialized and saved in the browser’s localStorage.

