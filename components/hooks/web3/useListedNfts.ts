import { CryptoHookFactory } from "@_types/hooks";
import { Nft } from "@_types/nft";
import axios from "axios";
import { ethers } from "ethers";
import { useCallback } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

type UseListedNftsResponse = {
  burnNft: (tokenId: number) => Promise<void>;
  buyNft: (tokenId: number, price: number) => Promise<void>;
  buyNftWithEUR: (tokenId: number, address: string) => Promise<void>
}
type ListedNftsHookFactory = CryptoHookFactory<Nft[], UseListedNftsResponse>

export type UseListedNftsHook = ReturnType<ListedNftsHookFactory>

export const hookFactory: ListedNftsHookFactory = ({contract}) => () => {

    const {data, ...swr} = useSWR(
        contract ? "web3/useListedNfts" : null, async () => {
          const coreNfts = await contract!.getAllNftsOnSale();

          const nfts = [] as Nft[];
          for (let i = 0; i < coreNfts.length; i ++) {
            const item = coreNfts[i]
            const tokenURI = await contract!.tokenURI(item.tokenId)
            const metaResponse = await fetch(tokenURI);
            const meta = await metaResponse.json();

            nfts.push({
                price: parseFloat(ethers.utils.formatEther(item.price)),
                tokenURI,
                tokenId: item.tokenId.toNumber(),
                creator: item.creator,
                owner: item.owner,
                isListed: item.isListed,
                meta,
            })
          }

          return nfts
        }
    )

    const _contract = contract

    const burnNft = useCallback(async(tokenId: number) => {
      const result = await _contract?.burn(tokenId)
      await toast.promise(
        result!.wait(), {
          pending: "Processing transaction",
          success: "Nft is been burned!",
          error: "Processing error"
        }
      );
    },[_contract])

    const buyNftWithEUR = useCallback(async (tokenId: number, address: string) => {
      const res = await axios.post('/create-checkout-session', {
        tokenId,
        address,
        items: [{price: 'price_1MKVU6KrAZVK1pXgfXCX0eGL', quantity: 1}]
      })
      const body = await res.data
      window.location.href = body.url

    },[])

    const buyNft = useCallback(async (tokenId: number, price: number) => {
      try {
        const result = await _contract?.buyNFT(tokenId, {
          value: ethers.utils.parseEther(price.toString())
        })
        await toast.promise(
          result!.wait(), {
            pending: "Processing transaction",
            success: "Nft is yours! Go to Profile page",
            error: "Processing error"
          }
        );
      } catch (e: any) {
        if (e.code === -32603) {
          toast.error('🏦 Insufficient funds', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }
        console.error(e.message)
      }
    },[_contract])
    

    return  {
        ...swr, 
        buyNftWithEUR,
        burnNft,
        buyNft,
        data: data || [] 
    };
}
