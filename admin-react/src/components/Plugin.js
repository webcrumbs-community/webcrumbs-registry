import React, { lazy, Suspense, useEffect, useRef } from 'react';

const LazyPlugin = ({ pluginName }) => {
  const PluginComponent = lazy(() => import(`${pluginName}/Canvas`));

  return (
    <div ref={ref}>
      <Suspense fallback={<div>Loading...</div>}>
        <PluginComponent />
      </Suspense>
    </div>
  );
};

export default LazyPlugin;
