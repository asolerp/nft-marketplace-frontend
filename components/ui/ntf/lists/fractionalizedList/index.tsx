import { useFractionalizedNfts } from '@hooks/web3'
import GeneralNftInfo from '@ui/ntf/item/GeneralNftInfo'
import { Nft } from '@_types/nft'

const FractionalizedNftList: React.FC = () => {
  const { fractionalizedNfts } = useFractionalizedNfts()

  return (
    <>
      <p className="text-xl mt-12 font-semibold text-gray-900">
        Fractionalized NFT Cask
      </p>
      <div className="mt-6 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
        {fractionalizedNfts.data
          ?.filter((nft: Nft) => nft.creator !== nft.owner)
          ?.map((nft: Nft) => (
            <div
              key={nft.meta.image}
              className="flex flex-col rounded-lg shadow-lg overflow-hidden"
            >
              <GeneralNftInfo showOwner={false} item={nft} />
            </div>
          ))}
      </div>
    </>
  )
}

export default FractionalizedNftList
