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

const navigation = [
  { name: 'Marketplace', href: '/', current: true },
  { name: 'Cask World', href: '/caskworld', current: false },
  { name: 'Create', href: '/nft/create', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  useAuth()
  const { account } = useAccount()
  const { network } = useNetwork()
  const {
    state: { userInfoModal, signInModal, token, user },
    dispatch,
  } = useGlobal()

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
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <p className="text-xl font-bold text-white">My Cask</p>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <ActiveLink
                          activeclass="bg-gray-900 text-white"
                          key={item.name}
                          href={item.href}
                        >
                          <span
                            className={
                              'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                            }
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </span>
                        </ActiveLink>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="text-gray-300 self-center mr-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-purple-100 text-purple-800">
                      <svg
                        className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400"
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
                    account={account?.data as string}
                    connect={account.connect}
                    logout={account.logout}
                  />
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
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
