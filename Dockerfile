# Step 1: Build the React app with Node.js
FROM node:20.15 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code into the container and build the app
COPY . .
RUN npm run build

# Step 2: Serve the built app with NGINX
FROM nginx:alpine

# Copy the build folder from the Node.js image to NGINX
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for NGINX
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]