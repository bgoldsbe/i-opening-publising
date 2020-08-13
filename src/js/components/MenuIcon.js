import React from 'react';
import classNames from 'classnames';
import styles from "./MenuIcon.module.scss";

const MenuIcon = ({onClick, open}) => (
  <div
    onClick={onClick}
    className={classNames(styles.root, {[styles.open]: open})}
  >
    <span/>
    <span/>
    <span/>
    <span/>
  </div>
);

export default MenuIcon;
