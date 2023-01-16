/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CryptoHookFactory } from '@_types/hooks'
import { Nft } from '@_types/nft'
import { ethers } from 'ethers'
import { useCallback } from 'react'
import { toast } from 'react-toastify'

import useSWR from 'swr'

const USDTAddress = process.env.NEXT_PUBLIC_USDT_TOKEN as string

type UseAllNftsResponse = {
  withdraw: (tokenId: number) => Promise<void>
  makeOffer: (tokenId: number, offer: string) => Promise<void>
}

type AllNftsHookFactory = CryptoHookFactory<Nft[], UseAllNftsResponse>

export type UseAllNftsHook = ReturnType<AllNftsHookFactory>

export const hookFactory: AllNftsHookFactory =
  ({ contract }) =>
  () => {
    const { data, ...swr } = useSWR(
      contract ? 'web3/useAllNfts' : null,
      async () => {
        const coreNfts: any = await contract!.getAllNFTs()
        const nfts = [] as Nft[]
        for (let i = 0; i < coreNfts.length; i++) {
          const item = coreNfts[i]

          const offer = await contract?.getNftOffer(item.tokenId)
          const tokenURI = await contract!.tokenURI(item.tokenId)
          const usdtPrice = await contract!.getNFTCost(
            item.tokenId,
            USDTAddress
          )
          const bidders = await contract?.getBidAddressesByTokenId(item.tokenId)
          const metaResponse = await fetch(tokenURI)
          const meta = await metaResponse.json()

          console.log(bidders)

          nfts.push({
            price: parseFloat(ethers.utils.formatEther(item.price)),
            tokenURI,
            tokenId: item.tokenId.toNumber(),
            creator: item.creator,
            owner: item.owner,
            isListed: item.isListed,
            offer,
            bidders,
            erc20Prices: [
              {
                address: USDTAddress,
                price: parseFloat(ethers.utils.formatEther(usdtPrice)),
              },
            ],
            meta,
          })
        }

        return nfts
      }
    )

    const _contract = contract

    const makeOffer = useCallback(
      async (_tokenId: number, offer: string) => {
        const parsedOffer = ethers.utils.parseEther(offer).toString()
        const result = await _contract?.makeOffer(_tokenId, {
          value: parsedOffer,
        })
        await toast.promise(result!.wait(), {
          pending: 'Processing transaction',
          success: 'You have place a bid!',
          error: {
            render({ data }) {
              return `${data}`
            },
          },
        })
      },
      [_contract]
    )

    const withdraw = useCallback(
      async (_tokenId: number) => {
        const result = await _contract?.withdraw(_tokenId)
        await toast.promise(result!.wait(), {
          pending: 'Processing transaction',
          success: 'The withdraw was',
          error: 'Processing error',
        })
      },
      [_contract]
    )

    return {
      ...swr,
      withdraw,
      makeOffer,
      data: data || [],
    }
  }
