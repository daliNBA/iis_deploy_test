import React, { useContext, useEffect } from 'react';
import ClientHeader from './ClientHeader';
import ClientContent from './ClientContent';
import { Grid, Header } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import Loading from '../../../app/layout/Loading';
import { observer } from 'mobx-react-lite';
import { BaseStoreContext } from '../../../app/store/baseStore';

interface RouteParams {
    id: string
}

interface IProps extends RouteComponentProps<RouteParams> { }

const ClientPage: React.FC<IProps> = ({ match }) => {
    const baseStore = useContext(BaseStoreContext);
    const { loadClient, setActiveTab, loadingClient, client, disable, enable, deletingClient, } = baseStore.clientStore;
    const { isLoggedIn } = baseStore.userStore;

    useEffect(() => {
        loadClient(match.params.id);
    }, [loadClient, match])

    if (loadingClient) return <Loading content="Chargement du client ..." />

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={16}>
                    <Grid style={{ marginTop: 2 }}>
                        <Grid.Column width={16}>
                            <Header floated='left' content={'Mettre à jour le client '} />
                        </Grid.Column>
                        <Grid.Column width={16}>
                            <ClientHeader client={client!} disable={disable} enable={enable} isLoggedIn={isLoggedIn} loading={deletingClient} />
                            <ClientContent setActiveTab={setActiveTab} />
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default observer(ClientPage);