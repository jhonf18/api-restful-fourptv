"use strict";

const paypal = require('paypal-rest-sdk');
const config = require('../../config/config');

//Configuracion de paypal
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': config.clientIdPaypal,
  'client_secret': config.clientSecretPaypal
});

function pay_paypal (req, res) {

  const create_payment_json = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": "http://localhost:3001/api/user/pay/paypal/success",
      "cancel_url": "http://localhost:3001/api/user/pay/paypal/cancel"
    },
    "transactions": [{
      "item_list": {
        "items": [{
          "name": "Subscripción por un mes a FourpTv",
          "sku": "001",
          "price": "3.00",
          "currency": "USD",
          "quantity": 1
        }]
      },
    "amount": {
      "currency": "USD",
      "total": "2.00"
    },
    "description": "1 mes de entretenimiento de calidad, disfrutando de las mejores peliculas a cualquier hora sin interrupciones"
    }]
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for(let i = 0; i < payment.links.length; i++){
        if( payment.links[i].rel === 'approval_url' ){
          res.redirect(payment.links[i].href);
          console.log(payment.links[i].href)
        }
      }
    }
  });
}

function pay_paypal_success(req, res) {

  const payerId = req.query.payerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
      "amount": {
        "currency": "USD",
        "total": "25.00"
      }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function(err, payment){
    if(err) {
      console.log(err.response);
      throw err;
    } else {
      console.log('Get payment Response');
      console.log(JSON.stringify(payment));
      res.send('Success');
    }
  });
}

module.exports = {
  pay_paypal,
  pay_paypal_success
};
