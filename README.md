# Stolen bike Challenge

### Introduction

This project is a a backend infrastructure which try to solve the following problem:

> Stolen bikes are a typical problem in big cities. The Police want to be more efficient in resolving stolen bike cases. They decided to build a software that can automate their processes.

### Requirements

It has beend added the basic requirement for this application, which are:

**1.** Bike owners can report a stolen bike.  
**2.** A bike can have multiple characteristics: license number, color, type, full name of the owner, date, description of the theft, address where the bike was stolen, status of the case.  
**3.** Police have multiple departments that are responsible for stolen bikes.  
**4.** A department can have some amount of police officers who can work on stolen bike cases.  
**5.** The Police can scale their number of departments, and can increase the number of police officers per department.  
**6.** Each police officer should be able to search bikes by different characteristics in a database and see which department is responsible for a stolen bike case.  
**7.** New stolen bike cases should be automatically assigned to any free police officer in any department.  
**8.** A police officer can only handle one stolen bike case at a time.  
**9.** When the Police find a bike, the case is marked as resolved and the responsible police officer becomes available to take a new stolen bike case.  
**10.** The system should be able to assign unassigned stolen bike cases automatically when a police officer becomes available.

To restrict user access according to their role within the application. 3 middlewares have been implemented and are inside the `utils/middleware` folder

Moreover, I have added Swagger to provide a friendly-UI to check the endpoints, pagination of the responses and a few unit tests.

### Content

This project has a main branch when It has been working on, adding the functionalities and requirements of the application. The project has two main folder: src (where it the code of the application) and tests (which contains a few unit test cases).

Inside `src` folder, It is subdivided into the following folders:

• **config**: It has the config for: the passport-jwt, database connection, swagger, winston logger and the keys to encrypt the access JWT token .  
 • **docs**: It contains all the definitions for Swagger.  
 • **errors**: specific configuration for joi-validation errors.  
 • **features**: group all the differente features of the application in a main `api.router` file and inside its `api` folder has the different resources available.  
 • **listeners**: contains the solve stolen bike listener, that It is in charge of assign a stolen bike to a police officer available to work.  
 • **models**: It has the mongoose schemas for the diferent resources in the app: Stolen Bike, Police Officer, Department, etc.  
 • **seeders**: It contains a roles seeder file, which was used to first populate the database with the roles.  
 • **utils**: group different auxiliar functionalities: pagination, authorization and key body transformer from camel to underscore.

### Non-functional requirements

• NodeJS  
• ES6  
• Babel  
• Express  
• [hapi/Boom](https://hapi.dev/module/boom/)  
• [Joi](https://joi.dev/)  
• bcrypt  
• Winston  
• [passport-jwt](https://www.passportjs.org/packages/passport-jwt/)  
• Mongo Atlas  
• Mongoose  
• Swagger  
• JEST

### Setup Guide

1. **First** clone this respository with the command: `git clone https://github.com/ana-valdemoro/Stolen-bikes-challenge.git`
2. **Second** From the command line, install all project dependencies with: `npm i`
3. **Third** At the root of the project, there is a `.env.example` file. Rename it to only `.env`. It contains part of the set-up variables of the application.
4. **Fourth** try the project with: `npm run start:dev`
5. **Fifth**: Swagger ui is running at `http://localhost:4000/api-docs/.` So, you can open your browser and interact with the application from it.

### Test

Only It has been posible to add some unit test to:  
**StolenBikeService**: this are persistence test for which I configure a mongoDB in cache and test the create, getById and getOneUnAssignedStolen bike methods from its service  
**Authorization**: this unit test suite try to check middleware function `hasPermissions`.

To try the test, just run from the command line: `npm run test`

### Notes

• Mongo Atlas DB has been stablished with the following default data:  
 1 police director department . It credentials are email: `director@hotmail.com`, and password: `12345`  
 3 different roles (Bike owner, police officer, police director department)  
 1 department

• When a police officer is created by a police director department, by default the password is `12345`
