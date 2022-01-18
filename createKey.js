var Web3 = require('web3');
var web3 = new Web3('ws://localhost:8546');

console.log(web3.eth.accounts.create());
