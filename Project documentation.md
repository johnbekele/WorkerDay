# Department – IT in Business Specialty Web Application Development

**Name**: Yohans Bekele  
**Album No**: 48306  
**Course**: Programming Languages for Web Applications  
**Course Instructor**: Cezary Graul

## Project Details

**Project**: Final Project - User Management Dashboard  
**Project GitHub Repository**: [https://github.com/yohansbekele12/WorkerDay.git](https://github.com/yohansbekele12/WorkerDay.git)

### Used Stack
- **PERN Stack**:
  - **P**: PostgreSQL
  - **E**: Express.js
  - **R**: React.js
  - **N**: Node.js


# **Employee Management System - Workery Day**

## **Introduction**

Welcome to **Workery Day**, a comprehensive full-stack web application developed as part of the "Programming Languages for Web Applications" course. The goal of this project is to showcase an **Employee Management System** that leverages modern technologies to streamline employee tracking, performance management, and leave requests, all within a secure, easy-to-use interface.

---

## **Technical Stack**

### **Frontend**

- **React.js**: Used to build dynamic user interfaces with a component-based architecture.
- **Material UI**: A popular React UI framework providing modern and responsive design components.
- **Accentuity**: Helps enhance the UI/UX experience through advanced styling.
- **React Router**: Provides client-side routing for seamless navigation.
- **Redux/Context API**: Handles global state management efficiently across components.

### **Backend**

- **Node.js**: A runtime environment to build the server-side logic and APIs.
- **Express.js**: A minimalistic web framework for Node.js to handle routing and API management.
- **PostgreSQL**: A powerful relational database used to store employee data securely.
- **REST API**: Provides a standardized way for the frontend to communicate with the backend.
- **JWT**: Used for securing endpoints and user authentication.

---

## **Key Features**

- **Secure User Authentication**: Employees can securely log in and access personalized features.
- **Employee Profile Management**: Allows the admin to manage employee data such as role, contact details, and more.
- **Real-Time Attendance Tracking**: Allows real-time logging and monitoring of employee attendance.
- **Leave Request System**: Employees can request leave, and managers can approve or reject the requests.
- **Performance Monitoring**: Enables tracking of employee performance over time, with feedback and evaluations.
- **Dynamic Reporting**: Provides customizable reports based on employee data.
- **Role-Based Access Control**: Different users (admin, manager, employee) have access to different functionalities based on their role.

---

## **Development Focus**

This project focuses on modern JavaScript practices and emphasizes several important software engineering concepts, including:

- **Modern JavaScript (ES6+)**: Leverage the latest features of JavaScript for clean, efficient code.
- **Component-Based Architecture**: Structure the frontend with reusable components.
- **RESTful API Design**: Develop APIs that adhere to REST principles for clean communication between frontend and backend.
- **Database Relationships**: Implement proper relationships in the PostgreSQL database (e.g., one-to-many, many-to-many).
- **State Management Patterns**: Use Redux or Context API for handling complex state across the application.
- **Responsive Design**: Ensure the web application works seamlessly on all devices and screen sizes.
- **Security Best Practices**: Secure the application with JWT and implement proper authorization mechanisms.

---

## **Project Details**

- **Submitted by**: Yohans Bekele (48306)
- **Course Instructor**: Cezary Graul

---

## **Installation Guide**

To set up and run the **Workery Day** Employee Management System locally, follow the steps below:

### **Frontend Setup**

1. **Navigate to the frontend directory**:
   ```bash
   cd Frontend
   ```

2. **Install dependencies**:
   Ensure you have **Node.js** and **npm** installed, then run:
   ```bash
   npm install
   ```

3. **Start the development server**:
   To run the frontend application, use:
   ```bash
   npm run dev
   ```
   This will start a **Vite** development server, and the application will be available at [http://localhost:3000](http://localhost:3000).

### **Backend Setup**

1. **Navigate to the backend directory**:
   ```bash
   cd Backend
   ```

2. **Install dependencies**:
   Make sure **Node.js** and **npm** are installed, then run:
   ```bash
   npm install
   ```

3. **Run the backend server**:
   Start the backend with **nodemon** for hot-reloading:
   ```bash
   nodemon server.js
   ```
   The backend will run on [http://localhost:3001](http://localhost:3001).

4. **Database Sync**:
   To synchronize the database schema with the models, run:
   ```bash
   node src/scripts/synDB.js
   ```
   This will ensure that your PostgreSQL database is set up properly with the necessary tables and relationships.

### **Final Notes**

Once both the frontend and backend servers are running, you should be able to access the full **Employee Management System** at:

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend**: [http://localhost:3001](http://localhost:3001)



