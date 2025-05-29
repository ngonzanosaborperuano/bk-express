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
SSL Certificates
======================================================
sudo apt install python3-certbot-apache

sudo certbot -d ricope-e01a994cf2ab.herokuapp.com

ingresar un email donde enviaran notificaciones
