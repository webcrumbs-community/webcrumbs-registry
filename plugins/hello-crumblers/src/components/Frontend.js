import React from 'react';
import styles from './Frontend.module.css';

export default () => {
  return (
    <div className={styles.component}>
      <h1 className={styles.red}>
        Hello, Crumblers!
      </h1>
      <h1>
        Not red
      </h1>
    </div>
  );
};
