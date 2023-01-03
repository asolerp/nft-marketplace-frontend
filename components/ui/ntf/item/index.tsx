import { useAccount } from "@hooks/web3";
import { useState } from "react";
import { Nft, NftMeta } from "../../../../types/nft";

type NftItemProps = {
    item: Nft,
    burnNft: (tokenId: number) => Promise<void>,
    buyNftWithEUR: (tokenId: number, address: string) => Promise<void>;
    buyNft: (tokenId: number, price: number) => Promise<void>
}

const NftItem: React.FC<NftItemProps> = ({ item, buyNft, burnNft, buyNftWithEUR }) => {

    const { account } = useAccount()
    const [address, setAddress] = useState('')

    return (
        <>
            <div className="flex-shrink-0 relative h-52 flex justify-center items-center">
                <img
                    className={`absolute h-52 w-full object-cover top-0`}
                    src={item.meta.image}
                    alt="New NFT"
                />
                <img
                    className={`h-28 w-42 object-cover flex justify-center items-center z-10 rounded-full`}
                    src={"/suau_logo.png"}
                    alt="New NFT"
                />
            </div>
            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
            <div className="flex-1">
                <p className="text-sm font-medium text-indigo-600">
                Cask NFT
                </p>
                <div className="block mt-2">
                <p className="text-xl font-semibold text-gray-900">{item.meta.name}</p>
                <p className="mt-3 mb-3 text-base text-gray-500">{item.meta.description}</p>
                </div>
            </div>
            <div className="overflow-hidden mb-4">
                <dl className="-mx-4 -mt-4 flex flex-wrap">
                <div className="flex flex-col px-4 pt-4">
                    <dt className="order-2 text-sm font-medium text-gray-500">Price</dt>
                    <dd className="order-1 text-xl font-extrabold text-indigo-600">
                    <div className="flex justify-center items-center">
                        {item.price}
                        <img alt="ETH_logo" className="h-6" src="/eth_logo.png"/>
                    </div>
                    </dd>
                </div>
                  {
                    item.meta.attributes.map(attribute => (
                        <div key={attribute.trait_type} className="flex flex-col px-4 pt-4">
                            <dt className="order-2 text-sm font-medium text-gray-500">{attribute.trait_type}</dt>
                            <dd className="order-1 text-xl font-extrabold text-indigo-600">{attribute.value}</dd>
                        </div>
                    ))
                  }
                </dl>
            </div>
            <div>
                <button
                onClick={() => buyNft(item.tokenId, item.price)}
                type="button"
                className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed mr-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                Buy with ETH
                </button>
                {
                    item.creator === item.owner && (
                        <div className="flex-row mt-6">
                            <input onChange={(e) => setAddress(e.target.value)} type="text" id="first_name" className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ETH Adress" required></input>
                            <button
                            onClick={() => buyNftWithEUR(item.tokenId, address)}
                            type="button"
                            className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed mr-2 mb-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Buy with EUR
                            </button>
                        </div>
                    )
                }
                <button
                type="button"
                className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed mr-2 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                Preview
                </button>
                {
                  item.creator === account.data && (
                    <button
                      onClick={() => burnNft(item.tokenId)}
                      type="button"
                      className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed mr-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-700 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Burn NFT with ETH
                    </button>
                  )
                }
            </div>
            </div>
        </>
    )
}

export default NftItem