import ItemsTemplate from './items';
import Summary from './summary';
import EmptyCartMessage from '../components/empty-cart-message';
import { CartWithCheckoutStep } from 'types/global';
import SignInPrompt from '../components/sign-in-prompt';
import Divider from '@modules/common/components/divider';
import { Customer } from '@medusajs/medusa';

const CartTemplate = ({
  cart,
  customer,
  dictionary,
}: {
  cart: CartWithCheckoutStep | null;
  customer: Omit<Customer, 'password_hash'> | null;
  dictionary: any;
}) => {
  return (
    <div className="py-12">
      <div className="content-container">
        {cart?.items.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-x-40">
            <div className="flex flex-col bg-white py-6 gap-y-6">
              {!customer && (
                <>
                  <SignInPrompt dictionary={dictionary} />
                  <Divider />
                </>
              )}
              <ItemsTemplate
                region={cart?.region}
                items={cart?.items}
                dictionary={dictionary}
              />
            </div>
            <div className="relative">
              <div className="flex flex-col gap-y-8 sticky top-12">
                {cart && cart.region && (
                  <>
                    <div className="bg-white py-6">
                      <Summary cart={cart} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <EmptyCartMessage dictionary={dictionary} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartTemplate;
