import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import MainLayout from '../../components/MainLayout/MainLayout';
import SingleProductRenderer from '../../components/SingleProduct/SingleProductRenderer';
import { useProductSelector } from '../../selectors';
import { fetchProductById } from '../../actions';

const Product = () => {
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();
  const { product: productParam } = router.query;
  const productId = productParam ? productParam[0] : null;

  const { currentProduct } = useProductSelector();
  const currentProductId = `${currentProduct?.id ?? ''}`;
  const currentProductName = currentProduct?.name ?? '...';

  const dispatch = useDispatch();

  useEffect(() => {
    if (productId && productId !== currentProductId) {
      setLoading(true);
      dispatch(
        fetchProductById(productId, () => {
          setLoading(false);
        })
      );
    }
  }, [productId]);

  return (
    <MainLayout title={`React eCommerce - ${currentProductName}`}>
      <SingleProductRenderer product={currentProduct} loading={isLoading} />
    </MainLayout>
  );
};

export default Product;
