#!/bin/bash

# Inicializa el proyecto si aún no existe package.json
if [ ! -f "package.json" ]; then
  npm init -y
fi

# Instalar todas las dependencias
npm install \
@google-cloud/functions-framework@^3.3.0 \
@google-cloud/storage@^7.2.0 \
apple-auth@^1.0.6 \
axios@^1.7.7 \
bluebird@^3.7.2 \
body-parser@^1.20.3 \
chalk@^5.3.0 \
cors@^2.8.5 \
crypto@^1.0.1 \
crypto-js@^4.2.0 \
dotenv@^16.3.1 \
ejs@^3.1.10 \
express@^4.21.1 \
express-session@^1.17.3 \
firebase-admin@^11.11.0 \
firebase-functions@^4.5.0 \
http@^0.0.1-security \
jsonwebtoken@^9.0.2 \
mercadopago@^1.5.8 \
moment@^2.29.4 \
moment-timezone@^0.5.43 \
morgan@^1.10.0 \
multer@^1.4.5-lts.1 \
passport@^0.6.0 \
passport-jwt@^4.0.1 \
pg-promise@^11.5.4 \
response-time@^2.3.2 \
socket.io@^2.5.1 \
swagger-js@^1.0.0 \
swagger-ui-express@^5.0.1 \
yamljs@^0.3.0 \
winston@^3.13.0
