import React, { useContext, useEffect } from 'react';
import ProfilHeader from './ProfilHeader';
import ProfilContent from './ProfilContent';
import { Grid, Header } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import Loading from '../../app/layout/Loading';
import { observer } from 'mobx-react-lite';
import { BaseStoreContext } from '../../app/store/baseStore';

interface RouteParams {
    username: string
}

interface IProps extends RouteComponentProps<RouteParams> { }

const ProfilPage: React.FC<IProps> = ({ match }) => {
    const baseStore = useContext(BaseStoreContext);
    const { loadProfil, setActiveTab, loadingProfil, profil } = baseStore.profilStore;

    useEffect(() => {
        loadProfil(match.params.username);
    }, [loadProfil, match])

    if (loadingProfil) return <Loading content="Chargement du profil ..." />

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={16}>
                    <Grid style={{ marginTop: 2 }}>
                        <Grid.Column width={16}>
                            <Header floated='left' content={'Mettre à jour mon profil'} />
                        </Grid.Column>
                        <Grid.Column width={16}>
                            <ProfilHeader profil={profil!} />
                            <ProfilContent setActiveTab={setActiveTab} />
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default observer(ProfilPage);