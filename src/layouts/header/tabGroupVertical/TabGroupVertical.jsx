import React from 'react'
import { Transition, Tabs } from '@mantine/core'
import { NavLink } from 'react-router-dom'
import SearchBox from '../searchBox/SearchBox'

export default function TabResponsive({ opened, setOpened, classes, data }) {
  return (
    <Transition
      transition={'slide-right'}
      duration={300}
      timingFunction="ease"
      mounted={opened}
    >
      {(styles) => (
        <>
          <SearchBox
            mt={'xs'}
            display="none"
            sx={(theme) => ({
              [theme.fn.smallerThan(820)]: {
                display: 'block',
              },
            })}
          />
          <Tabs
            variant="pills"
            style={{ ...styles }}
            mt={'xs'}
            display={'none'}
            orientation="vertical"
            classNames={{
              root: classes.tabsActive,
              tab: classes.tab,
            }}
          >
            <Tabs.List>
              {data.map((tab, index) => {
                return (
                  <NavLink to={tab.url} key={index}>
                    <Tabs.Tab
                      value={tab.title}
                      onClick={() => setOpened((opened) => !opened)}
                      style={{
                        width: '100%',
                      }}
                    >
                      {tab.title}
                    </Tabs.Tab>
                  </NavLink>
                )
              })}
            </Tabs.List>
          </Tabs>
        </>
      )}
    </Transition>
  )
}
