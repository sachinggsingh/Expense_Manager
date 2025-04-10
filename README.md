# Expense Manager

A comprehensive full stack web application for tracking and managing personal expenses, built with the MERN stack (MongoDB, Express, React + Vite, Node.js).

## Overview

Expense Manager helps you take control of your finances by providing tools to track expenses, analyze spending patterns, and set budgets. 

## Features

- **Expense Tracking**: Record and categorize your daily expenses
- **Income Management**: Track your income sources
- **User Authentication**: Secure user accounts with authentication
- **Responsive Design**: Access from any device with a consistent experience

## Tech Stack

- **Frontend**: React.js with Redux for state management
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS with responsive design

### Setup Steps

1. Clone the repository:
   ```
   git clone https://github.com/sachinggsingh/Expense_Manage.git
   cd Expense_Manage
   ```

2. Install server dependencies:
   ```
   cd server
   npm install
   ```

3. Install client dependencies:
   ```
   cd ../client
   npm install
   ```

4. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. Start the development servers:
   
   For backend:
   ```
   cd server
   npm run dev
   ```
   
   For frontend:
   ```
   cd client
   npm start
   ```

6. Access the application at `http://localhost:3000`

## Usage

1. Register a new account or login with existing credentials
2. Add your income sources
3. Record your expenses with categories
4. View your financial dashboard for insights
5. Set budgets for different expense categories
6. Generate reports as needed

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Sachin Singh - [GitHub Profile](https://github.com/sachinggsingh)

Project Link: [https://github.com/sachinggsingh/Expense_Manage](https://github.com/sachinggsingh/Expense_Manage)
