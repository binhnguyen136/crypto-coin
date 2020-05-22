const { Blockchain } = require('./blockchain');
const { Transaction } = require('./transaction');

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Your private key goes here
const myKey = ec.keyFromPrivate('7c4c45907dec40c91bab3480c39032e90049f1a44f3e18c3e07c23e3273995cf');
// From that we can calculate your public key (which doubles as your wallet address)
const myWalletAddress = myKey.getPublic('hex');


/*---------- Create new instance of Blockchain class ----------*/
console.log('\n--------- Creating my first coin! ---------');
const ESDCoin = new Blockchain();

/* Solved first block */
ESDCoin.solveGenesisBlock(myWalletAddress);

console.log(`Balance of ESD is ${ESDCoin.getBalanceOfAddress(myWalletAddress)}`);
/*---------- End init new coin ----------*/


/*---------- First transaction here ----------*/
console.log('\n--------- Start first transaction ---------');
// Create a transaction & sign it with your key
const tx1 = new Transaction(myWalletAddress, 'address2', 10);
tx1.signTransaction(myKey);
ESDCoin.addTransaction(tx1);

// Solved block
ESDCoin.solvePendingTransactions(myWalletAddress);

console.log(`Balance of ESD is ${ESDCoin.getBalanceOfAddress(myWalletAddress)}`);
console.log('--------- End first transaction ---------\n');
/*---------- First transaction end ----------*/


/*---------- Second transaction here ----------*/
console.log('--------- Start second transaction ---------');
const tx2 = new Transaction(myWalletAddress, 'address1', 50);
tx2.signTransaction(myKey);
ESDCoin.addTransaction(tx2);

// Solved block
ESDCoin.solvePendingTransactions(myWalletAddress);

console.log(`Balance of ESD is ${ESDCoin.getBalanceOfAddress(myWalletAddress)}`);
console.log('--------- End second transaction ---------\n');
/*---------- Second transaction end ----------*/


/*---------- Test hacking balance ----------*/
console.log('Blockchain valid?', ESDCoin.isChainValid() ? 'Yes' : 'No');

ESDCoin.chain[1].transactions[0].amount = 5000;
// ESDCoin.chain[1].hash = "2342345234";

console.log('Blockchain valid after hacking?', ESDCoin.isChainValid() ? 'Yes' : 'No');
/*---------- End hacking balance ----------*/