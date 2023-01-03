import { CryptoHookFactory } from "@_types/hooks";
import { useEffect } from "react";
import useSWR from "swr";

type UseAccountResponse = {
    connect: () => void;
    isLoading: boolean;
    isInstalled: boolean;
}

type AccountHookFactory = CryptoHookFactory<string, UseAccountResponse>

export type UseAccountHook = ReturnType<AccountHookFactory>

export const hookFactory: AccountHookFactory = ({provider, ethereum, isLoading}) => () => {

    const {data, mutate, isValidating, ...swr} = useSWR(
        provider ? "web3/useAccount" : null, async () => {
            const accounts = await provider!.listAccounts();
            const account = accounts[0];

            if (!account) {
                throw "Cannot retreive account! Pelase, connect to web3 wallet."
            }

            return account
        }, {
            revalidateOnFocus: false,
            shouldRetryOnError: false
        }
    )

    useEffect(() => {
        ethereum?.on("accountsChanged", handleAccountsChange)
        return () => {
            ethereum?.removeListener("accountsChanged", handleAccountsChange)
        }
    })

    const handleAccountsChange = (...args: unknown[]) => {
        const accounts = args[0] as string[];
        if (accounts.length === 0) {
            window.location.reload()
            console.error("Please, connect to Web3 wallet")
        } else if (accounts[0] !== data) {
            mutate(accounts[0]);
        }
    }

    const connect = async () => {
        try {
            ethereum?.request({ method: "eth_requestAccounts"})
        } catch (e) {
          console.error(e)
        }
    }

    return  {
        ...swr, 
        connect, 
        mutate, 
        isValidating,
        isLoading: isLoading as boolean,
        isInstalled: ethereum?.isMetaMask || false,
        data 
    };
}
