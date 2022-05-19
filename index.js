
var contractAddress = "0x1D00cB0633CCB185643E19CF78A4D9279526cF5b";
var provider;
var signer = null;
var landRegistryContract;
var isWeb3ProviderAvailable;

var abi = [
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
                "internalType": "address",
                "name": "_currentOwner",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_govtLandRegistryID",
                "type": "uint256"
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
            }
        ],
        "name": "rejectTransfer",
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

window.addEventListener('load', onLoad);

function onLoad() {
    provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/6166517a697247a9b02de3238203ba09", "rinkeby");
    landRegistryContract = new ethers.Contract(contractAddress, abi, provider);
    getAllPropertyDetails();
}

async function connectWallet() {

    const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
    await ethProvider.send("eth_requestAccounts", []);
    signer = ethProvider.getSigner();
    var address = await signer.getAddress();
    
    console.log("Account:", address);

    var acc = document.getElementById("myAccountAddress");
    acc.innerHTML = `Your address: `+address;
}

var getAllPropertyDetails = async() => {
    
    const propertyCount = await landRegistryContract.propertyCount();
    console.log(propertyCount);

    var propertyList = document.getElementById("propertyList");
    propertyList.innerHTML = "";

    for (var i=1; i<=propertyCount; i++) {
        const propertyDetails = await landRegistryContract.getPropertyDetails(i);
        console.log(propertyDetails);
        
        var id = propertyDetails.propertyID;
        var status = getStatus(propertyDetails.status);
        var price = propertyDetails.propertyPrice;
        var owner = propertyDetails.currentOwner;
        var size = propertyDetails.propertySize;
        var state = propertyDetails.state;
        var district = propertyDetails.district;
        var govtID = propertyDetails.govtLandRegistryID;

        var propertyElement = 
            `<tr><td>` + id +
            `</td><td>` + status +
            `</td><td>` + price +
            `</td><td>` + owner +
            `</td><td>` + size +
            `</td><td>` + state +
            `</td><td>` + district +
            `</td><td>` + govtID +
            `</td></tr>`;

        propertyList.innerHTML += propertyElement;
    }
}

var addUser = async() => {
    await connectWallet();
    landRegistryContract = new ethers.Contract(contractAddress, abi, signer);

    const addUserAddress = document.getElementById("addUserAddress").value;

    await landRegistryContract.addUser(addUserAddress)
        .then(() => {}, (error) => {
            alert(error);
        });
}

var addAuthority = async() => {
    await connectWallet();
    landRegistryContract = new ethers.Contract(contractAddress, abi, signer);

    const addAuthorityAddress = document.getElementById("addAuthorityAddress").value;
    await landRegistryContract.addAuthority(addAuthorityAddress)
        .then(() => {}, (error) => {
            alert(error);
        });
}

var addProperty = async() => {
    await connectWallet();
    landRegistryContract = new ethers.Contract(contractAddress, abi, signer);

    const price = document.getElementById("price").value;
    const size = document.getElementById("size").value;
    const owner = document.getElementById("owner").value;
    const state = document.getElementById("state").value;
    const district = document.getElementById("district").value;
    const govtID = document.getElementById("govtID").value;

    await landRegistryContract.addProperty(price, size, owner, govtID, state, district)
        .then(() => {}, (error) => {
            alert(error);
        });
}

var approveProperty = async() => {
    await connectWallet();
    landRegistryContract = new ethers.Contract(contractAddress, abi, signer);

    const approvePropertyPropertyID = document.getElementById("approvePropertyPropertyID").value;
    await landRegistryContract.approveProperty(approvePropertyPropertyID)
        .then(() => {}, (error) => {
            alert(error);
        });
}

var rejectProperty = async() => {
    await connectWallet();
    landRegistryContract = new ethers.Contract(contractAddress, abi, signer);

    const rejectPropertyPropertyID = document.getElementById("rejectPropertyPropertyID").value;
    await landRegistryContract.rejectProperty(rejectPropertyPropertyID)
        .then(() => {}, (error) => {
            alert(error);
        });
}

var changePrice = async() => {
    await connectWallet();
    landRegistryContract = new ethers.Contract(contractAddress, abi, signer);

    const changePricePropertyID = document.getElementById("changePricePropertyID").value;
    const changePricePrice = document.getElementById("changePricePrice").value;
    await landRegistryContract.changePrice(changePricePropertyID, changePricePrice)
        .then(() => {}, (error) => {
            alert(error);
        });
}

var transferProperty = async() => {
    await connectWallet();
    landRegistryContract = new ethers.Contract(contractAddress, abi, signer);

    const transferPropertyPropertyID = document.getElementById("transferPropertyPropertyID").value;
    const transferPropertyAddress = document.getElementById("transferPropertyAddress").value;
    await landRegistryContract.transferProperty(transferPropertyPropertyID, transferPropertyAddress)
        .then(() => {}, (error) => {
            alert(error);
        });
}

var approveTransfer = async() => {
    await connectWallet();
    landRegistryContract = new ethers.Contract(contractAddress, abi, signer);

    const approveTransferPropertyID = document.getElementById("approveTransferPropertyID").value;
    await landRegistryContract.approveTransfer(approveTransferPropertyID)
        .then(() => {}, (error) => {
            alert(error);
        });
}

var rejectTransfer = async() => {
    await connectWallet();
    landRegistryContract = new ethers.Contract(contractAddress, abi, signer);

    const rejectTransferPropertyID = document.getElementById("rejectTransferPropertyID").value;
    await landRegistryContract.rejectTransfer(rejectTransferPropertyID)
        .then(() => {}, (error) => {
            alert(error);
        });
}

function getStatus(n) {
    switch(n) {
        case 1: return "Not Approved";
        case 2: return "Approved";
        case 3: return "Rejected";
    }
}

