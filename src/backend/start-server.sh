#!/bin/bash

echo "Starting Lantern Server..."

# Navigate to the project directory
cd "$(dirname "$0")"

# Start the server with PM2 (production)
pm2 start src/server.js --name lantern-server

# Uncomment the line below to use nodemon instead (development)
# nodemon src/server.js

echo "Lantern Server is running."
