import React, { useContext } from 'react'
import { RouteProps, RouteComponentProps, Route, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { BaseStoreContext } from '../store/baseStore';

interface IProps extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>>
}

const PrivateRoute: React.FC<IProps> = ({ component: Component, ...rest }) => {
    const _baseStore = useContext(BaseStoreContext);
    const { isLoggedIn } = _baseStore.userStore;
    return (
        <Route
            {...rest}
            render={(props) =>  <Component {...props} />}
        />
    )
}

export default observer(PrivateRoute)
