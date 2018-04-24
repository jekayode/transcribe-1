#! /bin/bash

# Add yarn to path
export PATH=$HOME/yarn/bin:$PATH

cd /home/revenge/app
# Clean out extraneous files
git clean -f 
# Pull recent changes
git pull

# Use development node environment
export NODE_ENV=development

# Install node modules and dependencies
cd /home/revenge/app/frontend && yarn install

# Build Oracle JET frontend
./node_modules/@oracle/ojet-cli/ojet.js build web --release

# Export frontend build
cp -r /home/revenge/app/frontend/web /home/revenge/app/build

# Add backend files to the mix
cp -r /home/revenge/app/api/* /home/revenge/app/build

# Add deployment script
cp /home/revenge/app/deploy.php home/revenge/app/build/

# Sync the build folder to the web root
rsync -avz --delete /home/revenge/app/build/ /var/www/dragonrevenge/

