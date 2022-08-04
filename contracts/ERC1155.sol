// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

/*
    You will build an ERC1155 token with a front-end. Here are the requirements:

    You must have a total of 7 tokens within the collection id [0-6]
    There is no supply limit for each token
    Anyone can mint tokens [0-2], but there is a 1-minute cooldown between mints. These are free to mint except for the gas cost.
    Token 3 can be minted by burning token 0 and 1.
    Token 4 can be minted by burning token 1 and 2
    Token 5 can be minted by burning 0 and 2
    Token 6 can be minted by burning 0, 1, and 2
    Tokens [4-6] cannot be forged into other tokens
    Tokens [4-6] can be burned but you get nothing back
    You can trade any token for [0-2] by hitting the trade this button.
    The process of burning and minting is called forging in this context.
    The webapp must tell the user how much matic they have (we will use the polygon network for cost savings)
    The webapp must tell the user how much of each token they have
    Provide a link to the OpenSea page somewhere.
*/

contract GameItems is ERC1155 {
    mapping(address => uint256) mintTime;

    constructor() ERC1155("https://game.example/api/item/{id}.json") {}

    modifier bufferTimeElapsed() {
        if (mintTime[msg.sender] != 0) {
            require(
                block.timestamp - mintTime[msg.sender] > 60,
                "Only 1 token can be minted per minute"
            );
        }
        _;
    }

    function mint(uint256 tokenId) external {
        if (tokenId >= 0 && tokenId <= 2) {
            _mintToken0To2(tokenId);
        } else if (tokenId == 3) {
            _mintToken3();
        } else if (tokenId == 4) {
            _mintToken4();
        } else if (tokenId == 5) {
            _mintToken5();
        } else {
            _mintToken6();
        }
    }

    function _mintToken0To2(uint256 tokenId) internal bufferTimeElapsed {
        _mint(msg.sender, tokenId, 1, "");
        mintTime[msg.sender] = block.timestamp;
    }

    function _mintToken3() internal {
        _burn(msg.sender, 0, 1);
        _burn(msg.sender, 1, 1);
        _mint(msg.sender, 3, 1, "");
    }

    function _mintToken4() internal {
        _burn(msg.sender, 1, 1);
        _burn(msg.sender, 2, 1);
        _mint(msg.sender, 4, 1, "");
    }

    function _mintToken5() internal {
        _burn(msg.sender, 0, 1);
        _burn(msg.sender, 2, 1);
        _mint(msg.sender, 5, 1, "");
    }

    function _mintToken6() internal {
        _burn(msg.sender, 0, 1);
        _burn(msg.sender, 1, 1);
        _burn(msg.sender, 2, 1);
        _mint(msg.sender, 6, 1, "");
    }
}
