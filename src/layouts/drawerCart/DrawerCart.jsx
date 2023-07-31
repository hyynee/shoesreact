import { Button, Drawer, Group, Image, Stack, Text, Title } from '@mantine/core'
import { randomId } from '@mantine/hooks'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function DrawerCart({ openDrawer, closeDrawer }) {
  /* App State */
  const { cartList, totalItem, totalPrice } = useSelector((state) => state.cart)
  /* Hook Init */
  const navigate = useNavigate()
  return (
    <Drawer
      position="right"
      zIndex={2000}
      opened={openDrawer}
      onClose={closeDrawer}
      title={`YOUR CART ${totalItem} ITEM(S)`}
      overlayProps={{
        opacity: 0.5,
        blur: 4,
      }}
    >
      <Stack
        spacing={'xs'}
        mih={'70vh'}
        mah={'70vh'}
        style={{
          overflow: 'auto',
        }}
      >
        {cartList.map((item) => {
          return (
            <Group
              key={randomId()}
              align="flex-start"
              position="apart"
              style={{
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: 5,
                cursor: 'pointer',
              }}
              onClick={() => {
                navigate(`detail/${item.id}`)
                closeDrawer()
              }}
            >
              <Group align="flex-start">
                <Image src={item.image} maw={50} bg={'white'} />
                <Stack spacing={0}>
                  <Text fz={12} fw={'bold'} tt={'uppercase'} color="violet.7">
                    {item.name}
                  </Text>
                  <Text fz={10} color="dimmed" fw="bold">
                    {`$ ${item.price}`}
                  </Text>
                  <Text fz={10} color="dimmed" fw="bold">
                    {item.quantity}
                  </Text>
                </Stack>
              </Group>
              <Title order={6} fw={'bold'}>
                {`$ ${item.total.toLocaleString()}`}
              </Title>
            </Group>
          )
        })}
      </Stack>
      <Group position="apart" my={'md'}>
        <Text fw={'bold'} color="white">
          Total Price :
        </Text>
        <Text fw={'bold'} color="white">
          $ {totalPrice.toLocaleString()}
        </Text>
      </Group>
      <Button
        onClick={closeDrawer}
        tt={'uppercase'}
        variant="outline"
        fullWidth
      >
        continue shopping
      </Button>
      <Button
        onClick={() => {
          navigate('cart')
          closeDrawer()
        }}
        tt={'uppercase'}
        mt={'xs'}
        fullWidth
      >
        view cart
      </Button>
    </Drawer>
  )
}
