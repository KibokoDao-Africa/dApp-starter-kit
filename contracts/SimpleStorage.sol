// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract SimpleStorage {
    uint256 public dataID = 0; 
    string[] public storedData; 
    
    function set(string memory data) public {
        dataID++; // Increamenting the dataID to ensure the first data being stored has an ID Of 1 
        storedData.push(data); // Pushing whatever data is passed to the storeData array
    }

    function get(uint256 id) public view returns(string memory) {
       require(id > 0 && id <= dataID, "Invalid data ID!"); // Checking if ID inputed is present
       return storedData[id - 1]; // Array index starts from 0, therefore we subtract 1 from id 
    }
}
