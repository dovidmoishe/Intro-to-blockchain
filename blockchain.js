const cryptojs = require("crypto-js");
class Block {
  constructor(timestamp, data, previousHash = "") {
    this.data = data;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.hash = this.calculateHash(
      this.timestamp,
      this.data,
      this.previousHash
    );
  }
  calculateHash(timestamp, data, previousHash) {
    return cryptojs.SHA256(timestamp + data + previousHash).toString();
  }
}

class Chain {
  constructor() {
    this.chain = [this.genesisBlock()];
  }
  genesisBlock() {
    return new Block(Date.parse("2022-06-06"), [], "0");
  }
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }
  createNewBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
  checkChainValidity() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) return false;
    }
    return true;
  }
}


