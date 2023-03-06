import useQuery from '@hooks/common/useQuery'
import Button from '@ui/common/Button'
import Spacer from '@ui/common/Spacer'
import Image from 'next/image'

type SocialIconProps = {
  socialNetwork: string
  width?: number
  height?: number
}

const SocialIcon: React.FC<SocialIconProps> = ({
  socialNetwork,
  width,
  height,
}) => {
  return (
    <div className="flex justify-center items-center p-2 w-10 h-10 rounded-full bg-gray-700 ">
      <Image
        src={`/icons/${socialNetwork}.svg`}
        width={width || 20}
        height={height || 20}
        alt="social network"
        className=""
      />
    </div>
  )
}

const Footer = () => {
  const { isMobile } = useQuery()

  return (
    <div>
      <div className="bg-blackLight pt-10 pb-20 md:pb-60 px-4 md:px-32">
        <div className="flex flex-col md:grid grid-cols-2">
          <div>
            <Image
              src="/images/logo_cask_chain.svg"
              width={isMobile ? 150 : 200}
              height={100}
              alt="caskchain nft"
              className=""
            />
            <Spacer className="mb-4"></Spacer>
            <p className="text-gray-400 w-80">
              Cask Chain is the new way to take your own cask in NFT world with
              profits in real life.
            </p>
            <Spacer className="mb-4"></Spacer>
            <div className="flex flex-row space-x-4">
              <SocialIcon socialNetwork="twitter" />
              <SocialIcon socialNetwork="linkedin" />
              <SocialIcon socialNetwork="facebook" width={12} height={12} />
              <SocialIcon socialNetwork="youtube" />
              <SocialIcon socialNetwork="instagram" />
            </div>
          </div>
          <div className="flex flex-col md:space-y-0 space-y-6 md:grid md:grid-cols-3 md:gap-0 mt-6 md:mt-0">
            <div className="flex flex-col space-y-3">
              <h4 className="text-white text-2xl">Company</h4>
              <p className="text-gray-400">About us</p>
              <p className="text-gray-400">Blog</p>
              <p className="text-gray-400">Contact us</p>
              <p className="text-gray-400">Pricing</p>
              <p className="text-gray-400">Testimonials</p>
            </div>
            <div className="flex flex-col space-y-3 mt-0">
              <h4 className="text-white text-2xl">Support</h4>
              <p className="text-gray-400">Help center</p>
              <p className="text-gray-400">Terms of service</p>
              <p className="text-gray-400">Legal</p>
              <p className="text-gray-400">Privacy policy</p>
              <p className="text-gray-400">Status</p>
            </div>
            <div className="flex flex-col space-y-3">
              <h4 className="text-white text-2xl">Stay up to date</h4>
              <div className="flex flex-row ring-gray-300 ring-1 rounded-full p-4 pl-6 bg-white w-full relative">
                <input
                  placeholder="Enter your email"
                  className="outline-0 bg-transparent"
                ></input>
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <Button
                    label="Subscribe"
                    customTextStyle="text-md"
                    containerStyle="py-2 px-6"
                    active
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blackLight flex justify-center pb-4">
        <p className="text-gray-600">© 2023 Cask Chain All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
