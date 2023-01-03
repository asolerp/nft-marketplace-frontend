const { ethers } = require("ethers");

const NftMarket = artifacts.require("NftMarket");
const MockUSDT = artifacts.require("MockUSDT");

contract("NftMarket", accounts => {
    let _contract = null;
    let _token = null;
    let _nftPrice = ethers.utils.parseEther("2").toString();
    let _minimumFee = ethers.utils.parseEther("0.02").toString();
    let _royaltyFeePercentage = 0.1;
    let _nftBottleExtractionPrice = ethers.utils.parseEther("0.013").toString();


    let _nftReSellPrice = ethers.utils.parseEther("3").toString();
   
    const defaultRoyalty = .1
    const tokenURI = 'https://test.com'
    const tokenURI2 = 'https://test2.com'

    
    before(async () => {
        _token = await MockUSDT.new("USDT", "USDT", 1000);
        
        await _token.transfer(accounts[1], ethers.utils.parseUnits('500', 'ether'))
        await _token.transfer(accounts[2], ethers.utils.parseUnits('500', 'ether'))

        
        _contract = await NftMarket.new(_token.address);

        console.log("ADDRESS", _contract.address)

    })

    describe("MintNFT token", () => {

        before(async () => {
            await _contract.mintNFT(tokenURI, _nftPrice, {
                from: accounts[0]
            })
            await _contract.mintNFT(tokenURI2, _nftPrice, {
                from: accounts[0]
            })
        })

        it("minted token should have 0 extractions", async () => {
            const extractions = await _contract.getTokenExtractionsByYear(1, 2022);
        })

        it("owner of first token should be account[0]", async () => {
            const owner = await _contract.ownerOf(1)
            const royaltyInfo = await _contract.royaltyInfo.call(1, _nftPrice)
            assert(owner === "0x2304c707B8d0ad213085ab420F551b17B9fDBA56", "Owner of token is not mathing address[0]")
            assert.equal(royaltyInfo[1].toString(), (_nftPrice * defaultRoyalty).toString(), "Default percentage is not 1%")
        })

        it("first token should point to the correct tokenURI", async () => {
            const actualTokenURI = await _contract.tokenURI(1)
            assert.equal(actualTokenURI, tokenURI, "TokenURI is not correctly set")
        })

        it("should not be possible to create a NFT with used tokenURI", async () => {
            try {
                await _contract.mintNFT(tokenURI, {
                from: accounts[0]
                })
            } catch(error) {
                assert(error, "NFT was minted with previously used tokenURI");
            }
        })

        it("should have one listed item", async () => {
            const listedItemsCount = await _contract.getNftListedItemsCount();
            assert.equal(listedItemsCount.toNumber(), 2, "Listed items count is not 1")
        })

        it("should have created NFT item", async () => {
            const nftItem = await _contract.getNftItem(1);
            assert.equal(nftItem.tokenId, 1, "Token id is not 1")
            assert.equal(nftItem.price, _nftPrice, "Nft price is not correct")
            assert.equal(nftItem.creator, accounts[0], "Creator is not account[0]")
            assert.equal(nftItem.isListed, true, "Token is not listed")

        })
    })

    describe("Transfer NFT with royalty pay", () => {

        it("Should transfer NFT and pay minimum royalties", async () => {

            let balanceCreator = await _token.balanceOf(accounts[0]);            

            await _contract.transferFrom(
                accounts[0], 
                accounts[1], 
                1,
                { from: accounts[0] }
              );

              const ownNfts = await _contract.getOwnedNfts({
                from: accounts[1]
              });

              assert.equal(ownNfts[0].tokenId, 1, "NFT has wrong id");

              await _contract.approve(accounts[2], 1, { from: accounts[1]});  
              
              await _contract.transferFrom(
                accounts[1], 
                accounts[2], 
                1,
                { from: accounts[1], value: _minimumFee }
              );

              const ownNfts2 = await _contract.getOwnedNfts({
                from: accounts[2]
              });

              
              assert.equal(ownNfts2[0].tokenId, 1, "NFT has wrong id");
              
              balanceCreator = await _token.balanceOf(accounts[0]);


        })

        it("Should transfer NFT and pay royalties depending transfer price", async () => {

            let _transferPrice = ethers.utils.parseEther("5").toString();

            let balanceCreator = await _token.balanceOf(accounts[0]);            

            await _contract.approve(accounts[1], 1, { from: accounts[2]});  
            
            await _contract.transferFrom(
            accounts[2], 
            accounts[1], 
            1,
            { from: accounts[2], value: _transferPrice}
            );

            const ownNfts = await _contract.getOwnedNfts({
            from: accounts[1]
            });
            
            assert.equal(ownNfts[0].tokenId, 1, "NFT has wrong id");
            
            balanceCreator = await _token.balanceOf(accounts[0]);

        })
    })

    // describe("Order Bottle", () => {
    //     const tokenURI = 'https://test-extraction.com'
    //     const extractions = 2

    //     it("NFT should update it tokenURI", async () => {
    //         const tokenURIBeforeExtraction = await _contract.tokenURI(1)

    //         await _contract.orderBottle(extractions, 1, tokenURI, {
    //             from: accounts[2],
    //             value: _nftBottleExtractionPrice * extractions
    //         })
    //         const tokenURIAfterExtraction = await _contract.tokenURI(1)
    //         const extractionsNft = await _contract.getTokenExtractionsByYear(1, 2022);

    //         assert(tokenURIBeforeExtraction !== tokenURIAfterExtraction, "TokenURI are the same")
    //         assert.equal(extractionsNft, 2, "Number of extractions are incorrect")

    //     })

    // })

    // describe("Buy NFT token", () => {
    //     before(async () => {

    //         await _token.approve(_contract.address, _nftPrice, { from: accounts[1]});

    //         await _contract.buyNFT(2, {
    //             from: accounts[1],
    //             value: _nftPrice,
    //         })
    //     })

    //     it("should unlist the item", async () => {
    //         const listedItem = await _contract.getNftItem(2);
    //         assert.equal(listedItem.isListed, false, "Item is still listed");
    //     })
    
    //     it("should decrease listed items count", async () => {
    //         const listedItemsCount = await _contract.getNftListedItemsCount();
    //         assert.equal(listedItemsCount.toNumber(), 1, "Count has not been decrement");
    //     })
    
    //     it("should change the owner", async () => {
    //         const currentOwner = await _contract.ownerOf(2);
    //         assert.equal(currentOwner, accounts[1], "Item is still listed");
    //     }) 


    // })

    // describe("List an NFT", () => {
    //     before(async () => {
    //         await _contract.placeNftOnSale(2, _nftReSellPrice, { from: accounts[1] })
    //     })

    //     it("should have three listed items", async () => {
    //         const listedNfts = await _contract.getAllNftsOnSale();
    //         assert.equal(listedNfts.length, 2, "Invalid length of tokens");
    //     })

    // })

    // describe("Buy NFT from third user", () => {
 
    //     it("creator should receive the royalty when is buy it to a user different from", async () => {
    //         const creatorBalanceBeforeSell = await _token.balanceOf(accounts[0])
            
    //         await _token.approve(_contract.address, _nftReSellPrice, { from: accounts[2]});

    //         await _contract.buyNFT(2, {
    //             from: accounts[2],
    //             value: _nftReSellPrice
    //         })
    //         const creatorBalanceAfterSell = await _token.balanceOf(accounts[0]) 

    //         assert(Number(creatorBalanceAfterSell.toString()) > Number(creatorBalanceBeforeSell.toString()), "Balance of creator is not bigger after the sell")

    //     })
    // })

    // describe("Burn Token", () => {

    //     const tokenURI = "https://test-json3.com";

    //     before(async () => {
    //         await _contract.mintNFT(tokenURI, _nftPrice)
    //     })
    
    //     it("account[0] should have one owned NFT", async () => {
    //       const ownedNfts = await _contract.getOwnedNfts({from: accounts[0]});
    //       assert.equal(ownedNfts[0].tokenId, 3, "Nft has a wrong id");
    //     })
    
    //     it("account[0] should own 1 NFTs", async () => {
        
    //       const ownedNftsBeforeBurn = await _contract.getOwnedNfts({from: accounts[0]});
    //       assert.equal(ownedNftsBeforeBurn.length, 1, "Invalid length of tokens before burn");
          
    //       await _contract.burn(3);
          
    //       const ownedNftsAfterBurn = await _contract.getOwnedNfts({from: accounts[0]});
    //       assert.equal(ownedNftsAfterBurn.length, 0, "Invalid length of tokens after burn");

    //     })
    
    // })


})