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
server
ssh -i ~/.ssh/gcp_key niltongonzano@34.69.157.202

bd
ssh -i ~/.ssh/gcp_key -L 5433:10.128.0.2:5432 niltongonzano@34.69.157.202

pm2 stop cocinando
git pull
npm install
pm2 restart cocinando
pm2 logs

======================================================

# consultar log

tail -n 100 ~/.pm2/logs/cocinando-error.log

# limpiar logs

> ~/.pm2/logs/cocinando-error.log

======================================================

# ejecutar

corre la app local con npm start

======================================================
Tunel de red para postgres
======================================================
ejecutar en la terminal
ssh -i ~/.ssh/gcp_key -L 5433:10.128.0.2:5432 niltongonzano@34.69.157.202

local
psql -h 127.0.0.1 -p 5433 -U postgres -d db_cocinando
