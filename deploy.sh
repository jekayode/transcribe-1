#! /bin/bash

# Add yarn to path
export PATH=$HOME/yarn/bin:$PATH

# Use development node environment
export NODE_ENV=development

# Set app path
export APP=/home/revenge/app

# Set build directory
export BUILD=${APP}/build

# Set web server root directory
export WEBROOT=/var/www/dragonrevenge

# Enter app directory
cd $APP

# Clean out extraneous files
git clean -f

# Remove previous build artifacts
rm -rfv ${APP}/build

# Pull recent changes
git pull

# Install node modules and dependencies
cd ${APP}/frontend && yarn install

# Build Oracle JET frontend
./node_modules/@oracle/ojet-cli/ojet.js build web --release

# Export frontend build
cp -r ${APP}/frontend/web $BUILD

# Add backend files to the mix
cp -r ${APP}/api/* $BUILD

# Add deployment script
cp ${APP}/deploy.php $BUILD

# Sync the build folder to the web root
rsync -avz --delete ${BUILD}/ ${WEBROOT}/

