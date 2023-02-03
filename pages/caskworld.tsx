import { useAccount, useAllNfts } from '@hooks/web3'
import { BaseLayout } from '@ui'
import GeneralNftInfo from '@ui/ntf/item/GeneralNftInfo'
import { Nft } from '@_types/nft'
import { NextPage } from 'next'
import Link from 'next/link'

const NFTCaskWorld: NextPage = () => {
  const { nfts } = useAllNfts()
  const { account } = useAccount()

  const isNftOwner = (nft: Nft) => {
    return nft.owner === account.data
  }

  return (
    <BaseLayout>
      <div className="max-w-7xl mx-auto py-16 sm:px-6 lg:px-8 px-4">
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {nfts?.data?.map((nft: Nft) => (
            <div
              key={nft.meta.image}
              className={`flex flex-col rounded-lg shadow-lg overflow-hidden ${
                isNftOwner(nft) && 'border-8 border-red-700'
              }`}
            >
              <Link href={`/cask/${nft.tokenId}`}>
                <GeneralNftInfo showOwner item={nft} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </BaseLayout>
  )
}

export default NFTCaskWorld
