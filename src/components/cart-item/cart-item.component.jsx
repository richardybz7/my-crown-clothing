import { Items, CartItemDetails, Image, ItemDetails } from './cart-item.styles';

const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return(
    <CartItemDetails>
      <Image src={imageUrl}/>
      <Items>
        <ItemDetails>{name}</ItemDetails>
        <ItemDetails>{quantity} x {price}</ItemDetails>
      </Items>
    </CartItemDetails>
  );
}

export default CartItem;