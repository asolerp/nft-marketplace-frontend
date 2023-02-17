import { ReactNode } from 'react'
import Navbar from '../navbar'

interface Props {
  children: ReactNode
}

const BaseLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className="bg-gradient-to-r from-[#0B1626] via-[#0B1626] to-[#191825] overflow-hidden min-h-screen">
        <div className=" bg-opacity-80 mx-auto  backdrop-blur-xl	">
          <Navbar />
          {children}
        </div>
      </div>
    </>
  )
}

export default BaseLayout
