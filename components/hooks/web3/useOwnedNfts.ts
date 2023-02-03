import { CryptoHookFactory } from '@_types/hooks'
import { Nft } from '@_types/nft'
import { ethers } from 'ethers'
import axiosClient from 'lib/fetcher/axiosInstance'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import useSWR from 'swr'

type UseOwnedNftsResponse = {
  // acceptOffer: (tokenId: number) => Promise<void>
  // listNft: (tokenId: number, price: number) => Promise<void>
}

type OwnedNftsHookFactory = CryptoHookFactory<UseOwnedNftsResponse>
export type UseOwnedNftsHook = ReturnType<OwnedNftsHookFactory>

export const hookFactory: OwnedNftsHookFactory =
  ({ ccNft, nftVendor }) =>
  () => {
    const [activeNft, setActiveNft] = useState<Nft>()
    const [isApproved, setIsApproved] = useState(false)
    const [listPrice, setListPrice] = useState('')
    const { data, ...swr } = useSWR('/api/casks/me', async () => {
      const ownedNfts: any = await axiosClient.get('/api/casks/me')

      const nfts = [] as any[]

      for (let i = 0; i < ownedNfts.data.length; i++) {
        const item = ownedNfts.data[i]
        const transactions = await axiosClient.get(
          `/api/get-transactions?tokenId=${item.tokenId}`
        )
        nfts.push({
          ...item,
          transactions: transactions.data,
        })
      }
      return nfts
    })

    const { data: offersData } = useSWR(
      activeNft ? '/api/offer' : null,
      async () => {
        const offers: any = await axiosClient.get(
          `/api/offer/${activeNft?.tokenId}`
        )
        return offers.data
      }
    )

    useEffect(() => {
      if (data && data.length > 0) {
        setActiveNft(data[0])
      } else {
        setActiveNft(undefined)
      }
    }, [data])

    const _ccNft = ccNft
    const _nftVendor = nftVendor

    const approveSell = async (tokenId: number) => {
      try {
        const result = await _ccNft?.approve(
          process.env.NEXT_PUBLIC_NFT_VENDOR_ADDRESS as string,
          tokenId
        )
        await toast.promise(result!.wait(), {
          pending: 'Processing transaction',
          success: 'The sell was approved',
          error: 'Processing error',
        })
        const txStatus = await result?.wait()
        if (txStatus?.status === 1) {
          setIsApproved(true)
        }
      } catch (e: any) {
        console.log(e)
      }
    }

    const listNft = async (tokenId: number) => {
      try {
        const result = await _nftVendor?.listItem(
          tokenId,
          ethers.utils.parseUnits(listPrice.toString(), 'ether')
        )
        await toast.promise(result!.wait(), {
          pending: 'Processing transaction',
          success: 'The NFT was listed',
          error: 'Processing error',
        })
        const txStatus = await result?.wait()
        if (txStatus?.status === 1) {
          setListPrice('')
        }
      } catch (e: any) {
        console.log(e)
      }
    }

    return {
      ...swr,
      listNft,
      activeNft,
      listPrice,
      offersData,
      isApproved,
      approveSell,
      setActiveNft,
      setListPrice,
      setIsApproved,
      data: data || [],
    }
  }
