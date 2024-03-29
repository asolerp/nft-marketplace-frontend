/* eslint-disable @next/next/no-img-element */

import type { NextPage } from 'next'
import { BaseLayout } from '@ui'

import { Nft } from '@_types/nft'
import { useOwnedNfts } from '@hooks/web3'
import { useEffect, useState } from 'react'

import TransactionsHistory from '@ui/ntf/transactionsHistory'
import withAuth from 'components/hoc/withAuth'
import { ethers } from 'ethers'

const tabs = [{ name: 'Your Collection', href: '#', current: true }]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Profile: NextPage = () => {
  const { nfts } = useOwnedNfts()

  // const orderBottle = async () =>
  //   // numberOfBottles: number,
  //   // tokenId: number,
  //   // tokenURI: string
  //   {
  //     try {
  //       // const { address, signature } = await getSignedData(
  //       //   provider,
  //       //   account.data as string
  //       // )
  //       // const res = await axios.post(
  //       //   '/order-bottle',
  //       //   {
  //       //     address,
  //       //     signature,
  //       //     extractions: numberOfBottles,
  //       //     tokenURI,
  //       //   },
  //       //   { withCredentials: true }
  //       // )
  //       // const data = res.data as PinataRes
  //       // const newTokenURI = `${process.env.NEXT_PUBLIC_PINATA_DOMAIN}/ipfs/${data.IpfsHash}`
  //       // const tx = await contract?.orderBottle(
  //       //   numberOfBottles,
  //       //   tokenId,
  //       //   newTokenURI,
  //       //   {
  //       //     value: ethers.utils.parseEther(String(bottlePrice * numberOfBottles)),
  //       //   }
  //       // )
  //       // await toast.promise(tx!.wait(), {
  //       //   pending: 'Uploading metadata',
  //       //   success: 'Metadata uploaded',
  //       //   error: 'Metadata upload error',
  //       // })
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     } catch (e: any) {
  //       console.error(e.message)
  //     }
  //   }

  return (
    <BaseLayout>
      <div className="h-full flex">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex items-stretch">
            <main className="flex-1 overflow-y-auto">
              <div className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex">
                  <h1 className="flex-1 text-2xl font-bold text-gray-900">
                    Your NFTs
                  </h1>
                </div>
                <div className="mt-3 sm:mt-2">
                  <div className="hidden sm:block">
                    <div className="flex items-center border-b border-gray-200">
                      <nav
                        className="flex-1 -mb-px flex space-x-6 xl:space-x-8"
                        aria-label="Tabs"
                      >
                        {tabs.map((tab) => (
                          <a
                            key={tab.name}
                            href={tab.href}
                            aria-current={tab.current ? 'page' : undefined}
                            className={classNames(
                              tab.current
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                            )}
                          >
                            {tab.name}
                          </a>
                        ))}
                      </nav>
                    </div>
                  </div>
                </div>

                <section
                  className="mt-8 pb-16"
                  aria-labelledby="gallery-heading"
                >
                  <ul
                    role="list"
                    className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
                  >
                    {(nfts.data as Nft[])?.map((nft) => (
                      <li
                        key={nft.meta.name}
                        onClick={() => {
                          nfts.setIsApproved(false)
                          nfts.setActiveNft(nft)
                        }}
                        className="relative"
                      >
                        <div
                          className={classNames(
                            nft.tokenId === nfts.activeNft?.tokenId
                              ? 'ring-2 ring-offset-2 ring-indigo-500'
                              : 'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500',
                            'group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden'
                          )}
                        >
                          <img
                            src={nft.meta.image}
                            alt=""
                            className={classNames(
                              nft.tokenId === nfts.activeNft?.tokenId
                                ? ''
                                : 'group-hover:opacity-75',
                              'object-cover pointer-events-none h-40 w-full'
                            )}
                          />
                          <button
                            type="button"
                            className="absolute inset-0 focus:outline-none"
                          >
                            <span className="sr-only">
                              View details for {nft.meta.name}
                            </span>
                          </button>
                        </div>
                        <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                          {nft.meta.name}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
              {nfts.activeNft && (
                <div>
                  <TransactionsHistory
                    transactions={nfts.activeNft?.transactions}
                  />
                  <div className="sm:px-6 lg:px-8 mt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Received Offers
                    </h3>
                    {nfts?.offersData?.map((offer: any) => {
                      return (
                        <div
                          key={offer.bidder}
                          className="flex flex-row justify-between w-3/4 mb-2"
                        >
                          <div>
                            <h3 className="font-medium">Bidder</h3>
                            <p>{offer.bidder}</p>
                          </div>
                          <div>
                            <h3 className="font-medium">Bid</h3>
                            <p>{ethers.utils.formatEther(offer.bid)} ETH</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </main>

            {/* Details sidebar */}
            <aside className="hidden w-96 bg-white p-8 mt-10 mr-8 border-l border-gray-200 overflow-y-auto lg:block">
              {nfts.activeNft && (
                <div>
                  <div className="space-y-6">
                    <div>
                      <div className="block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
                        <img
                          src={nfts.activeNft.meta.image}
                          alt=""
                          className="object-cover"
                        />
                      </div>
                      <div className="mt-4 flex items-start justify-between">
                        <div>
                          <h2 className="text-lg font-medium text-gray-900">
                            <span className="sr-only">Details for </span>
                            {nfts.activeNft.meta.name}
                          </h2>
                          <p className="text-sm font-medium text-gray-500">
                            {nfts.activeNft.meta.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Information</h3>
                      <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                        {nfts.activeNft.meta.attributes.map((attr) => (
                          <div
                            key={attr.trait_type}
                            className="py-3 flex justify-between text-sm font-medium"
                          >
                            <dt className="text-gray-500">
                              {attr.trait_type}:{' '}
                            </dt>
                            <dd className="text-gray-900 text-right">
                              {attr.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>

                    <div className="flex flex-grow flex-col">
                      <button
                        onClick={() => nfts.approveSell(nfts.activeNft.tokenId)}
                        type="button"
                        className=" bg-indigo-600 py-2 px-4 mb-10 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Approve Sell
                      </button>
                      <div className="flex flex-col">
                        <input
                          onChange={(e) => nfts.setListPrice(e.target.value)}
                          value={nfts.listPrice}
                          disabled={!nfts.isApproved}
                          type="number"
                          id="first_name"
                          className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                          placeholder="Bid Amount"
                          required
                        />
                        <button
                          onClick={() => nfts.listNft(nfts.activeNft.tokenId)}
                          disabled={!nfts.isApproved}
                          type="button"
                          className="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-100 disabled:bg-slate-200"
                        >
                          Put on Sale
                        </button>
                      </div>
                      {/* <button
                        disabled={activeNft.isListed}
                        onClick={() => {
                          nfts.listNft(activeNft.tokenId, activeNft.price)
                        }}
                        type="button"
                        className="disabled:text-gray-400 disabled:cursor-not-allowed flex-1 ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        {activeNft.isListed ? 'Nft is listed' : 'List Nft'}
                      </button> */}
                    </div>
                    {/* <button
                      onClick={() =>
                        orderBottle(2, activeNft.tokenId, activeNft.tokenURI)
                      }
                      type="button"
                      className="disabled:text-gray-400 disabled:cursor-not-allowed flex-1 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Order two bottles
                    </button> */}
                  </div>
                  {/* {activeOffer && activeNft && (
                    <div>
                      <p className="mb-1">You have an offer!</p>
                      <p className="mb-2">
                        Offer:{' '}
                        {ethers.utils.formatEther(activeNft?.offer?.highestBid)}{' '}
                        ETH
                      </p>
                      <button
                        onClick={() => nfts.acceptOffer(activeNft.tokenId)}
                        type="button"
                        className="flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Accept offer
                      </button>
                    </div>
                  )} */}
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default withAuth(Profile)
