// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EscrowOTP is ReentrancyGuard, Ownable {
    struct Order {
        address buyer;
        address seller;
        uint256 amount;
        bool paid;
        bool released;
        string otp;
        bool refunded;
    }

    mapping(uint256 => Order) public orders;
    uint256 public orderCount;

    event OrderCreated(uint256 orderId, address buyer, address seller, uint256 amount);
    event PaymentMade(uint256 orderId, uint256 amount);
    event Released(uint256 orderId, uint256 amount);
    event Refunded(uint256 orderId, uint256 amount);

    constructor() Ownable(msg.sender) {}

    // Create an order with OTP
    function createOrder(address _seller, string memory _otp) external returns (uint256) {
        require(_seller != address(0), "Invalid seller");

        orderCount++;

        orders[orderCount] = Order({
            buyer: msg.sender,
            seller: _seller,
            amount: 100,
            paid: false,
            released: false,
            otp: _otp,
            refunded: false
        });

        emit OrderCreated(orderCount, msg.sender, _seller, 0);
        return orderCount;
    }

    // Buyer pays into escrow
    function payOrder(uint256 _orderId, uint256 paidamount) external payable nonReentrant {
        Order storage order = orders[_orderId];

        require(msg.sender == order.buyer, "Not buyer");
        require(!order.paid, "Already paid");
        require(paidamount>= order.amount, "you paid few amount");
        

        order.paid = true;

        
    }

    // Buyer confirms with OTP → funds released to seller
    function release(uint256 _orderId, string memory _otp) external nonReentrant {
        Order storage order = orders[_orderId];

        require(msg.sender == order.buyer, "Only buyer can release");
        require(!order.released, "Already released");
        require(keccak256(bytes(_otp)) == keccak256(bytes(order.otp)), "Invalid OTP");

        order.released = true;


        emit Released(_orderId, order.amount);
    }

    // Owner can refund only if not released
    function refund(uint256 _orderId) external onlyOwner nonReentrant {
        Order storage order = orders[_orderId];

        require(order.paid, "Not paid");
        require(!order.released, "Already released");

        uint256 refundAmount = order.amount;
        order.amount = 0;
        order.paid = false;
        order.refunded = true;


        emit Refunded(_orderId, refundAmount);
    }
} 