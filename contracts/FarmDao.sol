// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "hardhat/console.sol";

contract FarmDAO {
    // Variables
    string public title;
    address public farmer1;
    address public farmer2;
    address public owner;
    uint public totalInvestment;
    uint public minimumInvestment;
    mapping(address => uint) public investments;
    bool public daoCreated;
    uint public daoID;
    Dao[] public totalDAOs;
    address[] private verifiedAddresses;

    // DAO struct
    struct Dao {
        address address1;
        address address2;
        string description;
        string farmReports;
        string financialReports;
        string name;
        uint id;
        uint amountInvested;
        address[] investors;
        bool verified;
    }

    struct Investor {
        address investorAddress;
        string name;
    }

    Investor[] public registeredInvestors;

    // Events
    event InvestmentAdded(address investor, uint amount);
    event DaoCreated(address farmerAddress1, uint daoId, string daoName);
    event DaoVerified(uint daoId);

    // Dao farmers
    mapping(address => address[]) public daoFarmers;
    mapping(uint => Dao) public daos;

    // Variables for keeping track of investments and investments in DAOs by each investor.
    mapping(address => uint) public totalInvestmentByEachInvestor; 
    mapping(address => uint) public totalNumberOfDaosByInvestor; 

    // Mapping for tracking total amount withdrawn from each DAO
    mapping(uint => uint) public totalAmountWithdrawn; 

    // Mapping to track total amount paid 
    mapping(address => mapping(uint => uint)) public partialAmountPaid; 

    // Constructor
    constructor(string memory _title) {
        title = _title;

        verifiedAddresses.push(address(0x13Ef924EB7408e90278B86b659960AFb00DDae61));
        verifiedAddresses.push(address(0x23792579e2979a98D12a33A85e35914079304a56));
        verifiedAddresses.push(address(0xdc4f6EA5856eDa459286e8D0eF42e389D07137Ff));
    }

    // Functions
    function addInvestment(uint daoId) public payable {
        Dao storage dao = daos[daoId];
        require(msg.sender != dao.address1 && msg.sender != dao.address2, "Only addresses that haven't joined the DAO can invest.");
        dao.amountInvested += msg.value;
        dao.investors.push(msg.sender);

        // Update total investment by the investor 
        totalInvestmentByEachInvestor[msg.sender] += msg.value; 

        // Update total number of DAOs by the investor
        totalNumberOfDaosByInvestor[msg.sender]++; 

        // investments[msg.sender] = msg.value;
        totalInvestment += msg.value;

        emit InvestmentAdded(msg.sender, msg.value);
    }

    // Get total investment by investor 
    function getTotalInvestmentByInvestor(address investor) public view returns (uint){
        return totalInvestmentByEachInvestor[investor]; 
    }

    // Get total DAOs invested by Investor 
    function getTotalNumberOfDaosByInvestor(address investor) public view returns (uint){
        return totalNumberOfDaosByInvestor[investor]; 
    }
    
    // Create DAo
    function createDao(address _farmer1, address _farmer2, string memory _description, string memory _name, string memory _farmReports, string memory _financialReports) public {
        console.log("Address 1 is: ", _farmer1); 
        console.log("Address 2 is: ", _farmer2); 

        daoID++;
        uint _amountInvested = 0;
        uint currentId = daoID;
        
        Dao memory newDao = Dao({
            address1: _farmer1,
            address2: _farmer2,
            description: _description,
            farmReports: _farmReports,
            financialReports: _financialReports,
            name: _name,
            id: currentId,
            amountInvested: _amountInvested,
            investors: new address[](0),
            verified: false
        });

        daos[currentId] = newDao;
        totalDAOs.push(newDao);

        //Adding farmers to DAO
        daoFarmers[address(this)].push(_farmer1);
        daoFarmers[address(this)].push(_farmer2);

        daoCreated = true;
        emit DaoCreated(_farmer1, currentId, _name);
    }

    // Function to register an investor with a name
    function registerInvestor(string memory name) public {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(!isInvestorRegistered(msg.sender), "Investor is already registered");
        Investor memory newInvestor = Investor({investorAddress: msg.sender, name: name});
        registeredInvestors.push(newInvestor);
    }

    // Function to check if an investor is already registered
    function isInvestorRegistered(address investor) public view returns (bool) {
        for (uint i = 0; i < registeredInvestors.length; i++) {
            if (registeredInvestors[i].investorAddress == investor) {
                return true;
            }
        }
        return false;
    }

     // Function to get both the address and name of a registered investor
    // function getInvestorInfo(uint index) public view returns (address, string memory) {
    //     require(index < registeredInvestors.length, "Invalid index");
    //     return (registeredInvestors[index].investorAddress, registeredInvestors[index].name);
    // }
    
   // Function to get both the address and name of all registered investors
    function getAllInvestorInfo() public view returns (Investor[] memory) {
        Investor[] memory investorInfoList = new Investor[](registeredInvestors.length);

        for (uint i = 0; i < registeredInvestors.length; i++) {
            investorInfoList[i].investorAddress = registeredInvestors[i].investorAddress;
            investorInfoList[i].name = registeredInvestors[i].name;
        }

        return investorInfoList;
    }

    // Function for withdrawing the funds
    function withDrawDFunds(uint daoId, uint amountToWithdraw) public {
        Dao storage dao = daos[daoId];
        require(msg.sender == dao.address1 || msg.sender == dao.address2, "Only farmers can withdraw funds!");
        
        // Ensure that the amount to withdraw does not exceed the available funds
        require(amountToWithdraw <= dao.amountInvested, "Insufficient funds to withdraw!"); 

        // Update the amountInvested in the DAO
        dao.amountInvested -= amountToWithdraw; 

        // Update total amount withdrawn from the DAO 
        totalAmountWithdrawn[daoId] += amountToWithdraw; 
        
        // Transfer the specified amount to the sender
        (bool success, ) = msg.sender.call{value: amountToWithdraw}("");
        require(success, "Failed to transfer funds!");
    }

    // Returning current amount available in the DAO 
    function getCurrentAmountAvailable(uint daoId) public view returns (uint){
        Dao storage dao = daos[daoId]; 
        return dao.amountInvested; 
    }

    // Returing total amount withdrawn from the DAO 
    function  getTotalAmountWithdrawn(uint daoId) public view returns (uint){
        return totalAmountWithdrawn[daoId]; 
    }

    // Function for repaying the funds 
    function repayFunds(uint daoId, uint amountToRepay) public {
        Dao storage dao = daos[daoId]; 
        require(msg.sender == dao.address1 || msg.sender == dao.address2, "Only farmers can repay funds!");

        require(amountToRepay <= totalAmountWithdrawn[daoId], "Amount to repay exceeds total amount withdrawn.");
        
        totalAmountWithdrawn[daoId] -= amountToRepay;

        // Transfer the specified amount to the DAO
        (bool success, ) = address(this).call{value: amountToRepay}("");
        require(success, "Failed to transfer funds to DAO.");
    }

    function getVerifiedAddresses() external view returns (address[] memory) {
        return verifiedAddresses;
    }

    function getAllDaos() public view returns (Dao[] memory) {
        Dao[] memory allDaos = new Dao[](daoID);
        for (uint i = 1; i <= daoID; i++) {
            allDaos[i - 1] = daos[i];
        }
        return allDaos;
    }

    function getTotalInvestment(uint daoId) public view returns (uint) {
        return daos[daoId].amountInvested;
    }
    
    // ---------------------------------------------------------ADMIN PANNEL FUNCTIONS---------------------------------------------------------------------------// 
    
    // Function for verifying the DAO
    function verifyDao(uint daoId) public {
        require(isAddressVerified(msg.sender), "Unauthorized access");
        require(daoId > 0 && daoId <= daoID, "Invalid DAO ID");

        Dao storage dao = daos[daoId];
        dao.verified = true;

        emit DaoVerified(daoId);
    }

    // Function for unverifying the DAO 
    function unverifyDao(uint daoId) public {
        require(isAddressVerified(msg.sender), "Unauthorized access");
        require(daoId > 0 && daoId <= daoID, "Invalid DAO ID");

        Dao storage dao = daos[daoId];
        dao.verified = false;

        emit DaoVerified(daoId);
    }

    // Function for removing dao from marketplace 
    function removeDao(uint daoId) public {
        require(isAddressVerified(msg.sender), "Unauthorized access");
        require(daoId > 0 && daoId <= daoID, "Invalid DAO ID");

        Dao storage dao = daos[daoId];
        require(!dao.verified, "Cannot remove a verified DAO");

        // Remove the DAO from totalDAOs array
        uint indexToRemove = daoId - 1;
        require(indexToRemove < totalDAOs.length, "Invalid index");
        require(totalDAOs[indexToRemove].id == daoId, "Invalid DAO ID in totalDAOs");

        // Move the last DAO in the array to the index being removed
        totalDAOs[indexToRemove] = totalDAOs[totalDAOs.length - 1];
        totalDAOs.pop();

        // Remove the DAO from daos mapping
        delete daos[daoId];

        emit DaoVerified(daoId);
    }


    function isAddressVerified(address _address) public view returns (bool) {
        for (uint i = 0; i < verifiedAddresses.length; i++) {
            if (verifiedAddresses[i] == _address) {
                return true;
            }
        }
        return false;
    }
}
