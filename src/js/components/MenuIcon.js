import React from 'react';
import classNames from 'classnames';
import "./MenuIcon.scss";

const MenuIcon = ({onClick, open}) => (
  <div
    onClick={onClick}
    styleName={classNames("root", {open})}
  >
    <span/>
    <span/>
    <span/>
    <span/>
  </div>
);

export default MenuIcon;
