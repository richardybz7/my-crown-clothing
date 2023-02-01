// import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { 
  selectCartItems, 
  selectCartTotal 
} from '../../store/cart/cart.selector'
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { CheckoutContainer } from './checkout.styles';
import PaymentForm from '../../components/payment-form/payment-form.component';

const Checkout = () => {
  // const { cartItems, cartTotal } = useContext(CartContext);
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  return (
    <CheckoutContainer>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </div>
      <div>
        {cartItems.map((cartItem) => 
          <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
        )}
      </div>
      <span className='total'>Total: ${cartTotal}</span>
      <PaymentForm />
    </CheckoutContainer>
  );
}

export default Checkout;