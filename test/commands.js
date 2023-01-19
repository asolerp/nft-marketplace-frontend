// INIT NFT
// const instance = await NftMarket.deployed();
// const vault = await ERC721VaultFactory.deployed();
// const tokenVault = await TokenVault.deployed();
// const token = await MockUSDT.deployed("USDT", "USDT", 1000)

// instance.setApprovalForAll(vault.address, tokenVault.address, { from: accounts[0] })

// NFT MARKET
// instance.mintNFT("https://gateway.pinata.cloud/ipfs/QmRaEHHk53Ra9bmQ1q3LJ4t2UUs1NmGenDa1Vn4Bx7WNW1", "50000000000000000000", [{ paytoken: "0xeb764Ad6d4ebd84c42868e6d3d0dF1BbcA6bEc69", costvalue: "40000000000000000000" }] , { from: accounts[0] })
// instance.mintNFT("https://gateway.pinata.cloud/ipfs/QmSSU68Aqkwi1uWUs9SbppsjEmGyA7k2wjR8LFUpAyjWDQ","80000000000000000000", [{ paytoken: "0xeb764Ad6d4ebd84c42868e6d3d0dF1BbcA6bEc69", costvalue: "80000000000000000000" }], { from: accounts[0] })
// instance.transferFrom(accounts[0],accounts[1], 1, { from: accounts[0] })

// NFT FRACTIONS
// instance.lockNFT(1, 10)

// NFT BUY
// instance.buyNFT(1, { from: accounts[1], value: "5000000000000000" })

// MAKE OFFER
// instance.getNftOffer(1)
// instance.getBidAddressesByTokenId(1)
// instance.makeOffer(1, { from: accounts[2], value: "30000000000000000000"})
// instance.withdraw(1, { from: accounts[2]})
// instance.acceptOffer(1, { from: accounts[1]})

// USDT TOKEN
// token.transfer(accounts[1], "500000000000000000000")

// MARKET GETTERS
// instance.getAllNFTs()
// instance.getAllNftsOnSale()
// instance.totalNftOffers()
// instance.ownerOf(1)

// VAUTLT
// vault.mint("CC-Fraction-1", "FCASKCHAIN1", instance.address, 1, 10, "5000000000000000000", 50, { from: accounts[0] })
// vault.getVaultContract(0)

// TOKEN VAULT
// tokenVault.balanceOf(accounts[0])
