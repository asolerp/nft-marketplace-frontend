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
import { NftMarketContract } from '@_types/nftMarketContract'

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
        const contract = await loadContract('NftMarket', provider)
        const usdtERC20 = await loadContract('MockUSDT', provider)
        const signer = provider.getSigner()

        const sigendUSDTErc20Contract = usdtERC20.connect(signer)
        const signedContract = contract.connect(signer)

        setGlobalListeners(window.ethereum)
        setWeb3Api(
          createWeb3State({
            ethereum: window.ethereum,
            provider,
            erc20Contracts: { [usdtERC20.address]: sigendUSDTErc20Contract },
            contract: signedContract as unknown as NftMarketContract,
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
