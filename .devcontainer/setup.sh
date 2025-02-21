# bin/bash

##Comment this line for DEV, this is STATIC PROD the following lines to install yarn and serve PRODUCTION
#npm install && npm run build
yarn global add serve && npm install -g #&& serve -s build


##Uncomment the following lines to install yarn and serve DEVELOPMENT
#yarn global add serve && yarn start
#sudo chown -R $USER:$USER /workspaces/*
#yarn start