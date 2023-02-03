/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CryptoHookFactory } from '@_types/hooks'
import { Nft } from '@_types/nft'
import axios from 'axios'

import useSWR from 'swr'

type FractionalizedNftsHookFactory = CryptoHookFactory<Nft[]>

export type UseFractionalizedNftsHook =
  ReturnType<FractionalizedNftsHookFactory>

export const hookFactory: FractionalizedNftsHookFactory =
  ({}) =>
  () => {
    const { data, ...swr } = useSWR('web3/useFractionalizedNfts', async () => {
      const { data: nfts }: any = await axios.get('/api/casks')
      return nfts.filter((nft: any) => nft?.price > 0)
    })

    // const _vaultFactory = vaultFactory

    // SHARES

    return {
      ...swr,
      data: data,
    }
  }
