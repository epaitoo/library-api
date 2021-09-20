# Library API 
An API that manages a collection of books in a database. 

A TypeScript with Node.js and MongoDB REST API Implementation of my [Library Manager Project](https://github.com/epaitoo/sql-library-manager) WebApp which was originally built with Node.js, Express, Pug, and the SQL ORM Sequelize.

This project is also built using the [MVC (Model View Controller)](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) design pattern & the Layered Architecture.

## Features
- User Registration & Authentication using JWT
- JWT Route Protection
- Create, Read, Update & Book Deletion

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development.

* Click on the 'Clone or download' button and select 'Download Zip.'

* Move to the project directory using the terminal and run `npm install` to install the dependencies

* Create a .env file in the root of the project and add the relevant info using .env.example file in the project root

* In the project directory run `npm run dev` in the terminal to start the app on http://localhost:{PORT} to test the api

* If you have [Docker](https://www.docker.com/) installed on your machine, run the `docker-compose up` command in the terminal to run instance of the Dockerized MongoDB Database. 

* Similarly, if you have Mongodb installed locally, you can run `mongod`command in the terminal to start MongoDB on your machine or with [MongoDB Compass](https://www.mongodb.com/products/compass)

* Test the api using [Postman](https://www.postman.com/)
