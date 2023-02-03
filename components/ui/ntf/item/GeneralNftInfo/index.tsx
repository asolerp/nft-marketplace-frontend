import { Nft } from '@_types/nft'

type NftItemProps = {
  item: Nft
  showOwner?: boolean
}

const GeneralNftInfo: React.FC<NftItemProps> = ({
  item,
  showOwner = false,
}) => {
  return (
    <>
      <div className="flex-shrink-0 relative h-52 flex justify-center items-center">
        <img
          className={`absolute h-52 w-full object-cover top-0`}
          src={item.meta.image}
          alt="New NFT"
        />
        <img
          className={`h-28 w-42 object-cover flex justify-center items-center z-10 rounded-full`}
          src={'/suau_logo.png'}
          alt="New NFT"
        />
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          {showOwner && (
            <div className="flex flex-row justify-between">
              <p className=" text-indigo-600 mb-5">Owner</p>
              <p>{`0x${item.owner[2]}${item.owner[3]}${
                item.owner[4]
              }....${item.owner.slice(-4)}`}</p>
            </div>
          )}
          <p className="text-sm font-medium text-indigo-600">
            Cask NFT {item.tokenId}#
          </p>
          <div className="block mt-2">
            <p className="text-xl font-semibold text-gray-900">
              {item.meta.name}
            </p>
            <p className="mt-3 mb-3 text-base text-gray-500">
              {item.meta.description}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default GeneralNftInfo
