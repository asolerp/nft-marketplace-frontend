import contract from '../../public/contracts/NftMarket.json'
import axios from 'axios'

import { Web3Provider } from '@ethersproject/providers'

const NETWORKS = {
  '5777': 'Ganache',
}

type NETWORK = typeof NETWORKS

const targetNetwork = process.env.NEXT_PUBLIC_NETWORK_ID as keyof NETWORK

export const contractAddress = contract.networks[targetNetwork].address

export const pinataApiKey = process.env.PINATA_API_KEY as string
export const pinataSecretApiKey = process.env.PINATA_SECRET_API_KEY as string

export const getSignedData = async (
  provider: Web3Provider | null,
  account: string
) => {
  const messageToSign = await axios.get(`/user/${account}/nonce`)

  const signer = provider!.getSigner()
  const signature = await signer.signMessage(JSON.parse(messageToSign.data))
  const address = await signer.getAddress()

  return {
    message: messageToSign.data,
    address,
    signature,
  }
}
