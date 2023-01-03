const NftMarket = artifacts.require("NftMarket");


module.exports = function (deployer) {
    deployer.then(async () => {
        await deployer.deploy(NftMarket);
    })
};