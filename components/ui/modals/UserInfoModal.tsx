import { useAccount } from '@hooks/web3'
import { useGlobal } from '@providers/global'
import React, { useState } from 'react'

type Props = {
  modalIsOpen: boolean
  closeModal: () => void
}

const UserInfoModal: React.FC<Props> = ({ modalIsOpen, closeModal }) => {
  const { account } = useAccount()

  const {
    state: { user },
  } = useGlobal()
  const [email, setEmail] = useState<string>('')
  const [nickname, setNickname] = useState<string>('')

  return (
    <>
      {modalIsOpen && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-1/4 sm:w-1/2 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">
                    Create account with metamask
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-2xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={closeModal}
                  >
                    <span className="bg-transparent text-black text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="text-gray-700 mb-5">
                    {
                      'Your email address is only used to send you important updates. Your nickname is how other CryptoKitties players will identify you.'
                    }
                  </p>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="text"
                    name="email"
                    id="email"
                    className="focus:ring-indigo-500 mb-3 h-14 font-medium focus:border-indigo-500 flex-1 block w-full rounded-md text-lg border-gray-300"
                    placeholder="Your email address"
                  />
                  <input
                    onChange={(e) => setNickname(e.target.value)}
                    value={nickname}
                    type="text"
                    name="name"
                    id="name"
                    className="focus:ring-indigo-500 font-medium h-14 focus:border-indigo-500 flex-1 block w-full rounded-md text-lg border-gray-300"
                    placeholder="Nickname (optional)"
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() =>
                      account.handelSaveUser({
                        id: user._id,
                        email,
                        nickname,
                        callback: closeModal,
                      })
                    }
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  )
}

export default UserInfoModal
