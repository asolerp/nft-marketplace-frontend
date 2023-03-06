import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import ActiveLink from '../link'

import { useAccount, useNetwork } from '@hooks/web3'
import Walletbar from './Walletbar'
import SignInModal from '@ui/modals/SignInModal'

import { useGlobal } from '@providers/global'
import { GlobalTypes } from '@providers/global/utils'
import UserInfoModal from '@ui/modals/UserInfoModal'
import { useAuth } from '@hooks/auth'
import Link from 'next/link'
import Image from 'next/image'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Explore', href: '/explore' },
  { name: 'Marketplace', href: '/marketplace' },
  { name: 'Stats', href: '/stats' },
  { name: 'About us', href: '/about' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  useAuth()
  const { account } = useAccount()
  const { network } = useNetwork()
  const {
    state: { sideMenu },
  } = useGlobal()
  const {
    state: { userInfoModal, signInModal, token, user },
    dispatch,
  } = useGlobal()

  const sideMenuActiveClass = sideMenu
    ? 'bg-blackLight bg-opacity-80'
    : 'border-0'

  return (
    <>
      <SignInModal
        modalIsOpen={signInModal}
        closeModal={() =>
          dispatch({
            type: GlobalTypes.SET_SIGN_IN_MODAL,
            payload: { status: false },
          })
        }
      />
      <UserInfoModal
        modalIsOpen={userInfoModal}
        closeModal={() =>
          dispatch({
            type: GlobalTypes.SET_USER_INFO_MODAL,
            payload: { status: false },
          })
        }
      />
      <Disclosure as="nav">
        {({ open }) => (
          <>
            <div
              className={`absolute top-0 z-50 mx-auto w-full px-3 lg:px-40 transition-color duration-700 ${sideMenuActiveClass}`}
            >
              <div className="relative bg-transparent flex h-24 items-center justify-between">
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-1 items-center">
                    <Link href={`/`}>
                      <div className="flex flex-row space-x-3 items-center">
                        <Image
                          src="/images/logo_cask_chain.svg"
                          alt="logo caskchain"
                          className="w-40 lg:w-40"
                          width={205}
                          height={74}
                        />
                      </div>
                    </Link>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                    {/* Mobile menu button*/}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-100 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-10 w-10"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="md:flex flex-grow space-x-6 justify-center items-center hidden">
                    {navigation.map((item: any) => (
                      <ActiveLink
                        activeclass="border-b-4 border-b-caskchain bg-transparent text-caskchain"
                        key={item.name}
                        href={item.href}
                      >
                        <span
                          className={
                            'text-white hover:text-caskchain px-2 py-5 text-md '
                          }
                          aria-current={item?.current ? 'page' : undefined}
                        >
                          {item.name}
                        </span>
                      </ActiveLink>
                    ))}
                  </div>
                  <div className="md:flex flex-1 justify-end items-center pr-2 sm:static sm:inset-auto sm:pr-0 hidden">
                    <div className="text-gray-200 self-center mr-2">
                      <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium ring-caskchain ring-2 text-caskchain shadow-lg">
                        <svg
                          className="-ml-0.5 mr-1.5 h-2 w-2 text-caskchain"
                          fill="currentColor"
                          viewBox="0 0 8 8"
                        >
                          <circle cx={4} cy={4} r={3} />
                        </svg>
                        {network.isLoading
                          ? 'Loading...'
                          : account.isInstalled
                          ? network.data
                          : 'Install Web3 Wallet'}
                      </span>
                    </div>
                    <Walletbar
                      token={token}
                      user={user}
                      isInstalled={account.isInstalled}
                      isLoading={account.isLoading}
                      balance={account.balance}
                      erc20Balances={account.erc20balances}
                      account={account?.data as string}
                      connect={account.connect}
                      logout={account.logout}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item: any) => (
                  <Disclosure.Button
                    key={item?.name}
                    as="a"
                    href={item?.href}
                    className={classNames(
                      item?.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item?.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  )
}
