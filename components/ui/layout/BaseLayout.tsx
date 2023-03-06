import Sidebar from '@ui/navbar/Sidebar'
import { ReactNode } from 'react'
import Navbar from '../navbar'

interface Props {
  background?: string
  children: ReactNode
}

const BaseLayout: React.FC<Props> = ({ background = 'bg-white', children }) => {
  return (
    <>
      <div
        className={`${background} flex flex-row overflow-hidden min-h-screen`}
      >
        <div className="bg-opacity-80 w-full backdrop-blur-xl">
          <Navbar />
          {children}
          <Sidebar />
        </div>
      </div>
    </>
  )
}

export default BaseLayout
