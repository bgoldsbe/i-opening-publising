import React from 'react';
import Media from 'react-media';
import {Route, Switch} from 'react-router-dom'
import classNames from 'classnames';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Navigation from 'components/Navigation';
import "./App.scss";

class App extends React.Component {
  state = {
    navOpen: false
  }

  closeNav = () => {
    if (this.state.navOpen) {
      this.setState({
        navOpen: false
      });
    }
  }

  toggleNav = () => {
    this.setState({
      navOpen: !this.state.navOpen
    });
  }

  preventTouchMove = event => {
    if (event.touches[0].pageX < window.innerWidth - 200) {
      event.preventDefault();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.history.push) {
      this.closeNav();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (!this.state.navOpen && nextState.navOpen) {
      document.addEventListener('touchmove', this.preventTouchMove, false);
    } else {
      document.removeEventListener('touchmove', this.preventTouchMove, false);
    }
  }

  componentWillUnmount() {
    this.unmounted = true;
    document.removeEventListener('touchmove', this.preventTouchMove, false);
  }

  render() {
    const {location} = this.props;
    const {navOpen} = this.state;
    const standaloneView = false;

    return (
      <div styleName="root">
        <Header
          pathname={location.pathname}
          pushed={navOpen}
          toggleNav={this.toggleNav}
        />
        <Media query={{maxWidth: 768}}>
          {isMobile => isMobile && (
            <Navigation
              open={navOpen}
            />
          )}
        </Media>
        <div styleName={classNames("view", {
          pushed: navOpen,
          standalone: standaloneView
        })}>
          {standaloneView
            ? <div styleName="content-wrapper"></div>
            : <div styleName="content-wrapper">
                <Notifications/>
                <div styleName="content">
                  <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route component={NotFound}/>
                  </Switch>
                </div>
              </div>
          }
          <Footer/>
        </div>
      </div>
    );
  }
}

export default App;
