

# Workery Day - User Management Dashboard

## Project Overview  
Workery Day is a full-stack web application designed as a User Management Dashboard. It provides a platform for managing user profiles, tracking performance, handling attendance, and managing role-based access. This project uses the PERN stack (PostgreSQL, Express.js, React.js, and Node.js).

---

## Features  
- **Secure User Authentication**: Uses JWT for secure login.
- **Employee Profile Management**: Admin can manage employee data such as role, contact details, and more.
- **Real-Time Attendance Tracking**: Employees can log their attendance, and it is tracked in real-time.
- **Leave Management**: Employees can request leave, and managers can approve or reject.
- **Performance Monitoring**: Track and monitor employee performance.
- **Role-Based Access Control**: Different roles have different levels of access to the system.
- **Dynamic Reporting**: Admin can generate reports on employees’ activities, attendance, and performance.

---

## Technology Stack  
- **Frontend**: React.js, Material UI, Redux/Context API, React Router
- **Backend**: Node.js, Express.js, PostgreSQL, JWT for Authentication
- **Database**: PostgreSQL for managing relational data.

---

## Installation Guide

### Frontend Setup  
1. Clone the repository to your local machine.
2. Navigate to the "Frontend" directory.
3. Install the required dependencies by running:
   ```
   npm install
   ```
4. Start the frontend server with:
   ```
   npm run dev
   ```
   The frontend will be available at [http://localhost:3000](http://localhost:3000).

### Backend Setup  
1. Navigate to the "Backend" directory.
2. Install the required dependencies by running:
   ```
   npm install
   ```
3. Start the backend server with:
   ```
   nodemon server.js
   ```
   The backend will be available at [http://localhost:3001](http://localhost:3001).

4. **Database Sync**:  
   To synchronize the database schema with the models, run the following script:
   ```
   node src/scripts/synDB.js
   ```

---

## Usage

Once both the frontend and backend are running, you can access the app at:
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend**: [http://localhost:3001](http://localhost:3001)

---

## GitHub Repository

For more details and to contribute, visit the GitHub repository:  
[https://github.com/yohansbekele12/WorkerDay.git](https://github.com/yohansbekele12/WorkerDay.git)

---

## License

This project is open-source and available under the MIT License.

---

