import { useGlobal } from '@providers/global'
import { GlobalTypes } from '@providers/global/utils'
import { CryptoHookFactory } from '@_types/hooks'
import { Nft } from '@_types/nft'
import axios from 'axios'
import { ethers } from 'ethers'
import { useCallback } from 'react'
import { toast } from 'react-toastify'

import useSWR from 'swr'

// const USDTAddress = process.env.NEXT_PUBLIC_USDT_TOKEN as string

type CaskNftHookFactory = CryptoHookFactory<Nft[]>

export type UseCaskNftsHook = ReturnType<CaskNftHookFactory>

export const hookFactory: CaskNftHookFactory =
  ({ nftOffers, nftVendor }) =>
  ({ caskId }) => {
    const {
      state: { user, token },
      dispatch,
    } = useGlobal()

    const { data, ...swr } = useSWR(
      'web3/useCaskNft',
      async () => {
        const { data: nfts }: any = await axios.get(`/api/casks/${caskId}`)
        return nfts
      },
      { revalidateOnFocus: true }
    )

    const _nftOffers = nftOffers
    const _nftVendor = nftVendor

    const isUserNeededDataFilled = user?.email && token
    const hasOffersFromUser = data?.offer?.bidders?.some(
      (bidder: string) => bidder === user?.address
    )

    const handleUserState = useCallback(() => {
      if (!user?.email) {
        return dispatch({
          type: GlobalTypes.SET_USER_INFO_MODAL,
          payload: { state: true },
        })
      }
      if (!token) {
        return dispatch({
          type: GlobalTypes.SET_SIGN_IN_MODAL,
          payload: { state: true },
        })
      }
    }, [dispatch, token, user?.email])

    const buyNft = useCallback(
      async (tokenId: number, price: string) => {
        try {
          if (isUserNeededDataFilled) {
            const result = await _nftVendor?.buyItem(tokenId, {
              value: price.toString(),
            })
            await toast.promise(result!.wait(), {
              pending: 'Processing transaction',
              success: 'Nft is yours! Go to Profile page',
              error: 'Processing error',
            })
          } else {
            handleUserState()
          }
        } catch (e: any) {
          if (e.code === -32603) {
            toast.error('🏦 Insufficient funds', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            })
          }
          console.error(e.message)
        }
      },
      [_nftVendor, handleUserState, isUserNeededDataFilled]
    )

    const makeOffer = useCallback(
      async (bid: string) => {
        try {
          if (isUserNeededDataFilled) {
            const result = await _nftOffers?.makeOffer(caskId, {
              value: ethers.utils.parseUnits(bid.toString(), 'ether'),
            })
            await toast.promise(result!.wait(), {
              pending: 'Processing transaction',
              success: 'You are the highest bidder!',
              error: 'Processing error',
            })
          } else {
            handleUserState()
          }
        } catch (e: any) {
          toast.info('🏦 There is a higher offer. Bid harder!')
        }
      },
      [caskId, _nftOffers, handleUserState, isUserNeededDataFilled]
    )

    const cancelOffer = useCallback(async () => {
      try {
        const result = await _nftOffers?.withdraw(caskId)
        await toast.promise(result!.wait(), {
          pending: 'Processing transaction',
          success: 'Your offer is canceled',
          error: 'Processing error',
        })
      } catch (e: any) {
        console.log(e)
      }
    }, [_nftOffers, caskId])

    return {
      ...swr,
      buyNft,
      makeOffer,
      cancelOffer,
      hasOffersFromUser,
      data,
    }
  }
