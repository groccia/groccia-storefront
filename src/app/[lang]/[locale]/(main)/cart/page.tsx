import { LineItem } from '@medusajs/medusa';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

import CartTemplate from '@modules/cart/templates';

import { enrichLineItems } from '@modules/cart/actions';
import { getCheckoutStep } from '@lib/util/get-checkout-step';
import { CartWithCheckoutStep } from 'types/global';
import { getCart, getCustomer } from '@lib/data/ecommerce';
import { getDictionary } from 'app/[lang]/dictionaries';

export const metadata: Metadata = {
  title: 'Cart',
  description: 'View your cart',
};

const fetchCart = async () => {
  const cartId = cookies().get('_medusa_cart_id')?.value;

  if (!cartId) {
    return null;
  }

  const cart = await getCart(cartId).then(
    (cart) => cart as CartWithCheckoutStep
  );

  if (!cart) {
    return null;
  }

  if (cart?.items.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id);
    cart.items = enrichedItems as LineItem[];
  }

  cart.checkout_step = cart && getCheckoutStep(cart);

  return cart;
};

interface CartProps {
  params: {
    lang: string;
  };
}

export default async function Cart({ params: { lang } }: CartProps) {
  const cart = await fetchCart();
  const customer = await getCustomer();
  const dictionary = await getDictionary(lang).catch(() => ({}));

  return (
    <CartTemplate cart={cart} customer={customer} dictionary={dictionary} />
  );
}
