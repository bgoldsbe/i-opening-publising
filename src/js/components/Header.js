import React from 'react';
import Media from 'react-media';
import {Link, withRouter} from 'react-router-dom';
import classNames from 'classnames';
import Navigation from 'components/Navigation';
import MenuIcon from 'components/MenuIcon';
import styles from "./Header.module.scss";

const Header = ({pushed, toggleNav, pathname}) => (
  <Media query={{maxWidth: 768}}>
    {isMobile =>
      <header className={classNames(styles.root, {[styles.pushed]: pushed})}>
        <Link className={styles.logo} to='/'>
          <h1>{'I Opening Publishing'}</h1>
        </Link>
        {isMobile &&
          <MenuIcon
            open={pushed}
            onClick={toggleNav}
          />
        }
        {!isMobile && (
          <Navigation open={pushed}/>
        )}
      </header>
    }
  </Media>
);

export default withRouter(Header);
