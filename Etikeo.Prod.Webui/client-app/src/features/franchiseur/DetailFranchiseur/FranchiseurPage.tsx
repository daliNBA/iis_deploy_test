import React, { useContext, useEffect } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import Loading from '../../../app/layout/Loading';
import { observer } from 'mobx-react-lite';
import { BaseStoreContext } from '../../../app/store/baseStore';
import FranchiseurContent from './FranchiseurContent';
import FranchiseurHeader from './FranchiseurHeader';

interface RouteParams {
    id: string,

}

interface IProps extends RouteComponentProps<RouteParams> { }
const FranchiseurPage: React.FC<IProps> = ({ match }) => {
    const baseStore = useContext(BaseStoreContext);
    const { loadFranchiseur, setActiveTab, loadingFranchiseur, franchiseur, enable, disable, deletingFranchiseur } = baseStore.franchiseurStore;
    const { isLoggedIn } = baseStore.userStore;

    useEffect(() => {
        loadFranchiseur(match.params.id);
    }, [loadFranchiseur, match])

    if (loadingFranchiseur) return <Loading content="Chargement du Franchiseur ..." />
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={16}>
                    <Grid style={{ marginTop: 2 }}>
                        <Grid.Column width={16}>
                            <Header floated='left' content={'Mettre à jour le Franchiseur '} />
                        </Grid.Column>
                        <Grid.Column width={16}>
                            <FranchiseurHeader franchiseur={franchiseur!} disable={disable} enable={enable} isLoggedIn={isLoggedIn} loading={deletingFranchiseur} />
                            <FranchiseurContent setActiveTab={setActiveTab} />
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default observer(FranchiseurPage);