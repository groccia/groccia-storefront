import { Region } from '@medusajs/medusa';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import React, { Suspense } from 'react';

import ProductActions from '@modules/products/components/product-actions';
import ProductInfo from '@modules/products/templates/product-info';
import { notFound } from 'next/navigation';
import ProductActionsWrapper from './product-actions-wrapper';
import ProductTags from '../components/product-tags';
import ProductDisplayWrapper from './product-display-wrapper';
import Breadcrumbs from '../components/breadcrumbs';

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
    <div className="content-container py-6 flex flex-col">
      <Breadcrumbs product={product} />
      <div className="flex flex-col py-6 lg:flex-row">
        <div className="mb-2 flex h-52 w-full lg:mb-0 lg:h-96 lg:w-3/5">
          <ProductDisplayWrapper product={product} />
        </div>
        <div className="flex flex-col lg:mx-4 lg:w-2/5">
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
