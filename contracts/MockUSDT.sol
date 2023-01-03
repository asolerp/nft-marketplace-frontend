// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract MockUSDT is ERC20 {
    constructor(
        string memory name,
        string memory symbol,
        uint initialSupply
    ) ERC20(name, symbol) {
        require(initialSupply > 0, "Initial supply has to be greater than 0");
        _mint(msg.sender, initialSupply * 10**18);
    }
}