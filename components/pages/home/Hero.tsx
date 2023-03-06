import React from 'react'
import Button from '@ui/common/Button'
import Spacer from '@ui/common/Spacer'
import GeneralStats from '@ui/stats/GeneralStats'
import Image from 'next/image'
import { useGlobal } from '@providers/global'

const Hero = () => {
  const {
    state: { sideMenu },
  } = useGlobal()

  return (
    <div>
      <div
        className={`absolute top-0 w-screen h-screen z-20 transition-all duration-700 ${
          sideMenu ? 'bg-blackLight bg-opacity-80' : 'bg-transparent'
        }`}
      ></div>
      <div
        className={`relative flex items-center md:h-screen px-6 lg:px-40 lg:pt-24 bg-mobileBg md:bg-normalBg bg-cover pb-14 transition-all duration-700 bg-black`}
      >
        <div className="md:h-2/3 z-10">
          <div className="grid sm:grid-cols-1 lg:grid-cols-3 z-10">
            <div className="flex flex-col md:hidden mt-8">
              <div className="flex flex-col justify-center mt-36">
                <h1 className="tracking-tight font-raleway text-center text-white text-gray-100 text-5xl mb-4 leading-snug font-bold">
                  Discover, collect, and take the best
                  <span className="text-caskchain"> NFT Cask</span>
                </h1>
                <p className="text-md font-poppins text-gray-300 text-opacity-80 font-thin leading-2 text-center">
                  The world's first and largest NFT marketplace to{' '}
                  <span className="text-caskchain">
                    own a piece of liquid story
                  </span>
                </p>
                <Spacer className="mb-8"></Spacer>
                <div className="flex flex-col">
                  <Button label="Explore" active fit={false} />
                  <Spacer className="mb-6"></Spacer>
                  <Button label="Create" fit={false} />
                </div>
              </div>
              <div className="flex flex-col justify-start mt-10">
                <Image
                  src="/images/nft.png"
                  width={300}
                  height={300}
                  alt="caskchain nft"
                  className="w-full object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-2 md:flex flex-col hidden">
              <h1 className="tracking-tight font-raleway text-gray-100 sm:text-8xl mb-10 font-extrabold">
                <span className="text-caskchain">NFT Cask</span> Marketplace for
                Brandy connoisseurs
              </h1>
              <p className="text-3xl font-poppins text-gray-300 text-opacity-80 font-thin w-3/4 leading-10">
                Secure, blockchain-based marketplace that brings together the
                best casks from around the world, making it easier than ever for
                you to{' '}
                <span className="text-caskchain">
                  own a piece of liquid history
                </span>
              </p>
              <Spacer className="mb-20"></Spacer>
              <div className="flex flex-row">
                <Button label="Explore" active />
                <Spacer className="mr-6"></Spacer>
                <Button label="Create" />
              </div>
              <Spacer className="mb-10"></Spacer>
              <div>
                <GeneralStats />
              </div>
            </div>
            <div className="flex flex-row items-end md:-ml-60 -mt-24">
              <div className="w-full flex flex-col md:flex-row items-center justify-start">
                <div className="w-full md:w-fit bg-gray-400 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-4 md:p-6">
                  <div className="flex md:hidden flex-col items-center justify-center w-full bg-gray-400 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 px-6 py-2 mb-6">
                    <h3 className="text-white text-lg font-poppins font-thin">
                      Auction ends in
                    </h3>
                    <Spacer className="mb-1"></Spacer>
                    <p className="text-caskchain font-bold">4h:32m:16s Left</p>
                  </div>
                  <h3 className="text-white text-2xl md:text-4xl font-raleway font-normal md:font-bold">
                    Cherry Cask
                  </h3>
                  <Spacer className="mb-4"></Spacer>
                  <div>
                    <p className="text-white text-xl font-thin md:font-normal">
                      Creator{' '}
                      <span className="text-caskchain font-bold">@Alberto</span>
                    </p>
                  </div>
                  <Spacer className="mb-4"></Spacer>
                  <div className="flex flex-row items-center space-x-2">
                    <p className="text-white text-xl font-thin md:font-normal">
                      Currant
                    </p>
                    <Image
                      src="/images/eth_logo.svg"
                      alt="ethereum logo"
                      width={10}
                      height={10}
                    ></Image>
                    <p className="text-caskchain font-bold">329.00 ETH</p>
                  </div>
                  <Spacer className="mb-10"></Spacer>
                  <div>
                    <Button fit={false} label="Place a bid" active></Button>
                  </div>
                </div>
                <Spacer className="mr-20"></Spacer>
                <div className="md:flex hidden flex-col items-center justify-center w-fit bg-gray-400 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-6">
                  <h3 className="text-white text-2xl font-poppins">
                    Auction ends in
                  </h3>
                  <Spacer className="mb-2"></Spacer>
                  <p className="text-caskchain font-bold">4h:32m:16s Left</p>
                </div>
                <div className="w-full mt-8 block md:hidden">
                  <GeneralStats />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
