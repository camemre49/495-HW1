# CENG495 Homework 1

## Vercel Deployment

🔗 [https://495-hw-1.vercel.app](https://495-hw-1.vercel.app)

This is a simple e-commerce web application developed for CENG495 Homework 1 and deployed to Vercel. It uses MongoDB Atlas for data storage and supports basic admin and user functionalities. The app includes basic functionalities to meet the minimum requirements of the homework. Some features, such as logout, are intentionally omitted to focus on core functionalities.

---

## Login Information

Both regular users and admin users log in using a username and password. There is no role-based separation in the login method — the system determines capabilities based on user type after login. And before every operation, role is checked if necessary.

#### Example Accounts

- **Admin Account**  
  - Username: `admin`  
  - Password: `admin123`

- **Regular User Account**  
  - Username: `user`  
  - Password: `user123`

---

## Design Decisions

### Backend: Express.js

I chose **Express.js** as the backend framework for the following reasons:

- The task was relatively small, and Express offers a lightweight solution that allows rapid development.
- Express is compatible with deployment platforms like Vercel, which was a requirement. 1 line of build command was enough.
-  The code remains clean and concise if application is small. But I do not think this is the case for a big application with javascript.
-  Javascript provides flexibility without imposing strict code patterns.

While JavaScript isn’t the most robust language for large-scale e-commerce systems, for this task it provided just the right balance between simplicity and functionality.

---

### Frontend: Angular

I chose **Angular** for the frontend because I used before and:

- Angular offers routing, form handling, and HTTP client modules. I think this is useful for easy deployment.
- Angular applications are based on a component-driven, modular architecture that’s easy to use and scale.
-  The consistent nature of Angular helps in maintaining structure in the app as it grows.

---

### Regular Users

- Log in using username/password
- View profile by clicking:
    - top right profile button
- See item details by clicking:
    - item name
    - category name -> item
    - profile from top right -> item id
- Review item by:
    - Clicking submit review in item details page

### Admin Users Additional Capabilities

- Add User:
    - Open profile -> Add user button -> Fill form and submit
- Remove User:
    - Open profile -> Remove user button -> Search username -> select and delete

- Add Item:
    - Select category from home -> Click Add item on top right
- Remove Item:
    - Go to item details -> Click Remove item

---
