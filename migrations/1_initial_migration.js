const Migrations = artifacts.require("Migrations");
const NftMarket = artifacts.require("NftMarket");
const MockUSDT = artifacts.require("MockUSDT");
const NftOffers = artifacts.require("NftOffers");


module.exports = async function (deployer) {
    
    await deployer.deploy(Migrations);  
    await deployer.deploy(MockUSDT, "USDT", "USDT", 1000)
    await deployer.deploy(NftMarket);

};