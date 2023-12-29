import type { Metadata } from 'next'
import './globals.scss'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from 'next-auth/react'
import NavBar from './components/nav/NavBar';
export const metadata: Metadata = {
  title: 'Ecomshoping',
  description: 'for online Shoping',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // console.log('user', currnetuser)
  //  store.dispatch(getProduct())
  return (
    <html lang="en">
      <body className=''>

        <ToastContainer />
        <div className=' flex flex-col min-h-screen '>
          <main className=' flex-grow'>
            <NavBar />
            {children}
          </ main>
        </ div>

      </body>
    </html>
  )
}

// ep: 29 itemcartImage
