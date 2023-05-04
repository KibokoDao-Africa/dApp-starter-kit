const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage", function() {
  let simpleStorage; 
  
  // deploying once to prevent deploying everytime you have to run test
  beforeEach(async function() {
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage"); 
    simpleStorage = await SimpleStorage.deploy(); 
    await simpleStorage.deployed(); 
  }); 
  
  // testing the set() function
  describe("set()", function () {
    it("Should store the data", async function() {
      const data = "Hello World!"; 
      await simpleStorage.set(data); 
      expect(await simpleStorage.storedData(0)).to.equal(data); 
    })
  }); 
  
  // testing the get() function
  describe("get()", function() {
    it("Should retrieve the stored data", async function() {
      const data = "Hello world!"; 
      await simpleStorage.set(data); 
      const retrievedData = await simpleStorage.get(1); 
      expect(retrievedData).to.equal(data); 
    }); 

    // testing the require statement in get() 
    it("Should reveret with an error of invalid data ID", async function() {
      await expect(simpleStorage.get(0)).to.be.revertedWith("Invalid data ID!")
    }); 
    
  }); 

  
})