#!/usr/bin/bash

apt-get update
apt-get upgrade
apt-get install -y nodejs libwebp ffmpeg wget tesseract
wget -O ~/../usr/share/tessdata/ind.traineddata "https://github.com/tesseract-ocr/tessdata/blob/master/ind.traineddata?raw=true"
npm install --save google-tts-api
npm install -D typescript @types/node
npm install --save @google-cloud/text-to-speech
npm install

echo "[*] All dependencies have been installed, please run the command \"npm start\" to immediately start the script"
