import React from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { cartAction } from 'services/redux/slices/cartSlice'

export default function useAddToCart({ quantity, product }) {
  /* App State */
  const { userLogin } = useSelector((state) => state.user)
  /* Hook Init */
  const dispatch = useDispatch()
  return () => {
    if (userLogin.email) {
      const { id, image, shortDescription, price, name } = product
      const userCart = {
        user: userLogin.email,
        item: {
          id,
          image,
          shortDescription,
          price,
          name,
          quantity: quantity,
          total: price * quantity,
        },
      }
      const action = cartAction.add(userCart)
      dispatch(action)
      toast.success('Product added to cart successfully!')
      return
    }
    toast.dismiss()
    toast.error('You are not logged in')
  }
}
