require('dotenv').config();

const admin = require("firebase-admin");

const type = process.env.FIRE_BASE_TYPE
const project_id =  process.env.FIRE_BASE_PROJECT_ID
const private_key_id = process.env.FIRE_BASE_PRIVATE_KEY_ID
const private_key = process.env.FIRE_BASE_PRIVATE_KEY.replace(/\\n/g,'\n')
const client_email =  process.env.FIRE_BASE_CLIENT_EMAIL
const client_id = process.env.FIRE_BASE_CLIENT_ID
const auth_uri = process.env.FIRE_BASE_AUTH_URI
const token_uri= process.env.FIRE_BASE_TOKEN_URI
const auth_provider_x509_cert_url = process.env.FIRE_BASE_AUTH_PROVIDER_X509
const client_x509_cert_url = process.env.FIRE_BASE_CLIENT_X509

admin.initializeApp({
  credential: admin.credential.cert({
      type, 
      project_id,
      private_key_id,
      private_key,
      client_email,
      client_id,
      auth_uri, 
      token_uri,
      auth_provider_x509_cert_url,
      client_x509_cert_url
  }),
});

module.exports = admin;