# Nest.js Demo Project

This project is a demonstration of using Nest.js to create a microservices architecture. It includes two microservices in a mono-repository setup: `user-service` and `product-service`.

## Services

### User Service

The `user-service` manages user-related operations and authentication. Key features include:

- **User Roles:** Supports two roles - 'user' and 'admin'.
- **Role-Based Access Control:** Utilizes a custom role decorator to annotate specific APIs with required roles for access control.
- **Data Storage:** Stores user data and roles in a PostgreSQL database using TypeORM.
- **Authentication:** Implements local and JWT passport strategies for user authentication.
- **Role Enforcement:** Uses guards to enforce role policies.
- **Swagger Documentation:** Access the API documentation at `http://localhost:3000/api`.

#### Endpoints

- `POST /auth/register`: Register a new user.
- `POST /auth/login`: User login, returning a JWT token upon successful authentication.
- `GET /auth/profile`: return the user profile by parsine the provided jwt token.
- `GET /auth/list-all`: return a list of all users in the system, guarded by admin role.
### Product Service

The `product-service` is a simple service showcasing the usage of TypeORM with PostgreSQL. It includes:

- **TypeORM Integration:** Uses TypeORM for database operations with methods like `find`, `findBy`, and others.
- **Query Builder:** Demonstrates the use of TypeORM's query builder for complex queries.
- **Pagination, Filtering, and Sorting:** Implements these features on the product entity.
- **JWT Token Usage:** Extracts user information from the JWT token for certain operations.
- **Secured Endpoints:** Utilizes AuthGuard to secure endpoints based on user authentication.
- **Swagger Documentation:** Access the API documentation at `http://localhost:7777/api`.

## Prerequisites

- Installed [Node.js](https://nodejs.org/).
- Installed [Docker](https://www.docker.com/).
- Installed [Nest.js]().
- Familiarity with PostgreSQL database operations.

## Installation

1. **Clone the Repository**

    ```bash
    git clone https://gitlab.com/pub-back-end/nest-test.git
    cd nestjs-demo-project
    ```

2. **Start PostgreSQL using Docker Compose**

    ```bash
    docker-compose up -d
    ```

3. **Create Databases**

    ```sql
    CREATE DATABASE "product-service";
    CREATE DATABASE "user-service";
    ```
or use the adminer ui on `http://localhost:8080`

<!-- 4. **Install Dependencies**

    ```bash
    npm install
    ``` -->

## Running the Project

- For production: ```bash 
npm run start ```
- For development: ```bash 
npm run start:dev```

## Contributing

To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.


---

*Note: Replace placeholder URLs and paths with your actual project details.*
