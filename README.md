# Weather Forecast Project

## Overview

This project is a weather forecasting application that provides real-time weather information using the OpenWeatherMap API. It includes a frontend built with React and Vite, and a backend built with Node.js and Express. The backend uses PostgreSQL for data storage, managed through Prisma ORM.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Clone the Repository](#clone-the-repository)
  - [Install Dependencies](#install-dependencies)
  - [Set Up PostgreSQL with pgAdmin](#set-up-postgresql-with-pgadmin)
  - [Configure Environment Variables](#configure-environment-variables)
- [Running the Project](#running-the-project)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16.0.0 or later)
- [npm](https://www.npmjs.com/) (Node package manager)
- [pgAdmin](https://www.pgadmin.org/) for PostgreSQL management
- [PostgreSQL](https://www.postgresql.org/) database server

## Getting Started

### Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/weather-forecast.git
cd weather-forecast

Install Dependencies
Navigate to the project directory and install the necessary dependencies:

npm install

This command installs both the backend and frontend dependencies using concurrently.
Set Up PostgreSQL with pgAdmin
Open pgAdmin and connect to your PostgreSQL server.

Create a new database for the project:

Right-click on Databases and select Create > Database.
Name the database (e.g., weather_forecast).
Create a new user with appropriate permissions:

Right-click on Login/Group Roles and select Create > Login/Group Role.
Enter the username (e.g., weather_user) and set a password.
Under the Privileges tab, give the user the necessary privileges for the new database.
Update the database URL in the .env file (see below for details).

Configure Environment Variables
Create a .env file in the backend directory and add the following environment variables:

DATABASE_URL=postgres://weather_user:yourpassword@localhost:5432/weather_forecast
Replace yourpassword with the password you set for the weather_user,

Run Migrations
After setting up the database, run the following command to apply the Prisma migrations:

cd backend
npx prisma migrate dev

Running the Project
To start both the frontend and backend servers, run:

npm start

This command uses concurrently to run the frontend and backend scripts simultaneously.

Frontend: http://localhost:3000
Backend: http://localhost:5000

Usage
1.Open your browser and navigate to http://localhost:3000.
2.Register a new user to access the weatherboard.
3.Log in with your new user credentials.
4.Access the weatherboard to view weather forecasts and details.

Example Registration
1.Go to the registration page.
2.Fill out the registration form with your details.
3.Submit the form to create your account.

Example Usage
Once registered and logged in, you can:

 View current weather conditions.
 See detailed weather information including temperature, humidity, wind speed, etc.

Contributing
If you’d like to contribute to this project, please follow these guidelines:

1.Fork the repository on GitHub.
2.Create a new branch for your feature or bug fix.
3.Make your changes and commit them with descriptive messages.
4.Push your changes to your forked repository.
5.Create a Pull Request with a clear description of your changes.