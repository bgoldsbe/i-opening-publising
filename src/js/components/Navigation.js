import React from 'react';
import {NavLink, withRouter} from 'react-router-dom'
import classNames from 'classnames';
import styles from "./Navigation.module.scss";

class Navigation extends React.PureComponent {
  state = {
    show: this.props.open
  }

  transitionTimeout = null

  componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open) {
      this.setState({show: true});
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open && !this.props.open) {
      this.transitionTimeout = setTimeout(() => {
        this.setState({show: false});
        clearTimeout(this.transitionTimeout);
      }, 300);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.transitionTimeout);
  }

  render() {
    const {show} = this.state;
    const {location: {pathname}} = this.props;

    return (
      <nav className={
				classNames(styles.root, {[styles.show]: show})
			}>
        <div className={
					classNames(styles.group, {[styles.activeGroup]: pathname.includes('/')})
				}>
          <NavLink
            className={
							classNames(styles.item, {[styles.activeItem]: pathname.includes('/about')})
						}
            to='/'
          >
            {'Home'}
          </NavLink>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navigation);
