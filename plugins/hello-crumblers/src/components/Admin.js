import React from 'react';
import styles from './Admin.module.css';

export default () => {
  return (
    <div className={styles.component}>
      <h1 className={styles.red}>
        These are the configurations for the HelloCrumblers plugin!
      </h1>
      <h1>
        Not red
      </h1>
    </div>
  );
};
