import React from 'react';
import Media from 'react-media';
import {Link, withRouter} from 'react-router-dom';
import classNames from 'classnames';
import Navigation from 'components/Navigation';
import MenuIcon from 'components/MenuIcon';
import "./Header.scss";

const Header = ({pushed, toggleNav, pathname}) => (
  <Media query={{maxWidth: 768}}>
    {isMobile =>
      <header styleName={classNames('root', pushed)}>
        <Link styleName='logo' to='/'>
          <div styleName='logo-image'/>
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
