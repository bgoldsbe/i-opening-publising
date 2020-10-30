import React from 'react';
import styles from "./Home.module.scss";

const Home = () => ( 
  <div className={styles.root}>
    <h1 className={styles.title}>{'Welcome to I_Opening_Publishing'}</h1>
    <p className={styles.message}>{'The site is currently being updated. In the meantime please visit our store'}</p>
    <div className={styles.buttons}>
      <a 
        className={styles.button}
      href="https://www.wildernessawareness.org/store/c-ya/childrens/margarets-planet/"
      target="_blank"
      >
        {'Buy Margaret\'s Planet'}
      </a>
      <a 
        className={styles.button}
      href="https://www.wildernessawareness.org/store/c-ya/childrens/no-nose/"
      target="_blank"
      >
        {'Buy No Nose'}
      </a>
    </div>
  </div>
);

export default Home;
