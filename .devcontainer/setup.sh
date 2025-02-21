# bin/bash

##Comment this line for DEV, this is STATIC PROD the following lines to install yarn and serve PRODUCTION
npm install -g && npm run build #for fleek
#npm install -g #&& serve -s build #for vps bare metal etc.

##Uncomment the following lines to install yarn and serve DEVELOPMENT
#yarn global add serve && yarn start
#sudo chown -R $USER:$USER /workspaces/*
#yarn start