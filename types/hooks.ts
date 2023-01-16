import { MetaMaskInpageProvider } from '@metamask/providers'
import { providers } from 'ethers'
import { SWRResponse } from 'swr'
import { NftMarketContract } from './nftMarketContract'
import { NftOffersContract } from './nftOffersContract'

export type Web3Dependencies = {
  erc20Contracts?: any
  nftOffers?: NftOffersContract
  provider: providers.Web3Provider
  contract: NftMarketContract
  ethereum: MetaMaskInpageProvider
  isLoading: boolean
}

export type CryptoHookFactory<D = any, R = any, P = any> = {
  (d: Partial<Web3Dependencies>): CryptoHandlerHook<D, R, P>
}

export type GeneralHookFactory<D = any, R = any, P = any> = {
  (): CryptoHandlerHook<D, R, P>
}

export type CryptoHandlerHook<D = any, R = any, P = any> = (
  params?: P
) => CryptoSWRResponse<D, R>

export type CryptoSWRResponse<D = any, R = any> = SWRResponse<D> & R
