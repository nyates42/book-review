### Docker Compose for a Full-Stack Application with React, Nestjs, and PostgreSQL

This repository demonstrates how to set up a React, Nestjs server with a PostgreSQL database server inside docker containers and connect them all together.

#### How to run the application

To get this project up and running, follow these steps

1. Make sure you have Docker installed in your system. For installation steps, follow the following steps:
    1. For **[Mac](https://docs.docker.com/desktop/install/mac-install/)**
    2. For **[Ubuntu](https://docs.docker.com/desktop/install/linux-install/)**
    3. For **[Windows](https://docs.docker.com/desktop/install/windows-install/)**
2. Clone the repository into your device
3. Open a terminal from the cloned project's directory (Where the `docker-compose.yml` file is present)
4. Run the command: `docker compose up`

That's all! That should get the project up and running. To see the output, you can access `http://localhost:8000/` from the browser and you should find a web page with a list of books. This entire system with the client, server & database are running inside of docker and being accessible from your machine.

## React Application
With the container running, you will be able to access the React application at:
`http://localhost:8000/`
##### Tech used:
- ***Vite***: used to build and run the react application
- ***Typescript***: Keep type safety across the front-end app
- ***MUI***: Easy use of front-end UI components
- ***Redux Toolkit w/ Query***: Enable the application to make HTTP requests to the server and cache data
- ***Formik***: Easy form submission
- ***Yup***: Used for form validation
- ***React router***: Enable the SPA to navigate to child routes e.g. `/reviews`
##### Features:
- A form to submit a new book
- A form to submit a review for a book
- Display a list of books
- Display reviews for each book

## NestJs Server
The backend server is running on a different port. You can view the API spec at:
`http://localhost:3000/api`
##### Tech used:
- ***NestJs***: Built on top of Node to provide routing for CRUD operations
- ***Typescript***: NestJs comes with TS out of the box so this was the main reason Nest was chosen
- ***Swagger***: Used to document the API
- ***Supertest***: NestJs also comes with Supertest out of the box to perform E2E tests
- ***Prisma***: Used to handle ther Postgres DB. It has been used to control the schema, peform seeding and acts as the ORM to keep type safety across the entire application
##### API Testing:
- Test that a book can be successfully created
##### How to run tests:
With the container still running;
1. Open terminal in root directory then go to server directory `cd server`
2. Run the command `npm run test:e2e`
3. Refresh the React application front-end to see the new book was added (you will also see the test output in the terminal window)