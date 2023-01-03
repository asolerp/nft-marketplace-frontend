
import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
import { Session, withIronSession } from "next-iron-session";
import * as util from "ethereumjs-util"
import contract from "../../public/contracts/NftMarket.json"
import { NftMarketContract } from "@_types/nftMarketContract";
import axios from "axios";
import { MetaMaskInpageProvider } from "@metamask/providers";

const NETWORKS = {
    "5777": "Ganache"
}

type NETWORK = typeof NETWORKS;

const abi = contract.abi;
const targetNetwork = process.env.NEXT_PUBLIC_NETWORK_ID as keyof NETWORK;

export const contractAddress = contract.networks[targetNetwork].address;

export const pinataApiKey = process.env.PINATA_API_KEY as string;
export const pinataSecretApiKey = process.env.PINATA_SECRET_API_KEY as string;


export const getSignedData = async (ethereum: MetaMaskInpageProvider | null) => {

    const messageToSign = await axios.get("/verify", { withCredentials: true });
    const accounts = await ethereum?.request({method: "eth_requestAccounts"}) as string[];
    const account = accounts[0]
    
    const signedData = await ethereum?.request({
      method: "personal_sign",
      params: [JSON.stringify(messageToSign.data), account, messageToSign.data.id]
    })

    return {
      signedData, account
    }

}