Overview

TodoApp is a task management application built with React Native. It allows users to create categories, add tasks under those categories, edit or delete tasks, and manage their daily to-do lists efficiently.

Features
Create Categories: Users can create new categories to organize their tasks.
Add Tasks: Within each category, users can add specific tasks that need to be accomplished.
Edit Tasks and Categories: Users can edit the name of tasks and categories.
Delete Tasks and Categories: Tasks and categories can be deleted if no longer needed.
Responsive Design: The app is optimized for different screen sizes.
Design Choices
1. Component Structure
The app is broken down into reusable components, making it easier to manage and scale.
The TodoTask screen manages the display and interaction with tasks and categories.
2. State Management
The state is managed using React's useState hook to keep track of tasks and categories.
A global state management tool like Redux was also integrated to manage the app's state if needed for larger-scale projects.
3. Navigation
React Navigation is used to handle navigation between different screens like SignIn, SignUp, AddToList, and TodoTask.
Navigation strings are stored in a constants file for easy reference and to avoid hardcoding values.
4. UI/UX
The app features a clean and simple user interface, designed to be intuitive for users.
Icons from AntDesign are used to enhance user interactions, providing visual cues for editing, deleting, and adding tasks.
Challenges Encountered
1. Navigation Cycles
Encountered issues with circular dependencies when importing navigation strings across multiple files. This was resolved by restructuring imports and ensuring there were no self-referencing cycles.
2. State Management for Nested Structures
Managing state for nested structures like categories and tasks required careful handling to ensure updates propagated correctly. This was managed using the useState hook and ensuring immutability in updates.
3. Responsive Design
Ensuring the app was responsive across different screen sizes required detailed testing and adjustments in styles using utility functions like moderateScale and textScale.
4. Handling Dynamic Data
Implementing features to add, edit, and delete tasks and categories dynamically required careful management of React's state and handling user inputs correctly.

Getting Started

Prerequisites

Node.js: Ensure Node.js is installed on your machine.
React Native: Set up React Native development environment

Installation

Clone the repository:

git clone https://github.com/Rahul1034/todolist.git

cd TodoApp


Install dependencies:

npm install


Run the app:

For Android:
npx react-native run-android

For iOS:
npx react-native run-ios
