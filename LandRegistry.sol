// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract LandRegistry {

    // state variables

    uint public propertyCount;
    address public contractOwner;
	enum RegistryStatus { NotInRecord, NotApproved, Approved, Rejected }

    // struct for each property
    struct propertyDetails {
        uint propertyID;
        uint propertyPrice;
        uint propertySize;
        uint govtLandRegistryID;          // issued by goverment
		address currentOwner;
        RegistryStatus status;
        string state;
        string district;
	}

    // mappings
    mapping(address => int) public userToLevel;                  //each user is mapped to its level of rights
            /* 
                Level 0 - User not Found
                Level 1 - Normal user
                Level 2 - Authority
                Level 3 - Contract/DApp Owner
            */

    mapping(uint => propertyDetails) public propertyToDetails;
	mapping(uint => address) public transferPropertyToNewOwner;
	mapping(uint => bool) public propertyAddedOrNot;


    // constructor for contract deployment

	constructor() {
		contractOwner = msg.sender;
		userToLevel[contractOwner] = 3;
	}


    // modifiers

    // checks if msg.sender is the contract owner
    modifier onlyOwner {
		require(contractOwner == msg.sender, "Caller is not the contract owner");
		_;
	}

    // checks if msg.sender is the current owner of property (given by _propertyID)
    modifier checkPropertyOwner (uint _propertyID) {
		require(propertyToDetails[_propertyID].currentOwner == msg.sender, "Caller does not own the property");
		_;
	}

    // checks if user has authority level
	modifier checkUserAuthority {
	    require(userToLevel[msg.sender] >=2, "Caller does not have authority rights");
	    _;
	}
	
    // checks if property is already added
	modifier checkPropertyAdded (uint _govtLandRegistryID) {
	    require(propertyAddedOrNot[_govtLandRegistryID] != true, "Property already added");
	    _;
	}

    modifier checkUserExists (address _user) {
        require(userToLevel[_user] != 0, "User does not exist");
        _;
    }

	modifier propertyExists (uint _propertyID) {
		require(_propertyID != 0 && _propertyID <= propertyCount, "Property ID invalid");
		_;
	}
    

    // contract methods

    // User can only be added by authority level user
	function addUser(address _newUser) public checkUserAuthority {
        require(userToLevel[_newUser] == 0, "User already added");
	    userToLevel[_newUser] = 1;
	}

    // Authority can only be added by contract owner
	function addAuthority(address _newAuthority) public onlyOwner {
		require(_newAuthority != contractOwner, "Cannot downgrade contract owner to authority");
	    userToLevel[_newAuthority] = 2;
	}

    // Used to register new property
	function addProperty(
            uint _propertyPrice,
            uint _propertySize,
            uint _govtLandRegistryID,
            string memory _state, 
            string memory _district
        ) 
        public checkUserExists(msg.sender) checkPropertyAdded(_govtLandRegistryID)
    {
		propertyCount++;
		propertyAddedOrNot[_govtLandRegistryID] = true;
		propertyToDetails[propertyCount] = propertyDetails(propertyCount, _propertyPrice, _propertySize, _govtLandRegistryID, msg.sender, RegistryStatus.NotApproved, _state , _district);
	}

	// Used to approve property registry, can only be called by user with authority rights
	function approveProperty(uint _propertyID) public propertyExists(_propertyID) checkUserAuthority {
		require(propertyToDetails[_propertyID].currentOwner != msg.sender, "Cannot approve your own property");
		propertyToDetails[_propertyID].status = RegistryStatus.Approved;
	}

	// Used to reject property registry, can only be called by user with authority rights
	function rejectProperty(uint _propertyID) public propertyExists(_propertyID) checkUserAuthority {
		require(propertyToDetails[_propertyID].currentOwner != msg.sender, "Cannot reject your own property");
		propertyDetails storage details = propertyToDetails[_propertyID];
		propertyAddedOrNot[details.govtLandRegistryID] = false;
	}

	// Used to transfer property, can only be called by property owner
	function transferProperty(uint _propertyID, address _newOwner) public propertyExists(_propertyID) checkPropertyOwner(_propertyID) {
		require(_newOwner != address(0), "Cannnot transfer to null address");
		require(propertyToDetails[_propertyID].currentOwner != _newOwner, "Cannot transfer to current owner");
		require(propertyToDetails[_propertyID].status == RegistryStatus.Approved, "Property required to be Approved before transfer");
		require(transferPropertyToNewOwner[_propertyID] == address(0), "Cannot transfer while previous transfer approval pending");
		transferPropertyToNewOwner[_propertyID] = _newOwner;
	}

	// Used to approve transfer property, can only be called by user with authority rights
	function approveTransfer(uint _propertyID) public propertyExists(_propertyID) checkUserAuthority {
		require(propertyToDetails[_propertyID].currentOwner != msg.sender, "Cannot approve your own transfer");
		require(transferPropertyToNewOwner[_propertyID] != msg.sender, "Cannot approve transfer to your own account");
	    require(transferPropertyToNewOwner[_propertyID] != address(0), "Cannnot approve transfer to null address");
	    propertyToDetails[_propertyID].currentOwner = transferPropertyToNewOwner[_propertyID];
	    transferPropertyToNewOwner[_propertyID] = address(0);           // new owner is set to null for further transfers
	}

	// Used to reject transfer property, can only be called by user with authority rights
	function rejectTransfer(uint _propertyID) public propertyExists(_propertyID) checkUserAuthority {
		require(propertyToDetails[_propertyID].currentOwner != msg.sender, "Cannot reject your own transfer");
		require(transferPropertyToNewOwner[_propertyID] != msg.sender, "Cannot reject transfer to your own account");
	    require(transferPropertyToNewOwner[_propertyID] != address(0), "Cannnot reject transfer to null address");
	    transferPropertyToNewOwner[_propertyID] = address(0);           // new owner is set to null for further transfers
	}

    // Used to change property price, can only be called by property owner
    function changePrice(uint _propertyID, uint _newPrice) public propertyExists(_propertyID) checkPropertyOwner(_propertyID) {
        require(transferPropertyToNewOwner[_propertyID] == address(0), "Cannot change price while property transfer approval pending");
        propertyToDetails[_propertyID].propertyPrice = _newPrice;
    }

	// Used to get property details from property ID
	function getPropertyDetails(uint _propertyID) public view propertyExists(_propertyID) returns (propertyDetails memory) {
		return (propertyToDetails[_propertyID]);
	}

}