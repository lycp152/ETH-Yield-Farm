// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./DappToken.sol";
import "./MockDaiToken.sol";

contract TokenFarm{
    string public name = "Dapp Token Farm";
    DappToken public dappToken;
    DaiToken public daiToken;

    constructor(DappToken _dappToken, DaiToken _daiToken){
        dappToken = _dappToken;
        daiToken = _daiToken;
    }
}
