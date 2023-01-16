import { CryptoHookFactory } from '@_types/hooks'
import { useCallback } from 'react'

type UseNftOffersResponse = {
  makeOffer: (_tokenId: number, offer: string) => Promise<void>
}

type NftOffersHookFactory = CryptoHookFactory<UseNftOffersResponse>

export type UseNftOffersHook = ReturnType<NftOffersHookFactory>

export const hookFactory: NftOffersHookFactory =
  ({ contract }) =>
  () => {
    const _contract = contract

    const makeOffer = useCallback(
      async (_tokenId: number, offer: string) => {
        await _contract?.makeOffer(_tokenId, {
          value: offer,
        })
      },
      [_contract]
    )

    return {
      makeOffer,
    }
  }
