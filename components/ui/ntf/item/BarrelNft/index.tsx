import Button from '@ui/common/Button'
import Spacer from '@ui/common/Spacer'
import { NftMeta } from '@_types/nft'
import Image from 'next/image'
import { useState } from 'react'

type BarrelNftProps = {
  title: string
  caskNumber?: number
  owner: string
  meta?: NftMeta
  isSlider?: boolean
}

const BarrelNft: React.FC<BarrelNftProps> = ({
  meta,
  title,
  owner,
  isSlider = false,
  caskNumber,
}) => {
  const [isMouseOver, setIsMouseOver] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      className={`relative border rounded-3xl border-gray-700 ${
        !isSlider && 'w-[384px]'
      } `}
    >
      <div>
        <Image
          src="/images/nft.png"
          width={600}
          height={600}
          alt="caskchain nft"
          className={`absolute top-0 left-0 h-[418px] w-full object-cover z-0 rounded-tl-3xl rounded-tr-3xl`}
        />
        <div className="relative h-[418px] w-full z-10"></div>
      </div>
      <div
        className={`px-6 pt-6 ${
          isMouseOver ? '-translate-y-20' : ''
        } transition-all duration-500`}
      >
        <p className="font-poppins text-caskchain">Cask Number #{caskNumber}</p>
        <h3 className="text-white text-2xl md:text-3xl font-raleway font-normal md:font-normal w-full">
          {title}
        </h3>
        <Spacer className="mb-1"></Spacer>
        <div>
          <p className="text-white text-md font-thin md:font-thin">
            Owner <span className="text-caskchain font-bold">@{owner}</span>
          </p>
        </div>
        <Spacer className="mb-4"></Spacer>
        <div className="space-x-2">
          {meta &&
            meta.attributes.map((attribute, index) => (
              <span key={index} className="text-caskchain ">
                <span className="text-white">{attribute.trait_type}</span>{' '}
                {attribute.value} <span className="text-xl text-white">·</span>
              </span>
            ))}
        </div>
        <Spacer className="mb-10"></Spacer>
      </div>
      <div className="absolute bottom-5 w-full px-4">
        <div
          className={`${
            isMouseOver ? 'opacity-1' : 'opacity-0'
          } transition-all duration-300`}
        >
          <Button fit={false} label="Place a bid" active></Button>
        </div>
      </div>
    </div>
  )
}

export default BarrelNft
