/* global $ */
const request = require('request');

// Run this function after the page has loaded
$(() => {  
  request('https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=3', {json:true}, (error, res, body) => {
    if (error) {
      window.alert("No se ha podido conectar con la web de Coinmarketcap.com");
      return console.log(error);
    }
    if (!error && res.statusCode===200) {
      for (item in body) {
           
        $('#name'+item).text(body[item].name);
        $('#price'+item).text(body[item].price_eur);
        const d = new Date(1000*body[item].last_updated);
        
        $('#lastupd'+item).text(d.toLocaleString());
      }
    }    
  });
});
