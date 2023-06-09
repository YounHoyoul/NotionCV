import 'reflect-metadata';
import './di-container'

import './globals.css'
import { Inter } from 'next/font/google'

import Providers from '@/components/Providers';
import clsx from 'clsx';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Youn, Hoyoul (Luis)',
  description: 'This is the CV of Youn, Hoyoul (Luis)',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': -1,
      'max-snippet': -1,
    },
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={clsx(inter.className,
        'bg-gradient-to-b', 'from-slate-100', 'to-slate-50',
        'dark:bg-gradient-to-b', 'dark:from-slate-950', 'dark:to-slate-950',
        'text-primay-color',
        'transition', 'duration-500'
      )}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
