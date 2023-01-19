const VaultFactory = artifacts.require('VaultFactory')
const VaultVendor = artifacts.require('VaultVendor')

module.exports = function (deployer) {
  deployer.then(async () => {
    await deployer.deploy(VaultVendor)
    await deployer.deploy(VaultFactory)
  })
}
