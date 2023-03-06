import Spacer from '@ui/common/Spacer'
import React from 'react'

type StatProps = {
  title: string
  value: number
}

const Stat: React.FC<StatProps> = ({ title, value }) => {
  const firstValue = (value: number) => {
    if (value > 1000) {
      return value / 1000
    }
    return value
  }

  const secondValue = (value: number) => {
    if (value > 1000) {
      return `K`
    }
  }

  return (
    <div className="flex flex-col space-y-2 justify-center items-center">
      <h3 className="text-caskchain text-4xl font-bold font-raleway tracking-widest">
        {firstValue(value)}
        <span className="text-5xl">{secondValue(value)}</span>
      </h3>
      <Spacer className="mb-2" />
      <p className="text-white text-opacity-60 font-poppins">{title}</p>
    </div>
  )
}

const GeneralStats = () => {
  return (
    <div className="flex flex-row justify-between p-6 md:space-x-10 bg-gray-400 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 w-full md:w-fit">
      <Stat title="Wallets" value={12000} />
      <div className="flex border border-gray-300 border-opacity-40 my-3" />
      <Stat title="Brands" value={10} />
      <div className="flex border border-gray-300 border-opacity-40 my-3" />
      <Stat title="Casks" value={200} />
    </div>
  )
}

export default GeneralStats
