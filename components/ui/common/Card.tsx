import useQuery from '@hooks/common/useQuery'
import Image from 'next/image'
import React from 'react'

type CardProps = {
  title: string
  subtitle: string
  img: string
}

const Card: React.FC<CardProps> = ({ title, subtitle, img }) => {
  const { isMobile } = useQuery()

  return (
    <div className="bg-[#292929] py-10 px-7 rounded-3xl w-fit flex flex-col items-center space-y-4">
      <Image
        src={img}
        width={isMobile ? 60 : 40}
        height={isMobile ? 60 : 40}
        alt="caskchain nft"
        className=""
      />
      <h3 className="text-white text-2xl font-raleway">{title}</h3>
      <p className="text-gray-400 font-poppins text-md text-center">
        {subtitle}
      </p>
    </div>
  )
}

export default Card
