#!/usr/bin/bash

apt-get update
apt-get upgrade
apt-get install -y nodejs libwebp ffmpeg wget tesseract fake-useragent
wget -O ~/../usr/share/tessdata/ind.traineddata "https://github.com/tesseract-ocr/tessdata/blob/master/ind.traineddata?raw=true"
npm install fake-useragent
npm install

sudo apt-get update
sudo apt-get upgrade
sudo apt-get install -y nodejs libwebp ffmpeg wget tesseract fake-useragent
sudo wget -O ~/../usr/share/tessdata/ind.traineddata "https://github.com/tesseract-ocr/tessdata/blob/master/ind.traineddata?raw=true"
sudo npm install fake-useragent
sudo npm install

echo "[*] Tenta a boa"
