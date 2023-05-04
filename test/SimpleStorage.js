const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage", function() {
  let simpleStorage; 

  beforeEach(async function() {
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage"); 
    simpleStorage = await SimpleStorage.deploy(); 
    await simpleStorage.deployed(); 
  }); 

  describe("Set()", function () {
    it("Should store the data", async function() {
      const data = "Hello World!"; 
      await simpleStorage.set(data); 
      expect(await simpleStorage.storedData(0)).to.equal(data); 
    })
  }); 
  
})