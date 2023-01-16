import { useListedNfts } from "@hooks/web3";
import NftItem from "../item"

const NftList: React.FC = () => {
  const { nfts } = useListedNfts()


    return (
      <>
      <p className="text-xl mt-12 font-semibold text-gray-900">By CaskChain</p>
      <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">    
      {
        nfts.data?.filter(nft => nft.creator === nft.owner)?.map(nft => (
          <div key={nft.meta.image} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <NftItem showOwner={false} withTransactions={true} item={nft} buyNft={nfts.buyNft} buyNftWithEUR={nfts.buyNftWithEUR} buyNftWithERC20={nfts.buyNftWithERC20} burnNft={nfts.burnNft} />
        </div>
        ))
      }    
      </div>
      <p className="text-xl mt-12 font-semibold text-gray-900">By Community</p>
      <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">    
      {
        nfts.data?.filter(nft => nft.creator !== nft.owner)?.map(nft => (
          <div key={nft.meta.image} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <NftItem showOwner={false} withTransactions={true} item={nft} buyNft={nfts.buyNft}  burnNft={nfts.burnNft} buyNftWithEUR={nfts.buyNftWithEUR} buyNftWithERC20={nfts.buyNftWithERC20} />
        </div>
        ))
      }    
      </div>
      </>
    )
}

export default NftList