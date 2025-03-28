#!/bin/bash

# Define the root directory for your backend
ROOT_DIR="backend"

# Create the main directory
mkdir -p $ROOT_DIR

# Create directories for the MVC components
mkdir -p $ROOT_DIR/controllers
mkdir -p $ROOT_DIR/models

# Create directories for the ECS architecture
mkdir -p $ROOT_DIR/entities
mkdir -p $ROOT_DIR/components
mkdir -p $ROOT_DIR/systems

# Additional directories for routes, config, and utilities
mkdir -p $ROOT_DIR/routes
mkdir -p $ROOT_DIR/config
mkdir -p $ROOT_DIR/utils

# Optional: Initialize a new Node.js project
cd $ROOT_DIR
npm init -y

# Optional: Install Express, if you're planning to use it
npm install express

# Return to the original directory
cd ..

echo "Backend directory structure initialized."
