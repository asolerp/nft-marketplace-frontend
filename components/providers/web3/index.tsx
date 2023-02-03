import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  createDefaultState,
  createWeb3State,
  loadContract,
  Web3State,
} from './utils'
import { ethers } from 'ethers'

import { MetaMaskInpageProvider } from '@metamask/providers'
import { CcNftContract } from '@_types/ccNftContract'
import { NftVendorContract } from '@_types/nftVendorContract'
import { NftOffersContract } from '@_types/nftOffersContract'

const pageReload = () => {
  window.location.reload()
}

const setGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
  ethereum.on('chainChanged', pageReload)
  ethereum.on('accountsChnaged', pageReload)
  ethereum.on('disconnect', pageReload)
}

const removeGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
  ethereum?.removeListener('chainChanged', pageReload)
  ethereum?.removeListener('accountsChnaged', pageReload)
  ethereum?.removeListener('disconnect', pageReload)
}

const Web3Context = createContext<Web3State>(createDefaultState())

interface Props {
  children: ReactNode
}

const Web3Provider: React.FC<Props> = ({ children }) => {
  const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState())

  useEffect(() => {
    async function initWeb3() {
      try {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum as any
        )
        const ccNft = await loadContract('CCNft', provider)
        const nftVendor = await loadContract('NftVendor', provider)
        const nftOffers = await loadContract('NftOffers', provider)

        // const VaultVendor = await loadContract('VaultVendor', provider)
        // const VaultFactory = await loadContract('VaultFactory', provider)

        const signer = provider.getSigner()

        const sigendNftVendorContract = nftVendor.connect(signer)
        const signedCCNftContract = ccNft.connect(signer)
        const signedNftOffersContract = nftOffers.connect(signer)

        // const signedVaultVendor = VaultVendor.connect(signer)
        // const signedVaultFactory = VaultFactory.connect(signer)

        setGlobalListeners(window.ethereum)
        setWeb3Api(
          createWeb3State({
            ethereum: window.ethereum,
            provider,
            // erc20Contracts: { [usdtERC20.address]: sigendNftVendorContract },
            // vaultVendor: signedVaultVendor as unknown as VaultVendorContract,
            // vaultFactory: signedVaultFactory as unknown as VaultFactoryContract,
            ccNft: signedCCNftContract as unknown as CcNftContract,
            nftVendor: sigendNftVendorContract as unknown as NftVendorContract,
            nftOffers: signedNftOffersContract as unknown as NftOffersContract,
            isLoading: false,
          })
        )
      } catch (e: any) {
        console.error('ERROR', e.message)
        setWeb3Api((api) =>
          createWeb3State({
            ...(api as any),
            isLoading: false,
          })
        )
      }
    }
    initWeb3()
    return () => removeGlobalListeners(window.ethereum)
  }, [])

  return <Web3Context.Provider value={web3Api}>{children}</Web3Context.Provider>
}

export function useWeb3() {
  return useContext(Web3Context)
}

export function useHooks() {
  const { hooks } = useWeb3()
  return hooks
}

export default Web3Provider
