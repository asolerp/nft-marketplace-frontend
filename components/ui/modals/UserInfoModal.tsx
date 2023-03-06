import { useAccount } from '@hooks/web3'
import { useGlobal } from '@providers/global'
import { GlobalTypes } from '@providers/global/utils'
import Button from '@ui/common/Button'
import Spacer from '@ui/common/Spacer'
import React, { useState } from 'react'
import Modal from 'react-modal'

type Props = {
  modalIsOpen: boolean
  closeModal: () => void
}

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0px',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: '1',
    border: 'none',
  },
}

const UserInfoModal: React.FC<Props> = ({ modalIsOpen, closeModal }) => {
  const { account } = useAccount()

  const {
    dispatch,
    state: { user },
  } = useGlobal()
  const [email, setEmail] = useState<string>('')
  const [nickname, setNickname] = useState<string>('')

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className="w-[500px] bg-blackLight rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-90">
        {/*header*/}
        <div className="grid grid-cols-4 p-5  rounded-t">
          <div></div>
          <div className="col-span-2">
            <h3 className="text-3xl w-fit pb-2 text-center font-semibold text-white border-b border-b-caskchain">
              Create account
            </h3>
          </div>
          <button
            className="p-1 ml-auto bg-transparent border-0 text-gray-100 text-center float-right text-2xl leading-none font-semibold outline-none focus:outline-none"
            onClick={closeModal}
          >
            <span className="bg-transparent text-gray-100 text-2xl block outline-none focus:outline-none">
              ×
            </span>
          </button>
        </div>
        <Spacer className="mb-6" />
        {/*body*/}
        <div className="relative px-10 flex-auto">
          <p className="text-gray-300 font-semibold text-center text-xl mb-8">
            {
              'Your email address is only used to send you important updates. Your nickname is how other CryptoKitties players will identify you.'
            }
          </p>
          <input
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            name="email"
            id="email"
            className="w-full bg-transparent  mt-2 text-xl text-gray-100 focus:ring-0 border-transparent rounded-lg  border-gray-300 focus:border-caskchain pb-3"
            placeholder="Your email address"
          />
          <Spacer className="mb-2" />
          <input
            autoComplete="off"
            onChange={(e) => setNickname(e.target.value)}
            value={nickname}
            type="text"
            name="name"
            id="name"
            className="w-full bg-transparent  mt-2 text-xl text-gray-100 focus:ring-0 border-transparent rounded-lg border-gray-300 focus:border-caskchain pb-3"
            placeholder="Nickname (optional)"
          />
        </div>
        <Spacer className="mb-6" />
        {/*footer*/}
        <div className="flex items-center justify-center px-6 rounded-b">
          <Button
            active
            label="Continue"
            onClick={() => {
              account.handelSaveUser({
                id: user._id,
                email,
                nickname,
                callback: () => {
                  closeModal()
                  setTimeout(() => {
                    return dispatch({
                      type: GlobalTypes.SET_SIGN_IN_MODAL,
                      payload: { state: true },
                    })
                  }, 300)
                },
              })
            }}
          ></Button>
        </div>
        <Spacer className="mb-6" />
        <div className="px-10">
          <p className="text-gray-300 font-normal text-center text-md mb-8">
            By signing up, you agree to our{' '}
            <span className="text-caskchain">Terms of Service</span> and{' '}
            <span className="text-caskchain">Privacy Policy.</span>
          </p>
        </div>
      </div>
    </Modal>
  )
}

export default UserInfoModal
