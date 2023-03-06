import { Menu } from '@headlessui/react'
import Button from '@ui/common/Button'
import Image from 'next/image'
import Link from 'next/link'
import transakSDK from '@transak/transak-sdk'
import { useGlobal } from '@providers/global'
import { GlobalTypes } from '@providers/global/utils'

type WalletbarProps = {
  isLoading: boolean
  user: any
  balance?: string
  erc20Balances?: any
  isInstalled: boolean
  token: string | null
  account: string
  connect: () => void
  logout: () => void
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Walletbar: React.FC<WalletbarProps> = ({
  erc20Balances,
  isInstalled,
  isLoading,
  account,
  balance,
  token,
  user,
  logout,
  connect,
}) => {
  const {
    state: { sideMenu },
    dispatch,
  } = useGlobal()

  const handleBuyCrypto = () => {
    const transak = new transakSDK({
      apiKey: '69733794-9ee8-4b0c-87d7-da8bb74f7b4e', // (Required)
      environment: 'STAGING', // (Required)
      network: 'polygon',
      walletAddress: account,
      widgetHeight: '700px',
      disableWalletAddressForm: true,
      // .....
      // For the full list of customisation options check the link above
    })

    transak.init()

    // To get all the events
    transak.on(transak.ALL_EVENTS, (data) => {
      console.log(data)
    })

    // This will trigger when the user closed the widget
    transak.on(transak.EVENTS.TRANSAK_WIDGET_CLOSE, (orderData) => {
      transak.close()
    })

    // This will trigger when the user marks payment is made
    transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
      console.log(orderData)
      transak.close()
    })
  }

  // if (isLoading) {
  //   return (
  //     <div>
  //       <button
  //         type="button"
  //         className="inline-flex items-center px-6 py-3 border border-transparent text-xs font-medium rounded-full shadow-sm text-black bg-caskchain focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-caskchain"
  //       >
  //         Loading ...
  //       </button>
  //     </div>
  //   )
  // }

  if (isInstalled) {
    if (token && user?.email) {
      return (
        <div className="flex justify-center items-center">
          <div>
            <p
              onClick={() =>
                dispatch({
                  type: GlobalTypes.SET_SIDE_MENU,
                  payload: { state: !sideMenu },
                })
              }
              className="bg-caskchain cursor-pointer p-1 justify-center items-center hover:border flex flex-row text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white ml-5"
            >
              <Image src="/images/user.png" alt="" width={40} height={40} />
              <p className="px-3">
                {user?.nickname ||
                  `0x${account[2]}${account[3]}${account[4]}....${account.slice(
                    -4
                  )}`}
              </p>
            </p>
          </div>
        </div>
      )
    }
    return (
      <div>
        <button
          onClick={() =>
            dispatch({
              type: GlobalTypes.SET_SIDE_MENU,
              payload: { state: !sideMenu },
            })
          }
          type="button"
          className="ml-3 ring-caskchain ring-2 inline-flex items-center px-6 py-3 border border-transparent text-sm text-black font-medium rounded-full bg-caskchain hover:bg-opacity-60 shadow-xl"
        >
          Start
        </button>
      </div>
    )
  } else {
    return (
      <div>
        <button
          onClick={() => {
            window.open('https://metamask.io', '_ blank')
          }}
          type="button"
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          No Wallet
        </button>
      </div>
    )
  }
}

export default Walletbar
