Express Ethereum example API
==================================

- ES6 support via [babel](https://babeljs.io)
- REST resources as middleware via [resource-router-middleware](https://github.com/developit/resource-router-middleware)
- CORS support via [cors](https://github.com/troygoode/node-cors)
- Body Parsing via [body-parser](https://github.com/expressjs/body-parser)


Getting Started
---------------

```sh
# Install dependencies
npm install

# Start production server:
PORT=8080 npm start
```

Endpoints
--------------

1. GET - http://localhost:8080/api/createWallet
2. GET - http://localhost:8080/api/getBalance/<eth_address>
3. POST - http://localhost:8080/api/transaction
  body => ```
    {
      "amount": <eth_amount>,
      "privateKey": <account private key>,
      "destination": <destination account public key>
    }
  ```
