const CCNft = artifacts.require('CCNft')
const NftVendor = artifacts.require('NftVendor')
const NftOffers = artifacts.require('NftOffers')

module.exports = function (deployer) {
  deployer.then(async () => {
    const collection = await deployer.deploy(CCNft)
    const nftVendor = await deployer.deploy(
      NftVendor,
      collection.address,
      '0x87058b1aac9c1f3b6469943CB1906f411ed5D50d'
    )
    await deployer.deploy(NftOffers, collection.address, nftVendor.address)
  })
}
