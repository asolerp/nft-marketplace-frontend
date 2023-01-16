import { CryptoHookFactory } from '@_types/hooks'
import { Nft } from '@_types/nft'

import { ethers } from 'ethers'
import axiosClient from 'lib/fetcher/axiosInstance'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import useSWR from 'swr'

type UseOwnedNftsResponse = {
  acceptOffer: (tokenId: number) => Promise<void>
  listNft: (tokenId: number, price: number) => Promise<void>
}
type OwnedNftsHookFactory = CryptoHookFactory<Nft[], UseOwnedNftsResponse>

export type UseOwnedNftsHook = ReturnType<OwnedNftsHookFactory>

export const hookFactory: OwnedNftsHookFactory =
  ({ contract }) =>
  () => {
    const { data, ...swr } = useSWR(
      contract ? 'web3/useOwnedNfts' : null,
      async () => {
        const ownedNfts = await contract!.getOwnedNfts()

        const nfts = [] as Nft[]
        for (let i = 0; i < ownedNfts.length; i++) {
          const item = ownedNfts[i]
          const tokenURI = await contract!.tokenURI(item.tokenId)
          const metaResponse = await fetch(tokenURI)
          const meta = await metaResponse.json()
          const offer = await contract?.getNftOffer(item.tokenId)

          const transactions = await axiosClient.get(
            `/get-transactions?tokenId=${item.tokenId}`
          )

          nfts.push({
            price: parseFloat(ethers.utils.formatEther(item.price)),
            tokenURI,
            tokenId: item.tokenId.toNumber(),
            creator: item.creator,
            isListed: item.isListed,
            owner: item.owner,
            offer,
            meta,
            transactions: transactions.data,
          })
        }

        return nfts
      }
    )

    const _contract = contract

    const acceptOffer = useCallback(
      async (_tokenId: number) => {
        const result = await _contract?.acceptOffer(_tokenId)
        await toast.promise(result!.wait(), {
          pending: 'Processing transaction',
          success: 'You have accepted the offer!',
          error: {
            render({ data }: any) {
              return `${data.code}`
            },
          },
        })
      },
      [_contract]
    )

    const listNft = useCallback(
      async (tokenId: number, price: number) => {
        try {
          const result = await _contract!.placeNftOnSale(
            tokenId,
            ethers.utils.parseEther(price.toString())
          )

          await toast.promise(result!.wait(), {
            pending: 'Processing transaction',
            success: 'Item has been listed',
            error: 'Processing error',
          })
        } catch (e: any) {
          console.error(e.message)
        }
      },
      [_contract]
    )

    return {
      ...swr,
      listNft,
      acceptOffer,
      data: data || [],
    }
  }
