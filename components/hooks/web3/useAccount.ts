import { Web3Provider } from '@ethersproject/providers'
import { useGlobal } from '@providers/global'
import { GlobalTypes } from '@providers/global/utils'
import { loadContractByAddress } from '@providers/web3/utils'
import { CryptoHookFactory } from '@_types/hooks'
import axios from 'axios'
import { ethers } from 'ethers'
import axiosClient from 'lib/fetcher/axiosInstance'
import { useRouter } from 'next/router'
import WalletConnectProvider from '@walletconnect/ethereum-provider'
import WalletLink from 'walletlink'
import { getSignedData } from 'pages/api/utils'
import { useEffect } from 'react'
import useSWR from 'swr'

type UseAccountResponse = {
  connect: () => void
  logout: () => void
  connectCoinbase: () => void
  connectWaletConnect: () => void
  signAddress: ({ callback }: { callback: () => void }) => void
  handelSaveUser: ({
    id,
    email,
    nickname,
    callback,
  }: {
    id: string
    email: string
    nickname: string
    callback: () => void
  }) => void
  balance?: string
  isValidating: boolean
  isLoading: boolean
  isInstalled: boolean
  hasAllAuthData: boolean
  erc20balances?: any
}

type AccountHookFactory = CryptoHookFactory<string, UseAccountResponse>

export type UseAccountHook = ReturnType<AccountHookFactory>

export const hookFactory: AccountHookFactory =
  ({ ethereum, isLoading }) =>
  () => {
    const {
      state: { user, token, library },
      dispatch,
    } = useGlobal()

    const Router = useRouter()

    const { data: erc20balances } = useSWR(
      library ? 'web3/er20getBalances' : null,
      async () => {
        const accounts = await library!.listAccounts()

        const erc20USDTContract = await loadContractByAddress(
          'MockUSDT',
          library!,
          '0x4289231D30cf6cD58aa63aBa44b44E321c43eE57'
        )

        const usdtBalance = await erc20USDTContract.balanceOf(accounts[0])

        return {
          USDT: Number(
            ethers.utils.formatEther(usdtBalance.toString())
          ).toLocaleString('es-ES'),
        }
      }
    )

    const { data: balance } = useSWR(
      library ? 'web3/getBalances' : null,
      async () => {
        const accounts = await library!.listAccounts()
        const balance = ethers.utils.formatEther(
          (await library!.getBalance(accounts[0])).toString()
        )
        return Number(balance).toLocaleString('es-ES')
      }
    )

    const { data, mutate, isValidating, ...swr } = useSWR(
      library ? 'web3/useAccount' : null,
      async () => {
        const accounts = await library!.listAccounts()
        const account = accounts[0]
        if (!account) {
          throw 'Cannot retreive account! Pelase, connect to web3 wallet.'
        }
        return account
      },
      {
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }
    )

    useEffect(() => {
      ethereum?.on('accountsChanged', handleAccountsChange)
      return () => {
        ethereum?.removeListener('accountsChanged', handleAccountsChange)
      }
    })

    const handleAccountsChange = (...args: unknown[]) => {
      const accounts = args[0] as string[]
      if (accounts.length === 0) {
        window.location.reload()
        console.error('Please, connect to Web3 wallet')
      } else if (accounts[0] !== data) {
        mutate(accounts[0])
      }
    }

    const signAddress = async ({ callback }: { callback: () => void }) => {
      try {
        const signedMessage = await getSignedData(
          library as Web3Provider,
          data as string
        )
        const responseSign = await axios.post(
          `/api/user/${data}/signature`,
          signedMessage
        )
        dispatch({
          type: GlobalTypes.SET_TOKEN,
          payload: {
            token: responseSign.data?.token,
            refreshToken: responseSign.data?.refreshToken,
          },
        })
        localStorage.setItem('token', responseSign.data?.token)
        localStorage.setItem('refresh-token', responseSign.data?.refreshToken)

        callback()
      } catch (e) {
        console.error(e)
      }
    }

    const handelSaveUser = async ({
      id,
      email,
      nickname,
      callback,
    }: {
      id: string
      email: string
      nickname: string
      callback: () => void
    }) => {
      try {
        await axiosClient.post('/api/user', {
          id,
          email,
          nickname,
        })
        dispatch({
          type: GlobalTypes.SET_USER,
          payload: { user: { _id: id, email, nickname, address: data } },
        })
        callback()
      } catch (e: any) {
        console.log(e)
      }
    }

    const logout = async () => {
      localStorage.removeItem('token')
      localStorage.removeItem('refresh-token')
      dispatch({
        type: GlobalTypes.SET_TOKEN,
        payload: { token: null },
      })
      dispatch({
        type: GlobalTypes.SET_USER,
        payload: { user: null },
      })
      await axiosClient.get(`/api/user/${data}/cleanTokens`)
      Router.push('/')
    }

    const connect = async () => {
      console.log('hola', data)
      if (!data) {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const library = new Web3Provider(window.ethereum, 'any')
        console.log('LIBRARY', library)
        dispatch({
          type: GlobalTypes.SET_PROVIDER,
          payload: { library },
        })
      }
      if (!user?.email) {
        const userData = await axiosClient.get(
          `/api/user/${data?.toLowerCase()}`
        )
        if (userData.data) {
          const { id, email, nickname } = userData.data
          dispatch({
            type: GlobalTypes.SET_USER,
            payload: { user: { _id: id, email, nickname, address: data } },
          })
        } else {
          dispatch({
            type: GlobalTypes.SET_USER_INFO_MODAL,
            payload: { state: true },
          })
        }
      }
      if (!token) {
        return dispatch({
          type: GlobalTypes.SET_SIGN_IN_MODAL,
          payload: { state: true },
        })
      }
    }

    const connectWaletConnect = async () => {
      try {
        const RPC_URLS = {
          1: 'https://mainnet.infura.io/v3/55d040fb60064deaa7acc8e320d99bd4',
          4: 'https://rinkeby.infura.io/v3/55d040fb60064deaa7acc8e320d99bd4',
        }
        const provider = new WalletConnectProvider({
          rpc: {
            1: RPC_URLS[1],
            4: RPC_URLS[4],
          },
          qrcode: true,
          pollingInterval: 15000,
        })
        // setWalletConnectProvider(provider)

        const library = new Web3Provider(provider, 'any')

        dispatch({
          type: GlobalTypes.SET_PROVIDER,
          payload: { library },
        })
      } catch (ex) {
        console.log(ex)
      }
    }

    const connectCoinbase = async () => {
      try {
        // Initialize WalletLink
        const walletLink = new WalletLink({
          appName: 'demo-app',
          darkMode: true,
        })

        const provider = walletLink.makeWeb3Provider(
          'https://rinkeby.infura.io/v3/55d040fb60064deaa7acc8e320d99bd4',
          4
        )

        const library = new Web3Provider(provider, 'any')

        console.log('library')
        console.log(library)
        dispatch({
          type: GlobalTypes.SET_PROVIDER,
          payload: { library },
        })
      } catch (ex) {
        console.log(ex)
      }
    }

    return {
      ...swr,
      connect,
      logout,
      mutate,
      signAddress,
      isValidating,
      handelSaveUser,
      connectWaletConnect,
      connectCoinbase,
      hasAllAuthData: token && user,
      isLoading: isLoading as boolean,
      isInstalled: true,
      data,
      balance,
      erc20balances,
    }
  }
