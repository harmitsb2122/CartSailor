# E-Commerce-MERN

## About
An E-Commerce application which was part of DBMS course project

Video Link : https://drive.google.com/file/d/1i6ZaNkTCh7dS9kf73Nh__gqq39Jc1eR7/view?usp=sharing

## Tech-Stack
#### Database
1. Mongoose (NoSql Database)
2. MySql (Sql database)

#### Frontend
1. Reactjs
2. Bootstrap

#### Backend
1. Nodejs
2. Expressjs

## DB Diagram
![image](https://user-images.githubusercontent.com/80470843/234785779-070c2ff7-e6d3-4977-ae64-532be69f6495.png)

Link : https://dbdiagram.io/d/644369c76b3194705102483c

## Prerequisites
1. Nodejs and node package manager
2. Crate .env as follows:<br>
Client folder .env file : 
```
REACT_APP_API = <server_port>
```
Let us say we are running server at http://localhost:3001
then - 
```
REACT_APP_API = http://localhost:3001
```
Server folder .env file :
```
MONGO_URL = <mongo_url_of_your_cluster>
JWT_SECRET = <you_jwt_secret>
PORT = <server_port>
```
3. Open mySql and create a schema named "e-commerce" and inside it a table named "payment_card".
4. The attributes for the table should be as shown in the figure below
![image](https://user-images.githubusercontent.com/80470843/235202160-59e20ef3-165d-4e82-864e-c7f44caf2dcd.png)
5. Add details by hitting the endpoint 
```
http://localhost:3001/insertOnce
```
Change the data inside server/index.js appropriately
```js
// Inserting into local db
app.get("/insertOnce", (req, res) => {
  const sqlInsert =
    "INSERT INTO payment_card (card_number,cvv,name,bank_id,balance) VALUES ('1111222233334442','822','John Doe','SBIN001',400000)";

  db.query(sqlInsert, (err, result) => {
    console.log("error", err);
    console.log("result", result);
  });
  res.send("<h1>Data Inserted</h1>");
});
```
![image](https://user-images.githubusercontent.com/80470843/235202570-c61d1d7b-d753-4cd8-a597-2e398f98b9e8.png)

6. Change the details inside server/index.js with your mySql details
```js
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: <your_password>,
  database: "e-commerce",
});
```

## Instructions to run
1. Clone the repository.
2. Go the the root directory and type
```
cd client
npm i
cd ../server
npm i
```
3. Now you are at the server folder,in order to start both server and client concurrently type
```
npm run dev
```
4.The frontend application will start at 
```
http://localhost:3000
```
### Demonstration
Video link - https://drive.google.com/file/d/1i6ZaNkTCh7dS9kf73Nh__gqq39Jc1eR7/view?usp=sharing

### Major functionalities :
- Database Normalization
- Both Sql and noSql databases
- Protected Routing System
- Extendable design

### Features of the project
Customer side
- Search for products
- View details of products
- Filter by category
- Add item to the cart
- Modify the cart
- Destination address
- View Orders
- Pay for the items (Payment Interface)
- May have multiple bank account
- Exception handling when balance is low
- View status of each order(Tracking system)
- User Dashboard

Admin side
- CRUD operation on products
- CRUD operation on categories (filter)
- Update order status
- Admin Dashboard

Common functionalites
- User registration
- Password hashing using bcrypt
- JWT authentication
