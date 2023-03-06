import Button from '@ui/common/Button'
import { Nft } from '@_types/nft'
import { ethers } from 'ethers'
import Image from 'next/image'
import { useState } from 'react'

type Props = {
  cask: Nft
  onBuy: () => void
  onBuyWithERC20: (tokenAddress: string, price: string) => void
}

type CoinSelectorProps = {
  active: boolean
  onPress: () => void
  children: React.ReactNode
}

const CoinSelector: React.FC<CoinSelectorProps> = ({
  active,
  onPress,
  children,
}) => {
  const activeClass = active && 'bg-caskchain text-black w-18'
  return (
    <div
      onClick={onPress}
      className={`cursor-pointer w-18 h-12 p-3 flex justify-center items-center ${activeClass}`}
    >
      {children}
    </div>
  )
}

const OnSale: React.FC<Props> = ({ cask, onBuy, onBuyWithERC20 }) => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="p-6 w-2/3 bg-blackLight rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-90  grid grid-cols-1 divide-y shadow-xl border border-gray-700">
      <div className="w-2/3">
        <h1 className="text-2xl font-semibold text-gray-100 mb-4">
          {cask?.meta?.name.toUpperCase()}
        </h1>
        <p className="text-caskchain">SOLD BY</p>
        <p className="text-gray-300">CASK CHAIN</p>
      </div>
      <div className="flex items-center">
        <div>
          <div className="grid grid-cols-2 divide-x border mb-6 w-[150px]">
            <CoinSelector
              active={activeTab === 0}
              onPress={() => setActiveTab(0)}
            >
              <Image
                src={
                  activeTab === 0
                    ? '/images/eth_logo_black.svg'
                    : '/images/eth_logo.svg'
                }
                width={18}
                height={18}
                className="object-contain"
                alt="eth"
              />
            </CoinSelector>
            <CoinSelector
              active={activeTab === 1}
              onPress={() => setActiveTab(1)}
            >
              <span
                className={`text-lg ${
                  activeTab === 1 ? 'text-blackLight' : 'text-white'
                } `}
              >
                USDT
              </span>
            </CoinSelector>
          </div>
          <p className="text-caskchain mb-1">PRICE</p>
          <h2 className="text-5xl text-gray-100">
            {activeTab === 0
              ? Number(
                  ethers.utils.formatEther(cask?.price).toString()
                ).toLocaleString('es-ES')
              : Number(
                  ethers.utils.formatEther(cask?.erc20Prices?.USDT).toString()
                ).toLocaleString('es-ES')}{' '}
            {activeTab === 0 ? 'ETH' : 'USDT'}
          </h2>
        </div>
      </div>
      <div className="flex items-center">
        <Button
          label="BUY CASK"
          active
          onClick={() =>
            activeTab === 0
              ? onBuy()
              : onBuyWithERC20(
                  '0x4289231D30cf6cD58aa63aBa44b44E321c43eE57',
                  cask?.erc20Prices?.USDT.toString()
                )
          }
          fit={false}
        ></Button>
      </div>
    </div>
  )
}

export default OnSale
