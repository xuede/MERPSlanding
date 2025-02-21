# bin/bash

##Comment this line for DEV, this is STATIC PROD the following lines to install yarn and serve PRODUCTION
npm install -g && npm run build
#npm install -g #&& serve -s build


##Uncomment the following lines to install yarn and serve DEVELOPMENT
#yarn global add serve && yarn start
#sudo chown -R $USER:$USER /workspaces/*
#yarn start