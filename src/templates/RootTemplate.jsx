import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from 'layouts/footer/Footer'
import Header from 'layouts/header/Header'
import useCheckToken from 'hooks/useCheckToken'
import { useDisclosure } from '@mantine/hooks'
import DrawerCart from 'layouts/drawerCart/DrawerCart'

export default function RootTemplate() {
  useCheckToken()
  /* Hook Init */
  const [openDrawer, { open, close }] = useDisclosure(false)
  return (
    <>
      <DrawerCart openDrawer={openDrawer} closeDrawer={close} />
      <Header openDrawer={open} />
      <main
        style={{
          margin: '0 0 100px',
        }}
      >
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
