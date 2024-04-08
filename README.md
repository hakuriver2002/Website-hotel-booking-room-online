# Introduction

Xin chào các bạn,

# Getting Started

## Feature

- CRUD
- Validation
- Security
- Responsive
- User module + Admin module

## Requirement

- Nodejs >= 18.11
- MongoDBCompass >= 1.36

## Technologies

- NodeJS
- ExpressJS
- Handlebars
- Upload - Multer
- passport
- cookie/session
- flash
- CSS
- Boostrap 5
- MongoDB

## Installation

```
$ git clone https://gitlab.duthu.net/S52000895/website-hotel-booking-online-n3.git
$ cd website-hotel-booking-online-n3

```
Tải thư viện và chạy
```
$ npm install
$ npm start
```

## Endpoints

### HTML

#### Client Module

| HTTP Method | URL                            | Description       | Note             |
| ----------- | ------------------------------ | ----------------- | ---------------- |
| `GET`       | http://localhost:3030/home     | Home Page         |                  |
| `GET`       | http://localhost:3030/login    | Login Page        |                  |
| `GET`       | http://localhost:3030/register | Register Page     |                  |
| `GET`       | http://localhost:3030/room     | Booking Room Page |                  |
| `GET`       | http://localhost:3030/profile  | Profile Page      | Require to login |

#### Admin Module

| HTTP Method | URL                                    | Description       | Note             |
| ----------- | -------------------------------------- | ----------------- | ---------------- |
| `GET`       | http://localhost:3030/admin/dashboard  | Dashboard         | Require to login |
| `GET`       | http://localhost:3030/admin/customers  | Manage Customers  | Require to login |
| `GET`       | http://localhost:3030/admin/orders     | Manage Orders     | Require to login |
| `GET`       | http://localhost:3030/admin/room_types | Manage Room Types | Require to login |
| `GET`       | http://localhost:3030/admin/rooms      | Manage Room hotel | Require to login |
| `GET`       | http://localhost:3030/admin/calendar   | Calendar          | Require to login |

### User - CRUD

#### User Service

| HTTP Method | URL                                | Description                |
| ----------- | ---------------------------------- | -------------------------- |
| `GET`       | http://localhost:3030/login        | Login Account              |
| `GET`       | http://localhost:3030/signup       | Signup Account             |
| `GET`       | http://localhost:3030/logout       | Logout Account             |
| `GET`       | http://localhost:3030/room         | Room Hotel                 |
| `GET`       | http://localhost:3030/bookroom/:id | Booking Room               |
| `POST`      | http://localhost:3030/bookroom/:id | Booking Success            |
| `GET`       | http://localhost:3030//detail/:id  | Detail Room                |
| `GET`       | http://localhost:3030/bill         | Bill Detail                |
| `GET`       | http://localhost:3030/history      | History Booking            |
| `GET`       | http://localhost:3030/history/:id  | History Booking of Account |

#### User Profile

| HTTP Method | URL                                  | Description             |
| ----------- | ------------------------------------ | ----------------------- |
| `GET`       | http://localhost:3030/profile        | Profile Account         |
| `POST`      | http://localhost:3030/update         | Update Account          |
| `POST`      | http://localhost:3030/changepassword | Change Password Account |

### Admin - CRUD

#### Customer Service

| HTTP Method | URL                                                    | Description      |
| ----------- | ------------------------------------------------------ | ---------------- |
| `GET`       | http://localhost:3030/admin/customers                  | Customer Manager |
| `GET`       | http://localhost:3030/admin/customers/:username        | Customer Detail  |
| `GET`       | http://localhost:3030/admin/customers/update/:username | Customer Edit    |
| `POST`      | http://localhost:3030/admin/customers/update/:username | Customer Update  |
| `DELETE`    | http://localhost:3030/customers/delete/:username       | Customer Delele  |

#### Room Type Service

| HTTP Method | URL                                              | Description       |
| ----------- | ------------------------------------------------ | ----------------- |
| `GET`       | http://localhost:3030/admin/room_type            | Room Type Manager |
| `POST`      | http://localhost:3030/admin/room_type            | Room Type Create  |
| `POST`      | http://localhost:3030/admin/room_type/update/:id | Room Type Update  |

#### Room Service

| HTTP Method | URL                                                 | Description      |
| ----------- | --------------------------------------------------- | ---------------- |
| `GET`       | http://localhost:3030/admin/rooms                   | Room Manager     |
| `GET`       | http://localhost:3030/admin/rooms/create            | Room Create Page |
| `POST`      | http://localhost:3030/admin/rooms/create            | Room Create      |
| `GET`       | http://localhost:3030/admin/rooms/update/:room_code | Room Update Page |
| `POST`      | http://localhost:3030/admin/rooms/update/:room_code | Room Update      |
| `DELETE`    | http://localhost:3030/admin/rooms/delete/:room_code | Room Delete      |
| `DELETE`    | http://localhost:3030/admin/rooms/room_codes/:floor | Get Code Room    |

#### Order Service

| HTTP Method | URL                                | Description   |
| ----------- | ---------------------------------- | ------------- |
| `GET`       | http://localhost:3030/admin/orders | Manage Orders |
