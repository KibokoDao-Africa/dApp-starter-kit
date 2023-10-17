const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Counter", function() {
  let counter;

  // Deploying the Counter contract before each test
  beforeEach(async function() {
    const Counter = await ethers.getContractFactory("Counter"); // Use "Counter" instead of "SimpleStorage"
    counter = await Counter.deploy();
    await counter.deployed();
  });

  // Testing the getCount() function
  describe("getCount()", function () {
    it("Should return the initial count of 0", async function() {
      const count = await counter.getCount();
      expect(count).to.equal(0);
    });

    it("Should return the updated count after increasing", async function() {
      await counter.increaseCount();
      const count = await counter.getCount();
      expect(count).to.equal(1);
    });

    it("Should return the updated count after decreasing", async function() {
      await counter.increaseCount();
      await counter.decreaseCount();
      const count = await counter.getCount();
      expect(count).to.equal(0);
    });

    it("Should not allow decreasing below 0", async function() {
      await expect(counter.decreaseCount()).to.be.revertedWith("Count cannot be negative");
    });
  });
});