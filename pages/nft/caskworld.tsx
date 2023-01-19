import { useAccount, useAllNfts } from '@hooks/web3'
import { BaseLayout, NftItem } from '@ui'
import { Nft } from '@_types/nft'
import { NextPage } from 'next'

const NFTCaskWorld: NextPage = () => {
  const { nfts } = useAllNfts()
  const { account } = useAccount()

  const isNftOwner = (nft: Nft) => {
    return nft.owner === account.data
  }

  return (
    <BaseLayout>
      <>
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {nfts.data?.map((nft: Nft) => (
            <div
              key={nft.meta.image}
              className={`flex flex-col rounded-lg shadow-lg overflow-hidden ${
                isNftOwner(nft) && 'border-8 border-red-700'
              }`}
            >
              <NftItem
                showOwner
                item={nft}
                buyShares={nfts.buyShares}
                withdraw={nfts.withdraw}
                makeOffer={nfts.makeOffer}
                withTransactions={false}
              />
            </div>
          ))}
        </div>
      </>
    </BaseLayout>
  )
}

export default NFTCaskWorld
