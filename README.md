# Land-Registry-Using-Blockchain

## Deployment on zkEVM Polygon Testnet
Contract owner address => 0xC4524AeED055b22AEc58a410AE3925d701CF66Af   

Contract address => 0xde8bAc2367d7682d695BF3F95107b43170C5C51e   

Contract => https://explorer.public.zkevm-test.net/address/0xde8bAc2367d7682d695BF3F95107b43170C5C51e/   

Transaction hash for contract deployment => 0x3990c6788a9270d1b5cf801082b118732484d2f74b9ef64eea27a19f886b602b  

Contract deployment on block explorer => https://explorer.public.zkevm-test.net/tx/0x3990c6788a9270d1b5cf801082b118732484d2f74b9ef64eea27a19f886b602b/   

## Deployment on Rinkeby Testnet
Deployed website link => https://landregistrybfsc.netlify.app/ (Works on Rinkeby currently)  

Contract Owner Address => 0xFC2258aad94F889F4eE38b78490795FC4546914c  

Contract Address => 0x1D00cB0633CCB185643E19CF78A4D9279526cF5b  

Contract => https://rinkeby.etherscan.io/address/0x1d00cb0633ccb185643e19cf78a4d9279526cf5b  

# Steps to run the project

1. Clone the github repository and cd to the folder
2. Run `npm install --save ethers` to install the ethers library/dependency.
3. Make sure you have metamask installed in your browser.
4. Open the project in Vscode and click on "Go live" to run the project.

### Note: 
You can't run any functionality of this app until you have certain authority or owner rights.   
Hence, you need to deploy this contract on your own.  
1. Deploy the contract 'LandRegistry.sol' on the Rinkeby test network.
2. Copy the deployed contract address from above and change it inside the index.js file.
3. Make your own infura endpoint and edit it in the index.js file.
4. Now you are the owner of the contract and can easily run any functionality within the app.
