import { ReactNode } from 'react'
import { GlobalContextProvider, useGlobalContext } from '../Context/store'
import { Header } from '../Header/Header'
import s from './layout.module.scss'

export interface LayoutProps {
  children: ReactNode
}
export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className={s.layout}>
        <Header />
        <div className={s.content}>
          <GlobalContextProvider>{children}</GlobalContextProvider>
        </div>
      </div>
    </>
  )
}
