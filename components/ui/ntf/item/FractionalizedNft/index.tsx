import { Nft } from '@_types/nft'
import { ethers } from 'ethers'
import Image from 'next/image'
import { useState } from 'react'

type NftItemProps = {
  item: Nft
  blow?: boolean
}

const FractionalizedNftItem: React.FC<NftItemProps> = ({
  item,
  blow = false,
}) => {
  const [isHover, setIsHover] = useState(false)
  const fractionPrice =
    item.fractions?.unitPrice &&
    (Number(ethers.utils.parseEther('1')) / item.fractions.unitPrice).toString()

  return (
    <div
      className="relative scale-150"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover ||
        (blow && (
          <div className="absolute w-80 h-full -inset-0.5 bg-cyan-300 rounded-md blur-lg"></div>
        ))}
      <div className="relative p-2 h-full w-80 bg-[#243267] rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-90 border-[4px] border-cyan-300">
        <div className="border-[2px] border-cyan-300 border-opacity-30 rounded-md p-2 shadow-xl">
          <div className="flex-shrink-0 relative h-52 flex justify-center items-center rounded-md">
            <Image
              className={`absolute w-48 object-contain flex justify-center items-center z-10 `}
              src={'/images/cask_2.png'}
              alt="New NFT"
              width={170}
              height={100}
            />
          </div>
        </div>
        <div className="flex-1 p-6 mt-2 flex flex-col justify-between bg-slate-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50">
          <div className="flex-1">
            {/* <div className="flex flex-row justify-between">
                <p className=" text-white mb-5">Owner</p>
                <p className="text-gray-200">{`0x${item.owner[2]}${
                  item.owner[3]
                }${item.owner[4]}....${item.owner.slice(-4)}`}</p>
              </div> */}

            {/* <p className="text-sm font-medium text-amber-200">
                Cask NFT {item.tokenId}#
              </p> */}
            <div className="mt-2 flex flex-col">
              <h3 className="text-2xl text-left font-semibold text-gray-100 mb-3">
                {item.meta.name}
              </h3>
              <p className="text-sm text-left  text-gray-400">
                {item.meta.description}
              </p>
            </div>
            <div className="mt-4 pb-5">
              <div className="grid grid-cols-2 gap-2">
                {item.meta.attributes.map((attribute) => (
                  <div key={attribute.trait_type} className="">
                    <div>
                      <dt className=" text-xs font-medium text-gray-100">
                        {attribute.trait_type.toUpperCase()}
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
        {item.fractions && (
          <>
            <div className="flex-1 px-6 py-3 mt-3 flex flex-col justify-between bg-slate-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50">
              <div className="grid grid-cols-2 gap-1">
                <div>
                  <dt className=" text-sm font-medium text-gray-500">Total</dt>
                  <dd className="text-xs font-extrabold text-green-300">
                    {item.fractions.total}
                  </dd>
                </div>
                <div>
                  <dt className=" text-sm font-medium text-gray-500">
                    Available
                  </dt>
                  <dd className="text-xs font-extrabold text-green-300">
                    {item.fractions.available.toFixed(2)}
                  </dd>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <button className="bg-emerald-400 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded w-full">
                Buy 1 fraction ~ {ethers.utils.formatEther(fractionPrice)} ETH
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default FractionalizedNftItem
