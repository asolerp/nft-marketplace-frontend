const NftMarket = artifacts.require("NftMarket");
const MockUSDT = artifacts.require("MockUSDT")

module.exports = function (deployer) {
    deployer.then(async () => {
        await deployer.deploy(MockUSDT, "USDT", "USDT", 1000)
        await deployer.deploy(NftMarket);
    })
};