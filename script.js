// Make sure you include ethers.js in your HTML before this script:
// <script src="https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.umd.min.js"></script>

let escrowContract;
let signer;

// Deployed contract address
const contractAddress = "0x180F2879B62c804E7063a26eD9d180eBC1D04225";

// Paste the ABI generated from Remix after compiling your Escrow.sol contract
const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "buyer",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "isPaid",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "seller",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_seller",
          "type": "address"
        }
      ],
      "name": "setSeller",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_otp",
          "type": "string"
        }
      ],
      "name": "lockPayment",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_otp",
          "type": "string"
        }
      ],
      "name": "releasePayment",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "refundBuyer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
];

// Connect to MetaMask
async function connect() {
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        escrowContract = new ethers.Contract(contractAddress, contractABI, signer);
        console.log("Connected to MetaMask.");
    } else {
        alert("Please install MetaMask!");
    }
}

// Set the seller (call as buyer)
async function setSeller() {
    const sellerAddress = prompt("Enter seller address:");
    try {
        const tx = await escrowContract.setSeller(sellerAddress);
        await tx.wait();
        alert("Seller set successfully!");
    } catch (error) {
        console.error(error);
        alert("Error setting seller: " + error.message);
    }
}

// Lock payment (call as buyer)
async function lockPayment() {
    const otp = prompt("Enter OTP code:");
    const valueETH = prompt("Enter payment amount in ETH:");

    try {
        const tx = await escrowContract.lockPayment(otp, {
            value: ethers.utils.parseEther(valueETH)
        });
        await tx.wait();
        alert("Payment locked successfully!");
    } catch (error) {
        console.error(error);
        alert("Error locking payment: " + error.message);
    }
}

// Release payment (call as seller)
async function releasePayment() {
    const otp = prompt("Enter OTP code to release payment:");
    try {
        const tx = await escrowContract.releasePayment(otp);
        await tx.wait();
        alert("Payment released to seller!");
    } catch (error) {
        console.error(error);
        alert("Error releasing payment: " + error.message);
    }
}

// Refund payment (call as buyer)
async function refundBuyer() {
    try {
        const tx = await escrowContract.refundBuyer();
        await tx.wait();
        alert("Payment refunded to buyer!");
    } catch (error) {
        console.error(error);
        alert("Error refunding payment: " + error.message);
    }
}
