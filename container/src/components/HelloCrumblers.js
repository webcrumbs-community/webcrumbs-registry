import * as plugin from 'helloCrumblers/HelloCrumblers';
import React, { useRef, useEffect } from 'react';

export const Frontend = () => {
  const ref = useRef(null);

  useEffect(() => {
    plugin.frontend(ref.current);
  });

  return <div ref={ref} />;
};

export const Admin = () => {
  const ref = useRef(null);

  useEffect(() => {
    plugin.admin(ref.current);
  });

  return <div ref={ref} />;
};
