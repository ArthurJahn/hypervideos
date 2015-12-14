#!/bin/sh

# install java env
sudo aptitude install -y default-jre
sudo aptitude install -y default-jdk

# install git
sudo aptitude install -y git

# install curl
sudo aptitude install -y curl

# install nodejs
sudo curl -sL https://deb.nodesource.com/setup_5.x | bash -
sudo aptitude install -y nodejs
sudo aptitude install -y npm

# install mongo database
sudo aptitude install -y mongodb-org
sudo aptitude install -y mongodb

# install meteor
sudo curl https://install.meteor.com/ | sh

# install npm deps: bower, velocity, eslint
sudo npm install -g bower
sudo npm install -g velocity
sudo npm install -g eslint
sudo npm install -g js-beautify
sudo npm install -g web-component-tester
sudo npm install -g web-component-tester-istanbul
sudo npm install -g eslint-html-reporter

#install chrome

echo "deb http://dl.google.com/linux/deb/ stable non-free main" >> /etc/apt/sources.list

sudo wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
sudo apt-get update
sudo apt-get install google-chrome-stable

