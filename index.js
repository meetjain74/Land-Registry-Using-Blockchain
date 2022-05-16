var contractAddress = "0x78BF27deFb0c147B90221566C3cfe607922F1C5C";
var userAccountAddress = null;
var LandRegistryContract;
var isWeb3ProviderAvailable;

var abi=
[
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_newAuthority",
                "type": "address"
            }
        ],
        "name": "addAuthority",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_propertyPrice",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_propertySize",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_govtLandRegistryID",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_currentOwner",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_state",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_district",
                "type": "string"
            }
        ],
        "name": "addProperty",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_newUser",
                "type": "address"
            }
        ],
        "name": "addUser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_propertyID",
                "type": "uint256"
            }
        ],
        "name": "approveProperty",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_propertyID",
                "type": "uint256"
            }
        ],
        "name": "approveTransfer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_propertyID",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_newPrice",
                "type": "uint256"
            }
        ],
        "name": "changePrice",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "contractOwner",
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
                "internalType": "uint256",
                "name": "_propertyID",
                "type": "uint256"
            }
        ],
        "name": "getPropertyDetails",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "propertyID",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "propertyPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "propertySize",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "govtLandRegistryID",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "currentOwner",
                        "type": "address"
                    },
                    {
                        "internalType": "enum LandRegistry.RegistryStatus",
                        "name": "status",
                        "type": "uint8"
                    },
                    {
                        "internalType": "string",
                        "name": "state",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "district",
                        "type": "string"
                    }
                ],
                "internalType": "struct LandRegistry.propertyDetails",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "propertyAddedOrNot",
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
        "name": "propertyCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "propertyToDetails",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "propertyID",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "propertyPrice",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "propertySize",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "govtLandRegistryID",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "currentOwner",
                "type": "address"
            },
            {
                "internalType": "enum LandRegistry.RegistryStatus",
                "name": "status",
                "type": "uint8"
            },
            {
                "internalType": "string",
                "name": "state",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "district",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_propertyID",
                "type": "uint256"
            }
        ],
        "name": "rejectProperty",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_propertyID",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_newOwner",
                "type": "address"
            }
        ],
        "name": "transferProperty",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "transferPropertyToNewOwner",
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
                "name": "",
                "type": "address"
            }
        ],
        "name": "userToLevel",
        "outputs": [
            {
                "internalType": "int256",
                "name": "",
                "type": "int256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Check every 100 ms is user account is still equal to web3.currentProvider.selectedAddress
// If not, it reassigns user account to currently active account
var accountInterval = setInterval(
    function() {
        if (userAccountAddress!=web3.currentProvider.selectedAddress) {
            userAccountAddress = web3.currentProvider.selectedAddress;
        }
    },100
);

window.addEventListener('load',onLoad);

function onLoad() {
    connectWeb3Provider();
    getAllPropertyDetails();
}

function connectWeb3Provider() {
    // Checks whether metamask exists or not
    if (window.ethereum) {
        window.web3 = new Web3(window.web3.currentProvider);
        window.ethereum.enable();
        isWeb3ProviderAvailable = true;

        LandRegistryContract = new web3.eth.contract(abi,contractAddress);
        console.log(LandRegistryContract);
    } 
    else {
        // User don't have any web3 provider
        isWeb3ProviderAvailable = false;
    }
}

var getAllPropertyDetails = async() => {
    console.log("erpq");
    var res = await LandRegistryContract.methods.propertyCount().call(function (err,res) {
        if(err) {
            console.log("a"+err);
        }
        console.log(res);
    });
    console.log("qpq");
    console.log(res);
}