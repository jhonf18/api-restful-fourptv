module.exports = {
  clientIdPaypal: 'Adfklg4b80iKBOl0dukLOuHdtGxbE-0_sCrRpAC8-3bc1lUZw3pHc47fBKT_5JIzTIzG0CNZUF6Ko2tN',
  clientSecretPaypal: 'EAyHu_Nxgk7utOFTVqGggmbE-ofmysd_hTQ0cvLlj6WYYF_-SpF-06KTlMtQtShPsBYAl2K5gp7yr0Xn'
}

process.env.CADUCIDAD_TOKEN = '24h';

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let dbUrl;

if(process.env.NODE_ENV === 'dev'){
  dbUrl = 'mongodb://localhost:27017/ecomerce';
} else {
  dbUrl = 'mongodb://fourp-user:3015843456jhon@ds141952.mlab.com:41952/web-fourp';
}
process.env.URLDB = dbUrl;

process.env.PORT = process.env.PORT || 3000
//client Id
process.env.CLIENT_ID = process.env.CLIENT_ID || '522211117969-s77s11o9o1l9r5a01cg7d0i2atp6l2no.apps.googleusercontent.com';

process.env.SECRET = process.env.SECRET || 'secret-de-desarrollo';
