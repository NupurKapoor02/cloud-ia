## Building a Three-Tier Application with Docker

In this project, we are building a simple web application following the three tier architecture. We'll go over how to use Docker containers to create a three-layer website with a front end, a back end, and a database in this tutorial. 


---

### Step 1: Creating Directories and Checking Docker Status

Begin by creating two folders in the main directory(here website): frontend and backend.
```tsql
website/
│
├── frontend
├── backend
```
Ensure that Docker is installed and running on your system. Make sure it's up to date to avoid any compatibility issues.



### Step 2: Frontend Setup

Now, let's delve into setting up a frontend application using React and Docker. You'll need to incorporate your own React application into this directory structure and to create the container of the react app, you need to create a Dockerfile in the frontend folder.
```tsql
frontend/
│
├── frontend code
└── Dockerfile
```
Inside the Dockerfile within the frontend folder, include the following code:

```powershell
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Once you've completed this, you can create the image for your React app by executing the following command within the frontend directory: 

```powershell
docker build -t frontend .
```

This will generate an image named frontend for your frontend. You can view this image in Docker Desktop or by executing the following command:
```powershell
docker images ls
```

### Step 3: Backend Setup
Just like setting up the frontend, let's now create a Dockerfile for our backend Node.js application. You'll need to add your own Node.js application into this directory structure:

```tsql
backend/
│
├── your backend code (app.js)
└── Dockerfile
```
Inside the Dockerfile within the backend folder, include the following code:

```powershell
FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```
Once you've completed this, you can create the image for your backend by executing the following command within the backend directory:

```powershell
docker build -t backend .
```

This will generate an image named backend for your backend. If you've reached this point, great work! Now, we'll proceed to integrate these images.



### Step 4: Final Integration

To seamlessly integrate our Docker images, we'll create a docker-compose.yml file in the root directory of our project. This file will outline the services required for our blog application and specify their interactions.

Here's how the directory structure should look:

```tsql
website_container/
│
├── frontend
├── backend
└── compose.yaml
```
Inside the compose.yaml file, include the following code:

```powershell
version: '3'

services:
  frontend:
    image: frontend
    ports:
      - "3000:3000"

  backend:
    image: backend
    restart: always
    ports:
      - "3001:3001"
    depends_on:
      - mongodb
    environment:
      - MONGO_URI="Your MongoDB URI"

  mongodb:
    image: mongo
    restart: always
    container_name: mongodb
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_DATABASE=test
      - MONGO_INITDB_ROOT_USERNAME=usernmae
      - MONGO_INITDB_ROOT_PASSWORD=pwd
```

#### Explanation of the Compose File:

We define three services: frontend, backend, and mongodb.

The frontend service utilizes the frontend Docker image and maps port 3000 of the host to port 3000 of the container.

The backend service uses the backend Docker image, sets it to restart always, and maps port 3001.

The mongodb service uses the official MongoDB Docker image, sets it to restart always, and maps port 27017.

### Step 5: Running the images together:
To start our integrated application, we simply run the ```powershell docker-compose up ``` command in the terminal. Docker Compose reads the docker-compose.yml file, pulls the necessary images, creates containers, and starts the services defined in the file.

Once you execute the command you will be able to see the running containers in the Docker Desktop.

Here's how you can view the output for each service in your Docker Compose setup:

### Step 6: Accessing the website

Frontend Service (frontend):
To access the frontend, open a web browser and go to http://localhost:3000. This URL matches the port mapping specified in your docker-compose.yml file for the frontend service.

Backend Service (backend):
Your backend is accessible at http://localhost:3001.

MongoDB Service (mongodb):
Typically, you won't directly view the MongoDB service output in a web browser. Instead, interact with the MongoDB database using tools like a MongoDB client or command-line tools such as mongo.
