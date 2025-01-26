#!/bin/bash 

echo "Starting Lantern Server..."

# Navigate to the project directory (ensure the script is run from project root)
cd "$(dirname "$0")" || exit 1  # Ensures script stops if directory change fails

# Start the server with PM2 (production)
pm2 start src/server.js --name lantern-server

# Uncomment the line below to use nodemon instead (development)
# nodemon src/server.js

echo "Lantern Server is running."

