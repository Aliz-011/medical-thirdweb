// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@thirdweb-dev/contracts/extension/Medical.sol";

contract MyContract is Medical {

    bytes32 public constant SUBTRACT_ROLE = keccak256("SUBTRACT_ROLE");
    uint256 public number;

    constructor() {
        _setup(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function add(uint256 a, uint256 b)public view onlyRole(DEFAULT_ADMIN_ROLE) returns (uint256) {
        // 
    }
}