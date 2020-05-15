const { Blockchain } = require('./blockchain');
const { Transaction } = require('./transaction');

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Your private key goes here
const myKey = ec.keyFromPrivate('7c4c45907dec40c91bab3480c39032e90049f1a44f3e18c3e07c23e3273995cf');
// From that we can calculate your public key (which doubles as your wallet address)
const myWalletAddress = myKey.getPublic('hex');


/*---------- Create new instance of Blockchain class ----------*/
const ESDCoin = new Blockchain();

/* Mine first block */
ESDCoin.mineGenesisBlock(myWalletAddress);

console.log();
console.log(`Balance of ESD is ${ESDCoin.getBalanceOfAddress(myWalletAddress)}`);
/*---------- End init new coin ----------*/


/*---------- First transaction here ----------*/
console.log('\n--------- Start first transaction ---------');
// Create a transaction & sign it with your key
const tx1 = new Transaction(myWalletAddress, 'address2', 10);
tx1.signTransaction(myKey);
ESDCoin.addTransaction(tx1);

// Mine block
ESDCoin.minePendingTransactions(myWalletAddress);

console.log(`Balance of ESD is ${ESDCoin.getBalanceOfAddress(myWalletAddress)}`);
console.log('--------- End first transaction ---------\n');
/*---------- First transaction end ----------*/


/*---------- Second transaction here ----------*/
console.log('\n--------- Start second transaction ---------');
const tx2 = new Transaction(myWalletAddress, 'address1', 50);
tx2.signTransaction(myKey);
ESDCoin.addTransaction(tx2);

// Mine block
ESDCoin.minePendingTransactions(myWalletAddress);

console.log();
console.log(`Balance of ESD is ${ESDCoin.getBalanceOfAddress(myWalletAddress)}`);
console.log('--------- End second transaction ---------\n');
/*---------- Second transaction end ----------*/


/*---------- Test hacking balance ----------*/
ESDCoin.chain[1].transactions[0].amount = 10;
// Check if the chain is valid
console.log();
console.log('Blockchain valid?', ESDCoin.isChainValid() ? 'Yes' : 'No');
/*---------- End hacking balance ----------*/