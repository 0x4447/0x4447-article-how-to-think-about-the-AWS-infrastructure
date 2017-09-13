#!/bin/bash

cd /var/www &&
npm install --force > npm.log &&
chown -R admin:admin . &&
systemctl daemon-reload &&
systemctl restart site
