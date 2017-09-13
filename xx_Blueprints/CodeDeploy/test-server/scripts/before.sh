#!/bin/bash

# I want to make sure that the directory is clean and has nothing left over from
# previous deployments. The servers auto scale so the directory may or may not
# exist.

if [ -d /var/www ]; then
    rm -rf /var/www
fi

mkdir -vp /var/www &&

apt-get update &&
apt-get upgrade -y &&
apt-get install -y git &&
apt-get install -y build-essential &&
apt-get install -y curl &&
apt-get autoremove &&
apt-get clean &&

curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs &&
npm install -g node-gyp
