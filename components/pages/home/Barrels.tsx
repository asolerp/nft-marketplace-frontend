import { useRef, useState } from 'react'

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useMediaQuery } from 'react-responsive'

import { Pagination, Navigation } from 'swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import BarrelNft from '@ui/ntf/item/BarrelNft'

const Barrels = () => {
  const sliderArray = [1, 2, 3, 4]
  const [index, setIndex] = useState(0)
  const swiperRef = useRef<any>(null)

  const isMobile = useMediaQuery({ maxWidth: 767 })
  const VISIBLE_ELEMENTS = isMobile ? 1 : 3

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-white px-6 md:px-32 my-10 md:mt-0">
        <h2 className="text-4xl md:text-6xl font-semibold mb-10 md:mb-7">
          The Best Barrels
        </h2>
        <div className="relative flex flex-row items-center justify-center w-full md:w-2/3 overflow-hidden">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-xl">
            <ArrowLeftIcon
              className="h-10 w-10 text-gray-500 cursor-pointer"
              onClick={() => swiperRef.current.swiper.slidePrev()}
            />
          </div>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-xl">
            <ArrowRightIcon
              className="h-10 w-10 text-gray-500 cursor-pointer"
              onClick={() => swiperRef.current.swiper.slideNext()}
            />
          </div>
          <Swiper
            ref={swiperRef}
            slidesPerView={VISIBLE_ELEMENTS}
            spaceBetween={30}
            onPaginationUpdate={(swiper: any) => {
              setIndex(swiper.activeIndex)
            }}
            pagination={{
              clickable: true,
              renderBullet: () => `<dvi></div>`,
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {sliderArray.map((_, i) => {
              return (
                <SwiperSlide
                  key={i + 1}
                  className="relative bg-[#1B1B1B] rounded-3xl"
                >
                  <BarrelNft title="Cherry Cask" owner="Alberto" isSlider />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
        <div className="flex flex-row space-x-4 mt-10">
          {Array.apply(
            null,
            Array(sliderArray.length + 1 - VISIBLE_ELEMENTS)
          ).map((_, i) => {
            const isActive = i === index
            const isActiveClass = isActive ? 'bg-blackLight' : 'bg-gray-300'
            return (
              <div
                onClick={() => {
                  swiperRef.current.swiper.slideTo(i)
                }}
                key={i}
                className={`w-4 h-4 ${isActiveClass} rounded-full`}
              ></div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Barrels
