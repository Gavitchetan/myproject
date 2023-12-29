import Container from '@/components/Container'
import React from 'react'
import Banner from './components/Banner'

const page = () => {
  return (
    <section className=' bg-gradient-to-bl from-rose-400 to-cyan-500 h-screen w-full'>
      <Container>
        <div className=" flex flex-col">
          <div className=" h-32 w-full bg-left-top">
            <Banner />
          </div>
          <div className="">

          </div>
        </div>
      </Container>

    </section>
  )
}

export default page