import React, { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./Context'));

const LazyLoading = () => (
  <div className='card'>
    <h3><i>LazyLoading</i></h3>
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  </div>
);

export default LazyLoading;
