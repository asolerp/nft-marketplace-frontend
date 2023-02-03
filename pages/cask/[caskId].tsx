import { useCaskNft } from '@hooks/web3'
import { BaseLayout } from '@ui'
import { ethers } from 'ethers'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

// import React from 'react'
function CaskDetail() {
  const route = useRouter()
  const { cask } = useCaskNft({ caskId: route.query.caskId as string })

  const [bid, setBid] = useState<string>()

  console.log('cask', cask)

  const bg_image =
    'https://www.whiskyfoundation.com/wp-content/uploads/2017/05/pjimage-40.jpg'

  return (
    <BaseLayout>
      <div className="relative">
        <div className="max-w-7xl mx-auto h-96 mt-8 rounded-lg">
          <div className="absolute max-w-7xl mx-auto inset-0 h-96 z-2 rounded-lg">
            <img
              src={bg_image}
              alt=""
              className="h-96 w-full object-none rounded-lg"
            />
          </div>
        </div>
        {cask.isLoading || cask.isValidating ? (
          <div className="absolute inset-0 h-screen flex justify-center items-center">
            <div
              role="status"
              className="flex h-32 w-32  rounded-lg bg-white border border-gray-300 flex-col justify-center items-center"
            >
              <svg
                aria-hidden="true"
                className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 px-4">
            <div className="flex flex-row justify-between mt-6">
              <p className=" text-indigo-600 mb-5">Owner</p>
              <p className="text-sm font-medium text-indigo-600">
                Cask NFT {cask?.data?.tokenId}#
              </p>
              <p>{`0x${cask?.data?.owner?.[2]}${cask?.data?.owner?.[3]}${
                cask?.data?.owner?.[4]
              }....${cask?.data?.owner?.slice(-4)}`}</p>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              {cask?.data?.meta?.name}
            </h1>
            <h2 className="text-lg text-gray-500">
              {cask?.data?.meta?.description}
            </h2>
            {cask?.data?.price && cask?.data?.price > 0 ? (
              <>
                <p className=" text-indigo-600 mb-5">
                  Price:{' '}
                  {ethers.utils.formatEther(cask?.data?.price).toString()} ETH
                </p>
                <button
                  onClick={() =>
                    cask?.buyNft(cask?.data?.tokenId, cask?.data?.price)
                  }
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Buy cask NFT
                </button>
              </>
            ) : (
              <>
                {cask?.hasOffersFromUser ? (
                  <>
                    <button
                      onClick={() => cask?.cancelOffer(bid)}
                      type="button"
                      className="text-white mt-4 bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Cancel offer
                    </button>
                  </>
                ) : (
                  <div className="mt-4">
                    <input
                      onChange={(e) => setBid(e.target.value)}
                      type="number"
                      id="first_name"
                      className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-40"
                      placeholder="Bid Amount"
                      required
                    />
                    <button
                      onClick={() => cask?.makeOffer(bid)}
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Make offer
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </BaseLayout>
  )
}

export default CaskDetail

// export const getStaticProps: any = async (context: NextPageContext) => {
//   const { query } = context
//   return { props: { query } }
// }

export const getServerSideProps: any = async (context: NextPageContext) => {
  const { query } = context
  return { props: { query } }
}
