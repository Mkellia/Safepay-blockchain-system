# SafePay Blockchain System (SBS)

SafePay Blockchain System (SBS) is a secure online payment solution designed to protect buyers and sellers from fraud during online transactions. Using blockchain smart contracts, it holds funds in escrow until delivery is confirmed via a One-Time Password (OTP), ensuring safe, transparent, and trustworthy digital payments.

---

## Introduction

The SafePay Blockchain System (SBS) provides a secure method for online payments. Funds are held in escrow using smart contracts until buyers confirm delivery with a One-Time Password (OTP). This reduces fraud, strengthens trust, and supports the growth of digital commerce.

---

## Problem Identification

Online shoppers in Rwanda and across Africa face issues such as:  

- Delivery problems or scams (reported by 30–40% of buyers)  
- Losses for small businesses due to fake orders, failed payments, or disputes  

**Solution:** SBS ensures money is released only after verified delivery, creating a safer online shopping environment.

---

## Project Mission

To make online shopping safer by:  

- Using smart contracts to lock funds until delivery confirmation  
- Reducing fraud and increasing trust  
- Supporting small business growth in the digital economy  

---

## Application Area: Finance

SBS operates in the **Finance** sector by enhancing digital payment security. It ensures money moves safely between buyers and sellers.  

**How SBS Improves Finance:**  

- Keeps funds in escrow until delivery is verified  
- Reduces fraud by avoiding direct transfers before proof of delivery  
- Builds trust in digital payments  
- Provides small businesses with a secure payment mechanism  

---

## Key Features

- **Escrow Payments:** Funds are securely locked in the contract  
- **OTP Verification:** Payment is released only when buyer confirms via OTP  
- **Refund Option:** Admin can refund the buyer if delivery fails  
- **Event Logging:** All actions are traceable on the blockchain  
- **Fraud Prevention:** Sellers cannot access funds without confirmed delivery  

---

## Smart Contract Architecture

### Order Structure
Stores all transaction details:  

- Buyer address  
- Seller address  
- Payment amount  
- OTP for verification  
- Status flags (`paid`, `released`, `refunded`)  

### Core Functions

- `createOrder()` – Buyer creates a new order  
- `payOrder()` – Buyer pays; funds locked in escrow  
- `release()` – Buyer confirms delivery using OTP; funds released  
- `refund()` – Admin refunds buyer in unresolved cases  

### Access Control

- **Buyer:** Creates orders, pays, confirms delivery  
- **Seller:** Receives funds after OTP verification  
- **Admin (Owner):** Can refund in unresolved cases  

### Security Measures

- Reentrancy protection  
- Ownership control  
- OTP hashing with `keccak256`  

### Workflow Summary

1. Buyer creates order → contract stores details  
2. Buyer pays → funds locked in escrow  
3. Buyer enters OTP → contract checks OTP  
4. Correct OTP → payment released to seller  
5. Delivery fails → admin refunds buyer  

---

## Deployment Guide (Sepolia Testnet)

### Tools Needed

- [Remix IDE](https://remix.ethereum.org)  
- MetaMask wallet  
- Sepolia Test ETH  
- OpenZeppelin libraries  

### Steps

1. Open Remix → create a new Solidity file  
2. Paste the smart contract  
3. Compile using Solidity Compiler  
4. Switch MetaMask to Sepolia Testnet  
5. Deploy via “Injected Provider – MetaMask”  
6. Approve the deployment transaction  

---

## Interacting With the Contract

- `createOrder(seller, otp)` → Creates a new order  
- `payOrder(orderId, amount)` → Marks order as paid  
- `release(orderId, otp)` → Verifies OTP and releases payment  
- `refund(orderId)` → Admin refunds buyer  

---

## Conclusion

SafePay Blockchain System offers a **secure, transparent, and fraud-resistant** way to manage online payments. By holding funds in escrow and using OTP verification, it builds trust between buyers and sellers, promotes secure e-commerce, and supports Rwanda’s digital economy.
