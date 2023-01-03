import React from 'react'

import { TransactionHistory } from '@_types/nft' 
import { ethers } from 'ethers'


type TransactionsHistoryProps = {
  transactions?: TransactionHistory[]
}

const TransactionsHistory: React.FC<TransactionsHistoryProps> = ({ transactions}) => {

    return (
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-white border-b">
                  <tr>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      #
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      From
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      To
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Date
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <>
                  {
                    transactions && transactions?.map((item, i) => {
                      return (
                        <tr key={item.id} className="bg-gray-100 border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i}</td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {item.from}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {item.to}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {item.date.toString()}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            { item?.value && ethers.utils.formatEther(item?.value).toString()}
                          </td>
                        </tr>
                      )
                    })
                  }
                  </>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
}

export default TransactionsHistory