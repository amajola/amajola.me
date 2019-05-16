#! /bin/bash

echo 💡 BUILDING APP
echo 💡 Log files in ./build-logs

mkdir -p build-logs

today=`date '+%Y_%m_%d__%H_%M_%S'`;
yarn build --prod > ./build-logs/build.$today.log

echo ''
echo ☄️ DONE ☄️