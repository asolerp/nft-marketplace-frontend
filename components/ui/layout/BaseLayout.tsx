import { ReactNode } from 'react'
import Navbar from '../navbar'

interface Props {
  children: ReactNode
}

const BaseLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 overflow-hidden min-h-screen">
        <div className="mx-auto space-y-8 ">{children}</div>
      </div>
    </>
  )
}

export default BaseLayout
