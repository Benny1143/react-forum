import PropTypes from 'prop-types';
import React, { Component, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
// import { LinkContainer } from 'react-router-bootstrap';
// import Navbar from 'react-bootstrap/lib/Navbar';
// import Nav from 'react-bootstrap/lib/Nav';
// import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
import {
  isLoaded as isConfigLoaded,
  load as loadConfig,
} from 'redux/modules/config';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import Loading from '../Loading/Loading';
import Home from '../Home/Home';
// import About from '../About/About';
// import Contact from '../Contact/Contact';
// import Programmes from '../Programmes/Programmes';
// import WhyShare from '../WhyShare/WhyShare';
// import GetInvolved from '../GetInvolved/GetInvolved';
// import Terms from '../Terms/Terms';
// import Privacy from '../Privacy/Privacy';
// import UsefulLinks from '../UsefulLinks/UsefulLinks';
// import LevelUp from '../LevelUp/LevelUp';
// import PasswordReset from '../PasswordReset/PasswordReset';
import Login from '../Login/Login';
// import User from '../User/User';
// import Resources from '../Resources/Resources';
// import ResourcesView from '../ResourcesView/ResourcesView';
import NotFound from '../NotFound/NotFound';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import FAQ from '../FAQ/FAQ';
// import Donate from '../Donate/Donate';
import { push } from 'connected-react-router';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import config from 'config';
import { mapEntityToKeyword } from 'utils/config';
import styles from './App.module.scss';

// const Home = lazy(() => import('../Home/Home'));
const About = lazy(() => import('../About/About'));
const Contact = lazy(() => import('../Contact/Contact'));
const Terms = lazy(() => import('../Terms/Terms'));
const Privacy = lazy(() => import('../Privacy/Privacy'));
const UsefulLinks = lazy(() => import('../UsefulLinks/UsefulLinks'));
const LevelUp = lazy(() => import('../LevelUp/LevelUp'));
const PasswordReset = lazy(() => import('../PasswordReset/PasswordReset'));
const User = lazy(() => import('../User/User'));
const Resources = lazy(() => import('../Resources/Resources'));
const ResourcesView = lazy(() => import('../ResourcesView/ResourcesView'));
const Programmes = lazy(() => import('../Programmes/Programmes'));
const WhyShare = lazy(() => import('../WhyShare/WhyShare'));
const GetInvolved = lazy(() => import('../GetInvolved/GetInvolved'));
const Donate = lazy(() => import('../Donate/Donate'));
const Forum = lazy(() => import('../Forum/Forum'));

class App extends Component {
  static propTypes = {
    user: PropTypes.object,
    pushState: PropTypes.func.isRequired,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
  };

  componentDidMount() {
    if (!this.props.configLoaded) {
      this.props.loadConfig();
    }
    if (!this.props.authLoaded) {
      this.props.loadAuth();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.user && this.props.user) {
      // login
      // this.props.pushState('/');
    } else if (prevProps.user && !this.props.user) {
      // logout
      this.props.pushState('/');
    }
  }

  render() {
    // const {user} = this.props;

    return (
      <div className={styles.app}>
        <Helmet {...config.head} />
        <Header />

        <div className={styles.appContent}>
          <Suspense fallback={<Loading />}>
            <Switch>
              {/* Home (main) route */}
              <Route exact path="/" component={Home} />

              <PrivateRoute path="/profile" component={User} />
              <PrivateRoute path="/avatar" component={User} />
              <PrivateRoute path="/uploads" component={User} />
              <PrivateRoute path="/followers" component={User} />
              <PrivateRoute path="/password/change" component={User} />
              <PrivateRoute path="/settings" component={User} />

              {/* Routes */}
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/terms-of-use" component={Terms} />
              <Route path="/privacy-policy" component={Privacy} />
              <Route path="/useful-links" component={UsefulLinks} />
              <Route path="/our-programmes" component={Programmes} />
              <Route path="/why-share" component={WhyShare} />
              <Route path="/get-involved" component={GetInvolved} />
              <Route path="/levelup" component={LevelUp} />
              <Route path="/faq" component={FAQ} />
              <Route path="/donate" component={Donate} />
              <Route path="/password/reset/:token" component={PasswordReset} />
              <Route path="/login" component={Login} />
              <Route path="/users/:userId" component={User} />
              <Route path="/forum" component={Forum} />
              <Route
                path={`/${mapEntityToKeyword('resources')}`}
                component={Resources}
              />
              <Route
                path={`/${mapEntityToKeyword('resource')}/:subject/:resourceSlug`}
                component={ResourcesView}
              />

              {/* Catch all route */}
              <Route path="*" component={NotFound} status={404} />
            </Switch>
          </Suspense>
        </div>

        <Footer />

        <ReduxToastr
          timeOut={3000}
          newestOnTop={false}
          preventDuplicates
          position="top-center"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar={false}
        />
      </div>
    );
  }
}

export default connect(
  state => {
    const {
      entities: { users },
    } = state;

    const user = state.auth.user && users[state.auth.user];

    return {
      user,
      configLoaded: isConfigLoaded(state),
      authLoaded: isAuthLoaded(state),
    };
  },
  { pushState: push, loadConfig, loadAuth }
)(App);
