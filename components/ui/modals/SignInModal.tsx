import Button from '@ui/common/Button'
import React from 'react'
import Modal from 'react-modal'
import { useAccount } from '@hooks/web3'
import { useGlobal } from '@providers/global'

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

const SignInModal: React.FC<Props> = ({ modalIsOpen, closeModal }) => {
  const { account } = useAccount()

  const {
    state: { library },
  } = useGlobal()

  console.log('LIBRARY', library)

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className="w-[500px] bg-blackLight rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-90">
        {/*header*/}
        <div className="grid grid-cols-3 p-5  rounded-t">
          <div></div>
          <div className="flex justify-center items-center">
            <h3 className="text-3xl w-fit pb-2 text-center font-semibold text-white border-b border-b-caskchain">
              Sign in
            </h3>
          </div>
          <button
            className="p-1 ml-auto bg-transparent border-0 text-white float-right text-2xl leading-none font-semibold outline-none focus:outline-none"
            onClick={closeModal}
          >
            <span className="bg-transparent text-white text-2xl block outline-none focus:outline-none">
              ×
            </span>
          </button>
        </div>
        {/*body*/}
        <div className="relative p-6 flex-auto">
          <p className="text-gray-300 font-semibold text-center text-xl mb-3">
            Almost there! As a final step your wallet will ask you to digitally
            sign in to link it with CaskChain. Click the button to proceed.
          </p>
        </div>
        {/*footer*/}
        <div className="flex items-center justify-end p-6 rounded-b">
          <button
            className="text-white background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={closeModal}
          >
            Close
          </button>
          <Button
            containerStyle="py-2 px-6"
            customTextStyle="font-medium text-sm"
            label="Sign in"
            active
            onClick={() => account.signAddress({ callback: closeModal })}
          ></Button>
        </div>
      </div>
    </Modal>
  )
}

export default SignInModal
