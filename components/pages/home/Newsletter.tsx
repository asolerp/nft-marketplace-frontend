import useQuery from '@hooks/common/useQuery'
import Button from '@ui/common/Button'
import Card from '@ui/common/Card'
import Spacer from '@ui/common/Spacer'
import Image from 'next/image'
import React from 'react'

const Newsletter = () => {
  const { isMobile } = useQuery()

  return (
    <div>
      <div className="flex flex-col items-center justify-start bg-blackLight  md:px-0 md:mt-0 pt-20">
        <div className="flex flex-col items-center md:px-32 mb-24">
          <h2 className="text-4xl md:text-6xl font-semibold mb-10 md:mb-7 text-white font-raleway">
            How To Be Owner
          </h2>
          <div className="flex flex-col md:grid grid-cols-3 gap-6 w-full md:w-2/4 px-6">
            <Card
              img="/images/type_1.png"
              title="Set up your wallet"
              subtitle="Once you’ve set up your wallet of choice, connect it to OpenSea by clicking the wallet icon in the top right corner. Learn about the wallets we support."
            />
            <Card
              img="/images/type_2.png"
              title="Buy your NFTs"
              subtitle="Choose your barrels according to the preferences and characteristics in the description. All wineries update the qualities of their content."
            />
            <Card
              img="/images/type_3.png"
              title="List them for sale"
              subtitle="Choose between auctions, fixed-price listings, and declining-price listings. You choose how you want to sell your NFTs, and we help you sell them!"
            />
          </div>
        </div>
        <div className="hidden md:flex bg-heroBanner w-full h-[798px] bg-cover bg-center items-center justify-end">
          <div className="px-20">
            <div className="w-full md:w-80 bg-gray-400 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-4 md:p-6">
              <div className="flex md:hidden flex-col items-center justify-center w-full bg-gray-400 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 px-6 py-2 mb-6">
                <Spacer className="mb-1"></Spacer>
                <p className="text-caskchain font-bold">4h:32m:16s Left</p>
              </div>
              <h3 className="text-white text-2xl md:text-4xl font-raleway font-normal md:font-bold text-center leading-5">
                Now you can be a pioneer in the digital world of spirits.
              </h3>
              <Spacer className="mb-10"></Spacer>
              <div>
                <Button fit={false} label="Set Up Now" active></Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:hidden bg-white items-center py-20 w-full">
          <Image
            src="/images/letter_cask_chain.png"
            width={300}
            height={500}
            alt="letter caskchain"
          />
          <Button label="Set Up Now" active></Button>
        </div>
        <div className="mt-20 flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-semibold mb-5 md:mb-7 text-white font-raleway text-center">
            Meet CaskChain
          </h2>
          <p className="text-gray-400 text-center w-full md:w-2/3 px-12 md:px-32">
            we work quickly & with maximum security check out the video below to
            know how we work
          </p>
          <div className="relative my-4 md:my-10 p-6">
            <div className="absolute z-10 p-6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blackLight bg-opacity-60 rounded-full flex justify-center items-center">
              <Image
                src="/images/play.png"
                width={35}
                height={35}
                alt="meet caskchain"
              />
            </div>
            <Image
              src="/images/meet_banner.png"
              width={400}
              height={600}
              alt="caskchain nft"
              className="w-full h-96 object-cover rounded-3xl"
            />
          </div>
        </div>
      </div>
      <Image
        src="/images/wave.svg"
        width={1000}
        height={500}
        alt="caskchain nft"
        className="w-screen hidden md:block"
      />
      <div className="my-20 px-4 md:px-60">
        <div className="flex flex-col md:grid grid-cols-2 gap-8">
          <div className="md:flex md:justify-end">
            <Image
              src={
                isMobile
                  ? '/images/mobile_banner_1.png'
                  : '/images/background.png'
              }
              width={700}
              height={700}
              alt="caskchain nft"
              className="rounded-3xl h-[350px] object-cover object-center"
            />
          </div>
          <div className="flex flex-col items-center md:items-start space-y-6 justify-center mt-4 md:mt-10">
            <h3 className="text-4xl md:text-6xl font-raleway font-semibold  text-center md:text-left">
              Never Miss A Drop
            </h3>
            <p className="mt-4 text-xl text-gray-400 font-poppins font-light text-center md:text-left">
              Subscribe to get fresh newe updatetrending NFT
            </p>
            <Spacer className="mb-6"></Spacer>
            <div className="flex flex-row ring-gray-300 ring-1 rounded-full p-2 pl-6">
              <input
                placeholder="Enter your email"
                className="outline-0"
              ></input>
              <Button
                label="Subscribe"
                customTextStyle="text-lg"
                containerStyle="py-2 px-6"
                active
              ></Button>
            </div>
          </div>
        </div>
      </div>
      <Image
        src="/images/wave_2.svg"
        width={1000}
        height={500}
        alt="caskchain nft"
        className="w-screen"
      />
    </div>
  )
}

export default Newsletter
