import React from 'react'
import Hero from '../../components/Hero/Hero'
import HeroII from '../../components/Hero2/HeroII'
import News from '../../components/News-Letter/News'
import Popular from '../../components/Popular/Popular'
import NewCollection from '../../components/NewCollection/NewCollection'

const Shop = () => {
  return (
    <div>
      <Hero/>
      <Popular/>
      <HeroII/>
      <NewCollection/>
      <News/>
    </div>
  )
}

export default Shop