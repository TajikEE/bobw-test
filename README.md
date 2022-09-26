# Bob W test

Simple app to create a rooms, bookings and auto generated invoice from bookings.

Assumptions made for the task:

- when request is made for booking, then the rooms are locked for 10 mins (set from .env). If the user does not click on the confirmation link within this time, then the rooms are free for booking again.

- task mentioned booking cost is 100 Euro, but it made more sense to calculate the cost per room since the app allows multiple rooms to be booked together per booking. So invoice amount calculates by number of rooms per booking.

- note that the email provider is a real tool, so try to use real emails for testing. If you use some temporary email service it might be blocked (might work too) but worth a mention just to be sure.

## Run with docker

- create a .env file from the .env.example
- docker-compose up from root dir

## Run on local machine

- make sure to have node and postgres installed
- check the value of host in src/configs/data-source.ts is set to process.env.DB_HOST_LOCAL
- npm i
- npm run dev

## Run tests on local machine

- follow steps from above for local machine and then: npm test

## Want to use postgres client to see data?

- make sure postgres is installed on local machine
- download any client like pgadmin 4 and then use the configs from .env file.
- note that if you are running on **local** then in the client connection option for pgadmin 4 (or any other):
  - use port as 5432
- note that if you are running on **docker** then in the client connection option for pgadmin 4 (or any other):
- use port as 5432

## Input params for different routes

- if you want to test the api with postman or similar tools then, below is a list of params that you can use and keep similar format for testing:
- for creating room:
  {
  "name": "Super expensive suite"
  }

- for creating booking:
  {
  "email": "tajik.ifrad@gmail.com",
  "roomIds": [1],
  "start": "2022-10-04T15:15:00.000Z",
  "end": "2022-10-05T15:15:00.000Z"
  }
