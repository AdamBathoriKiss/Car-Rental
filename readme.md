# A&L Car Rental

## Description of the project

This is a car rental page, what created for clients and agents, who can handle the basic operations for renting a car.
They can booking, resigning and change the booking days.

## Getting Started - Wireframes

As a good developer, we started our project with Wireframes, where we sketch our ideas and created a plan what we could follow.

## Our User Stories

* As a client, I want to see the available cars with all of the necessary parameters to help me decide whether to rent
* As a client, I want to create an account to book the chosen cars
* As a client, I want to book (create a booking) cars including the selected time slots to get cars when it's needed to me
* As a client, I want to update or delete my bookings to modify them, if it's needed
* As a client, I want to update or delete my user profile to maintain my personal data
* As an agent, I want to create, update and delete cars to maintain the list of the available cars for the clients
* As an agent, I want to manage the bookings to approve or reject the clients' booking requests
* As an agent, I want to update or delete client profiles to maintain the client database
* As an agent, I want to update or delete my user profile to maintain my personal data
* As an admin, I want to set and maintain the agents who will manage the cars and the bookings
* As a visitor, I want to see the list of available cars and time slots, and also collect all the necessary information to make decision for the registration

## Technologies Used

* Express
* MongoDB & Mongoose
* MongoDB Atlas - db deployment
* Heroku - app deployment
* Bootstrap
* Handlebars

## Models

We have three models, one for the users, another one for the cars, and the last one is for the bookings.
In the users model we placed a value what could help to check, the current user is client or agent.

### Users model

In here we have the following structure:

* username: Storing the client/agent's username, what they can use on the page
* email: Storing the client/agent's e-mail
* passwordHash: Storing the client/agent's password, and used hash for encrypting
* firstName: Storing the client/agent's firstname
* lastName: Storing the client/agent's lastname
* dateOfBirth: Storing the client/agent's date of birth
* idCardNumber: Storing the client/agent's id card number
* idDriverLicense: Storing the client/agent's driver license number
* address: Storing the client/agent's address
* isAgent: Storing this information for distinction the clients and agents
* bookings: Storing the client's bookings.

### Cars model

* make: Storing the car's make (brand) 
* model: Storing the car's model
* yearOfProd: Storing the car's year of production
* engine: Storing the car's engine ccm
* transmission: Storing the car's transmission type
* fuel: Storing the car's fuel type 
* extras: Storing the car's extras list
* rentalCost: Storing the car's renting cost
* status: Storing the car's renting status
* imageUrl: Storing the car's image
* description: Storing the description of car's 

### Bookings model

* client: Storing all datas from users model
* numberOfDays: Storing the days what booked by clients
* bookedCar: Storing the booked cars

## Server routes table(Method, Route or URL, Description as columns)

| Route              | Description           |
| -------------      |:-------------:|
| Home               | Direct to the home page |
| Sign Up            | Direct to the signup page      |
| Log In             | Direct to the Login page     |
| Cars               | If user not logged in, direct to the login page,     else direct to the cars page.    |
| User Profile   | If user not logged in, direct to the login page, else direct to the cars page.       |
| Logout   | Logging out the user     |


## Project link

The link for our application is: https://car-rental92.herokuapp.com/

## Future plans with the project


##  Resources

* For design we used mainly a Bootstrap templates
* Cloudinary used as storage for our pictures on the web page
* For the basics, used Ironlauncher npm package - it responsible for
main structure and contains all the necessary packages

## Team members

* László Tarnai
* Ádám Báthori-Kiss
