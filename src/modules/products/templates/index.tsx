import { Region } from '@medusajs/medusa';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import React, { Suspense } from 'react';

import ProductActions from '@modules/products/components/product-actions';
import ProductInfo from '@modules/products/templates/product-info';
import { notFound } from 'next/navigation';
import ProductActionsWrapper from './product-actions-wrapper';
import ProductTags from '../components/product-tags';
import ProductDisplayWrapper from './Product-display-wrapper';

type ProductTemplateProps = {
  product: PricedProduct;
  region: Region;
  countryCode: string;
};

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound();
  }

  return (
    <div>
      <div className="content-container relative flex flex-col py-6 lg:flex-row">
        <ProductDisplayWrapper product={product} />
        <div className="relative flex flex-col lg:mx-4 lg:w-2/5 ">
          <div className="flex flex-col">
            <ProductInfo product={product} />
          </div>
          <div className="flex flex-col">
            <Suspense
              fallback={<ProductActions product={product} region={region} />}
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>
          </div>
          <ProductTags product={product} />
        </div>
      </div>
    </div>
  );
};
export default ProductTemplate;
