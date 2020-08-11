import React from 'react';
import {NavLink, withRouter} from 'react-router-dom'
import classNames from 'classnames';
import "./Navigation.scss";

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
      <nav styleName={
				classNames("root", {show})
			}>
        <div styleName={
					classNames("group", {activeGroup: pathname.includes('/')})
				}>
          <NavLink
            styleName={
							classNames("item", {activeItem: pathname.includes('/about')})
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
