App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function () {
    return App.initializeWeb3();
  },

  initializeWeb3: function () {

    // First provide a web3 provider and then initialize the contract

    if (typeof web3 !== 'undefined') {
      // If metamask already provides a web3 instance
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } 
    else {
      // Means no web3 instance provided
      // Specify the default localhost instance
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:8545",
      );
      web3 = new Web3(App.web3Provider);
    }

    return App.initializeContract()
  },

  initializeContract: function () {
    $.getJSON("./artifacts/LandRegistry.json", function (land) {
      console.log(land);
      // Instantiate a new truffle contract from the artifact
      App.contracts.land = TruffleContract(land)
      // Connect provider to interact with contract
      App.contracts.land.setProvider(App.web3Provider)

      App.listenForEvents()

      return App.render()
    })
  },

  // Listen for events emitted from the contract
  listenForEvents: function () {
    App.contracts.land.deployed().then(function (instance) {
      // Restart Chrome if you are unable to receive this event
      // This is a known issue with Metamask
      // https://github.com/MetaMask/metamask-extension/issues/2393
      instance
        .votedEvent({}, {
          fromBlock: 0,
          toBlock: 'latest',
        })
        .watch(function (error, event) {
          console.log('event triggered', event)
          // Reload when a new vote is recorded
          App.render()
        })
    })
  },

  render: function () {
    var landInstance;
    var loader = $('#loader')
    var content = $('#content')

    loader.show()
    content.hide()

    // Load account data
    web3.eth.getCoinbase(function (err, account) {
      if (err === null && account != null) {
        App.account = account
        $('#accountAddress').html('Your Account: ' + account)
        loader.hide()
        content.show()
      }
    })

    // Load contract data
    App.contracts.land
      .deployed()
      .then(function (instance) {
        landInstance = instance
        return landInstance.propertyid()
      })
      .then(function (propertyid) {
        var candidatesResults = $('#candidatesResults')
        candidatesResults.empty()


        for (var i = 1; i <= propertyid; i++) {
          
          landInstance.properties(i).then(function (property) {
            var id = property[0]
            var status = property[1]
            var value = property[2]
            var owneracc = property[3]
            var size = property[4]
            var state = property[5]
            var district = property[6]
            var survey = property[7]

            // Render candidate Result
            var candidateTemplate =
              '<tr><th>' +
              id +
              '</th><td>' +
              status +
              '</th><td>' +
              value +
              '</th><td>' +
              owneracc +
              '</th><td>' +
              size +
              '</th><td>' +
              state +
              '</th><td>' +
              district +
              '</th><td>' +
              survey +
              '</td></tr>'
            candidatesResults.append(candidateTemplate)
          })
        }
        loader.hide()
        content.show()
      })
      .catch(function (error) {
        console.warn(error)
      })
  },

  addNewUser: function () {
    var accountNo = $('#accountNumber444').val()

    App.contracts.land
      .deployed()
      .then(function (instance) {
        return instance.addNewUser(accountNo, {
          from: App.account
        })
      })
      .then(function (result) {
        // Wait for votes to update
        $('#content').hide()
        $('#loader').show()
      })
      .catch(function (err) {
        console.error(err)
        message.append()
      })
    loader.hide()
    content.show()
  },

  addAuthority: function () {
    var accountNo = $('#accountNumber').val()
    App.contracts.land
      .deployed()
      .then(function (instance) {
        return instance.addAuthority(accountNo, {
          from: App.account
        })
      })
      .then(function (result) {
        $('#content').hide()
        $('#loader').show()
      })
      .catch(function (err) {
        console.error(err)
      })
    loader.hide()
    content.show()
  },

  approveUsers: function () {
    var accountNo = $('#accountNumber2').val()
    App.contracts.land
      .deployed()
      .then(function (instance) {
        return instance.approveUsers(accountNo, {
          from: App.account
        })
      })
      .then(function (result) {
        $('#content').hide()
        $('#loader').show()
      })
      .catch(function (err) {
        console.error(err)
      })
    loader.hide()
    content.show()
  },

  createProperty: function () {
    var value1 = $('#value3').val()
    var address1 = $('#address3').val()
    var size1 = $('#size3').val()
    var state1 = $('#state3').val()
    var district1 = $('#district3').val()
    var survey1 = $('#survey3').val()

    App.contracts.land
      .deployed()
      .then(function (instance) {
        return instance.createProperty(
          value1,
          address1,
          size1,
          state1,
          district1,
          survey1, {
          from: App.account
        },
        )
      })
      .then(function (result) {
        // Wait for votes to update
        $('#content').hide()
        $('#loader').show()
      })
      .catch(function (err) {
        console.error(err)
      })
    loader.hide()
    content.show()
  },

  approveProperty: function () {
    var id = $('#propertyID').val()
    App.contracts.land
      .deployed()
      .then(function (instance) {
        return instance.approveProperty(id, {
          from: App.account
        })
      })
      .then(function (result) {
        $('#content').hide()
        $('#loader').show()
      })
      .catch(function (err) {
        console.error(err)
      })

    loader.hide()
    content.show()
  },

  rejectProperty: function () {
    var id = $('#propertyID456').val()
    App.contracts.land
      .deployed()
      .then(function (instance) {
        return instance.rejectProperty(id, {
          from: App.account
        })
      })
      .then(function (result) {
        $('#content').hide()
        $('#loader').show()
      })
      .catch(function (err) {
        console.error(err)
      })

    loader.hide()
    content.show()
  },

  changeValue: function () {
    var id = $('#propertyID5').val()
    var value = $('#value5').val()
    App.contracts.land
      .deployed()
      .then(function (instance) {
        return instance.changeValue(id, value, {
          from: App.account
        })
      })
      .then(function (result) {
        $('#content').hide()
        $('#loader').show()
      })
      .catch(function (err) {
        console.error(err)
      })

    loader.hide()
    content.show()
  },

  sale: function () {
    var id = $('#propertyID68').val()
    var owner = $('#value68').val()
    App.contracts.land
      .deployed()
      .then(function (instance) {
        return instance.sale(id, owner, {
          from: App.account
        })
      })
      .then(function (result) {
        $('#content').hide()
        $('#loader').show()
      })
      .catch(function (err) {
        console.error(err)
      })
    loader.hide()
    content.show()
  },

  approveSale: function () {
    var id = $('#propertyID578').val()
    App.contracts.land
      .deployed()
      .then(function (instance) {
        return instance.approveSale(id, {
          from: App.account
        })
      })
      .then(function (result) {
        $('#content').hide()
        $('#loader').show()
      })
      .catch(function (err) {
        console.error(err)
      })

    loader.hide()
    content.show()
  },
}

$(function () {
  $(window).load(function () {
    App.init()
  })
})