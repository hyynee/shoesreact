import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Autocomplete, Avatar, Group, Stack, Text } from '@mantine/core'
import React, { forwardRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import productAPI from 'services/api/productAPI'

export default function SearchBox(props) {
  /* Local State */
  const [searchInput, setSearchInput] = useState('')
  const [productList, setProductList] = useState([])
  const data = productList.map((item) => {
    const { image, id, price, name } = item
    return { id, image, price, name, value: name }
  })
  /* Hook Init */
  const navigate = useNavigate()
  /* Render */
  const itemSearch = forwardRef(({ image, price, name, ...orther }, ref) => {
    return (
      <Group noWrap align="flex-start" ref={ref} {...orther}>
        <Avatar src={image} bg={'white'} style={{ border: 0 }} size={'lg'} />
        <Stack spacing={0}>
          <Text color="violet.5" fw={500}>
            {name}
          </Text>
          <Text size="xs" color="dimmed">
            $ {price}
          </Text>
        </Stack>
      </Group>
    )
  })
  /* Logic */
  const handleChangeInput = (value) => {
    setSearchInput(value)
  }
  useEffect(() => {
    if (searchInput) {
      productAPI.getByKeyWord(searchInput).then((data) => {
        setProductList(data)
      })
    } else {
      setProductList([])
    }
  }, [searchInput])
  return (
    <Autocomplete
      {...props}
      icon={<FontAwesomeIcon icon={faSearch} />}
      placeholder="Search product"
      data={data}
      itemComponent={itemSearch}
      onChange={handleChangeInput}
      onItemSubmit={({ id }) => navigate(`/detail/${id}`)}
      zIndex={3000}
      limit={20}
      styles={{
        dropdown: {
          maxHeight: 400,
          overflow: 'auto',
        },
        itemsWrapper: {
          padding: 0,
        },
      }}
    />
  )
}
