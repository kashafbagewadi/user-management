## User management backend app with - Node.js (JS), Express, MongoDB 

This is a MEARN stack user management application, built considering industry best practices, security and scalability by design.

### Libraries used
- Express
- Mongoose
- dotenv
- CORS
- bcrypt
- express-validator
- express-rate-limit
- jsonwebtoken
- nodemon

### Functionalities:
1. Mongoose schema design
2. CRUD operations on user module + Login API
3. Input request validation at schema level using "express-validator" library
4. Rate limiting
5. Password hashing - bcrypt
6. User "discriminatorKey" - for a multi-user site, a common user schema can inherit by roles: admin, client, seller etc
7. User authorization with JWT & refresh token

### Benefits
1. Followed the standard, moduler folder structure
2. Security:
    a. Input request validation at the schema level (before reaching to business logic)
    b. Password protection
    c. Rate limiting - intrupt too many request/attck
    d. Secrets/credential stored in .env file 
    e. Authorized each request with JWT token

### Installation guide
1. Clone the repo
2. Go to backend folder by using command: >> cd backend
3. Install packages: >> npm install
4. Run the backend: npm start