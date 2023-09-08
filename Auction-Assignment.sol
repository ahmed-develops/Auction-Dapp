// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Auction {
    struct Item {
        uint id;
        string name;
        string description;
        uint currentHighestBid;  
        address highestBidder;
    }

    address owner;

    Item[10] public items;
    
    constructor() {
        owner = msg.sender;
        items[0] = Item(0,"Gold Vase", "A gold vase with painting of Bonucci.",0,0x0000000000000000000000000000000000000000);
        items[1] = Item(1,"Grey Vase", "A grey vase with painting of Bonucci.",0,0x0000000000000000000000000000000000000000);
        items[2] = Item(2,"Blue Vase", "A blue vase with painting of Bonucci.",0,0x0000000000000000000000000000000000000000);
        items[3] = Item(3,"White Vase", "A white vase with painting of Bonucci.",0,0x0000000000000000000000000000000000000000);
        items[4] = Item(4,"Red Vase", "A red vase with painting of Bonucci.",0,0x0000000000000000000000000000000000000000);
        items[5] = Item(5,"Black Vase", "A blac vase with painting of Bonucci.",0,0x0000000000000000000000000000000000000000);
        items[6] = Item(6,"Cyan Vase", "A cyan vase with painting of Bonucci.",0,0x0000000000000000000000000000000000000000);
        items[7] = Item(7,"Violet Vase", "A violet vase with painting of Bonucci.",0,0x0000000000000000000000000000000000000000);
        items[8] = Item(8,"Rainbow Vase", "A rainbow vase with painting of Bonucci.",0,0x0000000000000000000000000000000000000000);
        items[9] = Item(9,"Silver Vase", "A silver vase with painting of Bonucci.",0,0x0000000000000000000000000000000000000000);
    }

    function placeBid(uint _id, uint _bidAmount) public {
        // owner should not take advantage of bidding process to liquidate 
        // or inflate the auction bidding, hence function caller is prevented 
        // to be an owner
        require(msg.sender != owner);
        require(_id >= 0 && _id <10, "Invalid Item id.");
        require(_bidAmount > items[_id].currentHighestBid, "Bid must be higher than the current highest bid/");
        items[_id].currentHighestBid = _bidAmount;
        items[_id].highestBidder = msg.sender;
    }

    function checkHighestBid(uint _id) public view returns(uint, address){
        require(_id >= 0 && _id <10, "Invalid Item id.");
        return (items[_id].currentHighestBid, items[_id].highestBidder);
    }

    function getItemDetails() public view returns(Item[10] memory) {
        return items;
    }
}