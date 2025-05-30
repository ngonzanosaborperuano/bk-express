======================================================
Instalar CLI de gcloud
======================================================
curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-456.0.0-darwin-arm.tar.gz
tar -xvzf google-cloud-sdk-456.0.0-darwin-arm.tar.gz
./google-cloud-sdk/install.sh

gcloud init

gcloud info

//

======================================================
SSH coneccion
======================================================
ssh -i ~/.ssh/gcp_key niltongonzano@34.69.157.202
ssh niltongonzano@34.69.157.202

pm2 stop cocinando
git pull
npm install pm2 -g
pm2 start server.js --name cocinando -- --autorestart
pm2 logs server
