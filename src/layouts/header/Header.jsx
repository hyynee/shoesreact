import React, { useEffect, useState } from 'react'
import useStyles from './Header.style'
import dataTab from './data'
import {
  Box,
  Burger,
  Container,
  Divider,
  Group,
  MediaQuery,
} from '@mantine/core'
import { useClickOutside } from '@mantine/hooks'
import TabGroup from './tabGroup/TabGroup'
import TabGroupVertical from './tabGroupVertical/TabGroupVertical'
import ButtonSignInUp from './buttonSignInUp/ButtonSignInUp'
import AvatarProfile from './avatarProfile/AvatarProfile'
import { useSelector } from 'react-redux'
import SearchBox from './searchBox/SearchBox'

export default function Header({ openDrawer }) {
  /* Local State */
  const [opened, setOpened] = useState(false)
  const [scroll, setScroll] = useState(false)
  /* App State */
  const { userLogin } = useSelector((state) => state.user)
  /* Hook Init */
  const clickOutSideRef = useClickOutside(() => setOpened(false))
  /* Style */
  const { classes, cx } = useStyles()
  /* Logic */
  const handleScroll = () => {
    const scrollY = window.scrollY
    if (scrollY >= 20) {
      setScroll(true)
    }
    if (scrollY === 0) {
      setScroll(false)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <>
      <header
        ref={clickOutSideRef}
        className={cx(classes.header, { [classes.headerActive]: scroll })}
      >
        <Container fluid>
          <Group position="apart">
            <Burger
              display={'none'}
              opened={opened}
              onClick={() => setOpened((opened) => !opened)}
              className={classes.burger}
            />
            <TabGroup classes={classes} data={dataTab} />
            <Group>
              <MediaQuery
                smallerThan={820}
                styles={{
                  display: 'none',
                }}
              >
                <Box w={400}>
                  <SearchBox />
                </Box>
              </MediaQuery>
              {userLogin.email ? (
                <AvatarProfile
                  classes={classes}
                  user={userLogin}
                  openDrawer={openDrawer}
                />
              ) : (
                <ButtonSignInUp />
              )}
            </Group>
          </Group>
          {/* <SearchBox /> */}
          <TabGroupVertical
            opened={opened}
            setOpened={setOpened}
            classes={classes}
            data={dataTab}
          />
        </Container>
      </header>
      {!scroll && <Divider />}
    </>
  )
}
