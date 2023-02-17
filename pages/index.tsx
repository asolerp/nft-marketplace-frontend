/* eslint-disable @next/next/no-img-element */

import type { NextPage } from 'next'
import { BaseLayout, NftList } from '@ui'
import { useNetwork } from '@hooks/web3'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import FractionalizedNftList from '@ui/ntf/lists/fractionalizedList'
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax'
import FractionalizedNftItem from '@ui/ntf/item/FractionalizedNft'

const Home: NextPage = () => {
  const { network } = useNetwork()

  return (
    <>
      <BaseLayout>
        <div className="flex h-screen">
          <ParallaxBanner className="aspect-[2/1] ">
            <ParallaxBannerLayer speed={10} className="flex items-end">
              <img
                src="/images/bg-cc-2.png"
                alt="Sahara Desert landscape"
                loading="lazy"
                className="w-screen "
              />
            </ParallaxBannerLayer>
            <ParallaxBannerLayer
              speed={-40}
              scale={[1, 1]}
              className="flex justify-end items-center"
            >
              <div className="grid grid-cols-2 h-full">
                <div></div>
                <div className="flex flex-col justify-center pl-32">
                  <h2 className="tracking-tight font-extrabold text-gray-100 sm:text-7xl w-2/3 ">
                    NFT Marketplace for Brandy Connoisseurs
                  </h2>
                  <p className="mt-3 text-3xl w-10/12 text-gray-300 text-opacity-80 sm:mt-4">
                    Secure, blockchain-based marketplace that brings together
                    the best casks from around the world, making it easier than
                    ever for you to own a piece of liquid history.
                  </p>
                  {/* <button className="bg-amber-300 w-60 text-gray-900 font-bold text-xl rounded-full px-4 py-4 mt-10 hover:bg-amber-400 transition duration-300 ease-in-out">
                    Get Started
                  </button> */}
                </div>
              </div>
            </ParallaxBannerLayer>
            <ParallaxBannerLayer
              speed={0}
              scale={[1, 1.5]}
              className="flex items-end"
            >
              <img
                src="/images/bg-cc-1.png"
                alt="Sahara Desert landscape"
                loading="lazy"
              />
            </ParallaxBannerLayer>
          </ParallaxBanner>
        </div>
        {/* <div className="flex items-end h-screen">
          <img
            src="/images/bg-cc-1.png"
            alt="hero"
            className="w-screen  object-fill m-0"
          />
        </div> */}
        {/* <div className="relative pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
          <div className="absolute inset-0">
            <div className=" h-1/3 sm:h-2/3" />
          </div>
          <div className="relative mt-7">
            <div className="grid grid-cols-3 gap-4 mb-20">
              <div className="col-span-2 justify-center w-10/12">
                <h2 className="tracking-tight font-extrabold text-gray-100 sm:text-9xl">
                  The most powerful marketplace for{' '}
                  <span className="text-amber-300">casks</span> and{' '}
                  <span className="text-amber-300">NFTs</span>.
                </h2>
                <p className="mt-3 text-3xl w-10/12 text-gray-300 text-opacity-80 sm:mt-4">
                  Secure, blockchain-based marketplace that brings together the
                  best casks from around the world, making it easier than ever
                  for you to own a piece of liquid history.
                </p>
              </div>
              <div className="justify-center items-center">
                <img
                  className="object-contain"
                  src="/images/cask.png"
                  width={400}
                  alt="cask"
                />
              </div>
            </div>
            {network.isConnectedToNetwork ? (
              <div className="flex flex-col">
                <FractionalizedNftList />
                <div className="mr-10" />
                <NftList />
              </div>
            ) : (
              <div className="rounded-md bg-yellow-50 p-4 mt-10">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-yellow-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Attention needed
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        {network.isLoading
                          ? 'Loading...'
                          : `Connect to ${network.targetNetwork}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div> */}
        <div className="bg-gradient-to-r from-[#281C40] via-[#6F4B3E] to-[#B19251] h-screen">
          <ParallaxBanner className="aspect-[2/1] h-screen">
            <ParallaxBannerLayer
              speed={40}
              scale={[1, 1]}
              className="flex justify-start items-center"
            >
              <div className="flex flex-col justify-center pl-32 w-1/2">
                <h2 className="text-gray-100 text-9xl font-semibold">
                  The Collection
                </h2>
                <p className="mt-3 text-3xl text-gray-300 text-opacity-80 sm:mt-4">
                  Each NFT represents a unique, specific cask, and the owner of
                  the NFT is the legal owner of that cask. The NFT may include
                  information about the age, type, and other characteristics of
                  the spirit, as well as any relevant historical information or
                  certifications.
                </p>
              </div>
            </ParallaxBannerLayer>
            <ParallaxBannerLayer
              speed={20}
              scale={[1, 1]}
              className="flex justify-end w-3/4 items-center"
            >
              <FractionalizedNftItem
                blow
                item={{
                  tokenId: 1,
                  owner: '0x00000000',
                  meta: {
                    image: '/images/hero.png',
                    name: 'Brandy Suau #100',
                    description:
                      'Es un brandy único que impresionará a cualquier amante de los destilados.',
                    attributes: [
                      { trait_type: 'year', value: '1992' },
                      { trait_type: 'extractions', value: '6' },
                      { trait_type: 'country', value: 'Spain' },
                      { trait_type: 'region', value: 'Balearic Islands' },
                    ],
                  },
                }}
              />
            </ParallaxBannerLayer>
            <ParallaxBannerLayer
              speed={0}
              scale={[1, 1]}
              className="flex justify-end items-end"
            >
              <img src="/images/montain.png" alt="cask" />
            </ParallaxBannerLayer>
          </ParallaxBanner>
          {/* <div className="grid grid-cols-2 p-10 h-full">
            <div className="flex flex-col justify-center items-start h-full">
              <h2 className="text-gray-100 text-9xl font-semibold">
                The Collection
              </h2>
              <p className="mt-3 text-3xl text-gray-300 text-opacity-80 sm:mt-4">
                Each NFT represents a unique, specific cask, and the owner of
                the NFT is the legal owner of that cask. The NFT may include
                information about the age, type, and other characteristics of
                the spirit, as well as any relevant historical information or
                certifications.
              </p>
            </div>
            <div>
              <img src="/images/montain.png" alt="cask" />
            </div>
          </div> */}
        </div>
      </BaseLayout>
    </>
  )
}

export default Home
