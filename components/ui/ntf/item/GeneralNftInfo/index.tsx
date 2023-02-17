import { Nft } from '@_types/nft'
import { ethers } from 'ethers'
import Image from 'next/image'
import { useState } from 'react'

type NftItemProps = {
  item: Nft
  isMarketPlace?: boolean
  blow?: boolean
}

const GeneralNftInfo: React.FC<NftItemProps> = ({
  item,
  isMarketPlace = false,
  blow,
}) => {
  const [isHover, setIsHover] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {(isHover || blow) && (
        <div className="absolute w-80 h-full -inset-0.5 bg-cyan-300 rounded-md blur-lg"></div>
      )}
      <div className="relative p-2 h-full w-80 bg-[#243267] rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-90 border-[4px] border-cyan-300">
        <div className="border-[2px] border-cyan-300 border-opacity-30 rounded-md p-2 shadow-xl">
          <div className="flex-shrink-0 relative h-52 flex justify-center items-center   rounded-md">
            <Image
              className={`absolute  mb-6 object-contain flex justify-center items-center z-10 `}
              src={'/images/cask_2.png'}
              alt="New NFT"
              width={170}
              height={100}
            />
          </div>
        </div>
        <div className="flex-1 p-6 mt-2 flex flex-col justify-between bg-slate-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50">
          <div className="flex-1">
            <div className="block mt-2">
              <p className="text-xl font-semibold text-gray-100">
                {item.meta.name}
              </p>
              <p className="text-xs text-left font-semibold text-gray-400 mt-3">
                {item.meta.description}
              </p>
            </div>
            <div className="mt-5">
              <div className="grid grid-cols-2 gap-1">
                {item.meta.attributes.map((attribute) => (
                  <div key={attribute.trait_type} className="">
                    <div>
                      <dt className=" text-sm font-medium text-gray-500">
                        {attribute.trait_type}
                      </dt>
                      <dd className="text-xs font-extrabold text-amber-200">
                        {attribute.value}
                      </dd>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {!isMarketPlace && (
          <div className="mt-3">
            <button className="bg-emerald-400 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded w-full">
              Buy for {ethers.utils.formatEther(Number(item.price).toString())}{' '}
              ETH
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default GeneralNftInfo
