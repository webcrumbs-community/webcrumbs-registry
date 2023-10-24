// TO-DO: fetch plugin list from db and lazy load
import { mount } from 'marketing/Marketing';
import React, { useRef, useEffect } from 'react';

export default () => {
    const ref = useRef(null);

    useEffect(() => {
        mount(ref.current);
    });

    return <div ref={ref}></div>;
};