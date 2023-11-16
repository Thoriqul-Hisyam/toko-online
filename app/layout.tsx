import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Navbar from './components/nav/Navbar'
import Footer from './components/footer/Footer'
import { Toaster } from 'react-hot-toast'
import CartProvider from '@/providers/CartProvider'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'Shyshop',
  description: 'Ecommerce No.1 Indonesia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-slate-700`}>
        <Toaster
          toastOptions={{
            style: {
              background: '#fff',
              color: 'teal',
            },
          }}
        />
        <CartProvider>

          <div className='flex flex-col min-h-screen'>
            <Navbar />
            <main className='flex-grow'>
              {children}
            </main>
            <Footer />

          </div>

        </CartProvider>
      </body>
    </html>
  )
}
