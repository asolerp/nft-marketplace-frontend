import { CryptoHookFactory } from '@_types/hooks'
import { Nft } from '@_types/nft'
import axios from 'axios'
import { ethers } from 'ethers'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import useSWR from 'swr'

const USDTAddress = process.env.NEXT_PUBLIC_USDT_TOKEN as string

type UseListedNftsResponse = {
  burnNft: (tokenId: number) => Promise<void>
  buyNft: (tokenId: number, price: number) => Promise<void>
  buyNftWithEUR: (tokenId: number, address: string) => Promise<void>
  buyNftWithERC20: (
    tokenId: number,
    erc20Token: string,
    price: number
  ) => Promise<void>
}
type ListedNftsHookFactory = CryptoHookFactory<Nft[], UseListedNftsResponse>

export type UseListedNftsHook = ReturnType<ListedNftsHookFactory>

export const hookFactory: ListedNftsHookFactory =
  ({ contract, erc20Contracts }) =>
  () => {
    const { data, ...swr } = useSWR(
      contract ? 'web3/useListedNfts' : null,
      async () => {
        const coreNfts = await contract!.getAllNftsOnSale()

        console.log('CORE', coreNfts)

        const nfts = [] as Nft[]
        for (let i = 0; i < coreNfts.length; i++) {
          const item = coreNfts[i]

          const tokenURI = await contract!.tokenURI(item.tokenId)
          const usdtPrice = await contract!.getNFTCost(
            item.tokenId,
            USDTAddress
          )
          const metaResponse = await fetch(tokenURI)
          const meta = await metaResponse.json()

          nfts.push({
            price: parseFloat(ethers.utils.formatEther(item.price)),
            tokenURI,
            tokenId: item.tokenId.toNumber(),
            creator: item.creator,
            owner: item.owner,
            isLocked: item.isLocked,
            isListed: item.isListed,
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

    const burnNft = useCallback(
      async (tokenId: number) => {
        const result = await _contract?.burn(tokenId)
        await toast.promise(result!.wait(), {
          pending: 'Processing transaction',
          success: 'Nft is been burned!',
          error: 'Processing error',
        })
      },
      [_contract]
    )

    const buyNftWithEUR = useCallback(
      async (tokenId: number, address: string) => {
        const res = await axios.post('/create-checkout-session', {
          tokenId,
          address,
          items: [{ price: 'price_1MKVU6KrAZVK1pXgfXCX0eGL', quantity: 1 }],
        })
        const body = await res.data
        window.location.href = body.url
      },
      []
    )

    const buyNft = useCallback(
      async (tokenId: number, price: number) => {
        try {
          const result = await _contract?.buyNFT(tokenId, {
            value: ethers.utils.parseEther(price.toString()),
          })
          await toast.promise(result!.wait(), {
            pending: 'Processing transaction',
            success: 'Nft is yours! Go to Profile page',
            error: 'Processing error',
          })
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
      [_contract]
    )

    const buyNftWithERC20 = useCallback(
      async (tokenId: number, erc20Token: string, price: number) => {
        try {
          const contractAddress = process.env
            .NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as string

          const _erc20Contract = erc20Contracts[erc20Token]
          await _erc20Contract
            .approve(contractAddress, ethers.utils.parseEther(price.toString()))
            .then(async () => {
              const result = await _contract?.buyNFTWithERC20(
                tokenId,
                erc20Token
              )
              await toast.promise(result!.wait(), {
                pending: 'Processing transaction',
                success: 'Nft is yours! Go to Profile page',
                error: 'Processing error',
              })
            })
          // await _erc20Contract.transfer(contractAddress, String(erc20Price))
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
      [_contract]
    )

    return {
      ...swr,
      buyNftWithERC20,
      buyNftWithEUR,
      burnNft,
      buyNft,
      data: data || [],
    }
  }
