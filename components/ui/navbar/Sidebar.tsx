import classNames from 'classnames'
import React from 'react'

import { useGlobal } from '@providers/global'
import Image from 'next/image'
import { useAccount } from '@hooks/web3'

const Sidebar = () => {
  const {
    state: { sideMenu, token, user },
  } = useGlobal()

  const { account } = useAccount()

  console.log('ACCOUTN', account)

  return (
    <div
      className={`h-screen w-[500px] fixed ${
        sideMenu ? 'right-0' : '-right-[500px]'
      } divide-y divide-gray-500 py-6 top-[96px] border-l border-gray-800 shadow-xl bg-blackLight z-50 transition-all duration-500 ease-in-out`}
    >
      <div className="p-6">
        <h3 className="font-poppins text-gray-300 text-3xl">My wallet</h3>
      </div>
      {(!token || !user?.email) && (
        <div className="p-6">
          <div className="py-3 border border-gray-600 rounded-lg bg-gray-800 bg-opacity-80 divide-y divide-gray-600">
            <div
              onClick={() => account.connectCoinbase()}
              className="flex flex-row items-center space-x-4 py-3 px-6"
            >
              <Image
                src="/icons/cb.png"
                alt="coinbase"
                width={30}
                height={30}
                className="rounded-full"
              />
              <p className="font-poppins text-white text-lg">Coinbase Wallet</p>
            </div>
            <div
              onClick={() => account.connect()}
              className="flex flex-row items-center space-x-4 py-3 px-6"
            >
              <Image
                src="/icons/mm.png"
                alt="coinbase"
                width={30}
                height={30}
                className="rounded-full"
              />
              <p className="font-poppins text-white text-lg">Metamask</p>
            </div>
            <div
              onClick={() => account.connectWaletConnect()}
              className="flex flex-row items-center space-x-4 py-3 px-6"
            >
              <Image
                src="/icons/wc.png"
                alt="coinbase"
                width={30}
                height={30}
                className="rounded-full"
              />
              <p className="font-poppins text-white text-lg">Wallet Connect</p>
            </div>
          </div>
        </div>
      )}
      <div className="p-6">
        {token && user?.email && (
          <div className="mt-10">
            <span
              onClick={() => account.logout()}
              className={classNames('text-white', 'block px-4 py-2 text-xl')}
            >
              Logout
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar
