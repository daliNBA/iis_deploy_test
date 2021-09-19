import React, { Fragment, useContext, useEffect } from 'react';
import './styles.css';
import NavBar from '../../features/nav/navBar';
import ArticleDashboard from '../../features/article/dashboard/ArticleDashboard';
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom';
import { BaseStoreContext } from '../store/baseStore';
import { observer } from 'mobx-react-lite';
import ModalContainer from '../common/modal/ModalContainer';
import Loading from './Loading';
import LoginForm from '../../features/user/LoginForm';
import RegisterFrom from '../../features/user/Register';
import HomePage from '../../features/home/homePage';
import MenuPage from '../../features/home/menuPage';
import ClientDashboard from '../../features/clients/clientDashboard/clientDashboard';
import ProfilPage from '../../features/profil/ProfilPage';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';
import NotFound from './NoFound';
import PrivateRoute from './PivateRoute';
import Footer from './footer'
import ClientPage from '../../features/clients/clientDetails/ClientPage';
import ServerError from '../../features/error/ServerError';
import ArticlePage from '../../features/article/articleDetails/ArticlePage';
import AddClientPage from '../../features/clients/addClient/AddClientPage';
import FranchiseurDashboard from '../../features/franchiseur/franchiseurDashboard/FranchiseurDashboard';
import FranchiseurPage from '../../features/franchiseur/DetailFranchiseur/FranchiseurPage';
import AddFranchiseurPage from '../../features/franchiseur/addFranchiseur/AddFranchiseurPage';

const App: React.FC<RouteComponentProps> = ({ location }) => {
    const _baseStore = useContext(BaseStoreContext);
    const { setAppLoaded, appLoaded, token } = _baseStore.commonStore;
    const { getUser } = _baseStore.userStore;

    useEffect(() => {
        if (token)
            getUser().finally(() => setAppLoaded());
        else {
            setAppLoaded();
        }
    }, [getUser, setAppLoaded, token])

    if (!appLoaded) return <Loading content='Chargement ...' />

    return (
        <Fragment>
            <ModalContainer />
            <ToastContainer position='bottom-right' />
            <Route exact path='/' component={MenuPage} />
            <Route
                path={'/(.+)'}
                render={() => (
                    <Fragment>
                        <NavBar />
                        <Container style={{ marginTop: '7em' }}>
                            <Switch>
                                <PrivateRoute exact path='/franchiseurDashboard' component={FranchiseurDashboard} />
                                <PrivateRoute path='/clients/:id' component={ClientDashboard} />
                                <PrivateRoute path='/detailClient/:id' component={ClientPage} />
                                <PrivateRoute path='/detailFranchiseur/:id' component={FranchiseurPage} />
                                <PrivateRoute path='/detailArticle/:id' component={ArticlePage} />
                                <PrivateRoute path='/addClient/:id' component={AddClientPage} />
                                <PrivateRoute path='/addFranchiseur' component={AddFranchiseurPage} />
                                <PrivateRoute exact path='/menuPage' component={MenuPage} />
                                <PrivateRoute path='/articles' component={ArticleDashboard} />
                                <PrivateRoute path='/login' component={LoginForm} />
                                <PrivateRoute path='/register' component={RegisterFrom} />
                                <PrivateRoute path='/profil/:username' component={ProfilPage} />
                                <PrivateRoute path='/server-error' component={ServerError} />
                                <Route component={NotFound} />
                            </Switch>
                            <Footer />
                        </Container>
                    </Fragment>
                )}
            />
        </Fragment>
    );
};
export default withRouter(observer(App));