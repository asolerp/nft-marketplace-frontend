/* eslint-disable @next/next/no-img-element */

import type { NextPage } from 'next'
import { BaseLayout } from '@ui'
import Hero from 'components/pages/home/Hero'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import Barrels from 'components/pages/home/Barrels'

import Newsletter from 'components/pages/home/Newsletter'
import Footer from 'components/pages/home/Footer'
import { useEffect } from 'react'
import { useGlobal } from '@providers/global'

const Home: NextPage = () => {
  const {
    state: { sideMenu },
  } = useGlobal()

  useEffect(() => {
    document.body.style.overflow = sideMenu ? 'hidden' : 'auto'
  }, [sideMenu])

  return (
    <>
      <BaseLayout>
        <Hero />
        <Barrels />
        <Newsletter />
        <Footer />
      </BaseLayout>
    </>
  )
}

export default Home
