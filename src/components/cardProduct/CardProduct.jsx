import {
  faCartPlus,
  faDollarSign,
  faHeart,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  Image,
  Rating,
  Text,
  ThemeIcon,
} from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import useStyles from './CardProduct.style'
import Skeleton from 'react-loading-skeleton'
import { useSelector } from 'react-redux'
import { useHover } from '@mantine/hooks'
import useLikeProductAPI from 'hooks/useLikeProductAPI'
import useAddToCart from 'hooks/useAddToCart'

export default function CardProduct({ maxWidth, product }) {
  /* Local State */
  const [like, setLike] = useState(false)
  /* App State */
  const { userProductLike } = useSelector((state) => state.user)
  /* Hook Init */
  const { hovered, ref } = useHover()
  const likeProduct = useLikeProductAPI({ like, product })
  const addToCart = useAddToCart({ quantity: 1, product })
  /* Style */
  const { classes } = useStyles({ hovered })
  /* Logic */
  useEffect(() => {
    if (product) {
      const isLike = userProductLike.productsFavorite?.some((item) => {
        return item.id === product.id
      })
      setLike(isLike)
    }
  }, [product, userProductLike])
  return (
    <>
      <Card withBorder radius={'md'} pt={0} ref={ref} className={classes.card}>
        {product ? (
          <NavLink to={`/detail/${product?.id}`}>
            <Card.Section className={classes.cardSection}>
              <Image
                src={product.image}
                maw={maxWidth}
                classNames={{
                  root: classes.rootImage,
                  image: classes.image,
                }}
              />
            </Card.Section>
          </NavLink>
        ) : (
          <Card.Section>
            <Skeleton
              style={{
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                height: 170,
              }}
            />
          </Card.Section>
        )}
        <Badge
          className={classes.badgeTop}
          variant="gradient"
          gradient={{ from: 'red', to: 'yellow' }}
        >
          best seller
        </Badge>
        <ActionIcon className={classes.likeIcon} onClick={likeProduct}>
          <FontAwesomeIcon icon={faHeart} color={like ? 'red' : 'white'} />
        </ActionIcon>
        <Text fw={500} mt={'sm'} className={classes.title}>
          {product?.name || <Skeleton />}
        </Text>
        <Text fz={'sm'} color="dimmed" lineClamp={2}>
          {product?.description || <Skeleton count={2} />}
        </Text>
        <Group position="apart" mt={'sm'}>
          <Group>
            <ThemeIcon>
              <FontAwesomeIcon icon={faDollarSign} />
            </ThemeIcon>
            <Text fw={'bold'}>{product?.price || <Skeleton width={50} />}</Text>
          </Group>
          <Rating value={5} readOnly />
        </Group>
        {product ? (
          <Button
            variant="gradient"
            size="xs"
            mt={'sm'}
            fullWidth
            leftIcon={<FontAwesomeIcon icon={faCartPlus} />}
            onClick={addToCart}
          >
            Add To Cart
          </Button>
        ) : (
          <Skeleton
            style={{
              marginTop: 10,
              height: 30,
            }}
          />
        )}
      </Card>
    </>
  )
}
