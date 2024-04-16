//import ondc
const ondc = require('ondc-node');
// Initialize ONDC
const instance = new ondc.ONDC({
     host: "http://localhost:5000",
     bapId: "bap.com",
     bapUri: "https://bap.com/beckn",
     bppId: "bpp.com",
     bppUri: "https://bpp.com/beckn",
     country: "IND",
     city: "std:080",
     ttl: "P1M" 
});
// Making a search call to gateway
const response = await instance.search({
         "item": {
             "descriptor": {
                 "name": "ABC Aata"
             }
         },
         "fulfillment": {
             "end": {
                 "location": 
                 {
                      "gps": "12.4535445,77.9283792"
                 }
             }
         }
     });