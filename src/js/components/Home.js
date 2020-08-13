import React from 'react';
import styles from "./Home.module.scss";

const Home = () => ( 
  <div className={styles.root}>
    <h1 className={styles.title}>{'Welcome to I_Opening_Publishing'}</h1>
    <p className={styles.message}>{'The site is currently being updated. In the meantime please visit our store'}</p>
  </div>
);

export default Home;
