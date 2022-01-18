const Tx = require('ethereumjs-tx');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/fd21403c5d6f4eb8ad0969e60d347781'));

const contractAddr = '';
const contractAbi = [];
const contractOwner = {
	addr: 0x417ACc5b3709B80A6d9c42e24DCaF385A0735609,
	key: 0x0c75f0211275814249469fa1960348245a2a0d0891c39cf3dd1dac8521843af6,
};

sendToken('RECEIVER_ADDRESS', 'AMOUNT_OF_TOKEN');

function sendToken(receiver, amount) {
	console.log(`Start to send ${amount} tokens to ${receiver}`);
	const contract = web3.eth.contract(contractAbi).at(contractAddr);
	const data = contract.transfer.getData(receiver, amount * 1e18);
	const gasPrice = web3.eth.gasPrice;
	const gasLimit = 90000;
	const rawTransaction = {
		'from': contractOwner.addr,
		'nonce': web3.toHex(web3.eth.getTransactionCount(contractOwner.addr)),
		'gasPrice': web3.toHex(gasPrice),
		'gasLimit': web3.toHex(gasLimit),
		'to': contractAddr,
		'value': 0,
		'data': data,
		'chainId': 1
	};

	const privKey = new Buffer(contractOwner.key, 'hex');
	const tx = new Tx(rawTransaction);
	tx.sign(privKey);
	const serializedTx = tx.serialize();
	web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
		if (err) {
			console.log(err);
		}

		console.log(hash);
	});
}