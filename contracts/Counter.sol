// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    uint256 private count;

    constructor() {
        count = 0; // Initialize the count to 0 when the contract is deployed
    }

    function getCount() public view returns (uint256) {
        return count;
    }

    function increaseCount() public {
        count += 1;
    }

    function decreaseCount() public {
        require(count > 0, "Count cannot be negative");
        count -= 1;
    }
}