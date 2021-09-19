import React, { useContext, useState, } from 'react';
import { Tab, Header, List, Button, Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { BaseStoreContext } from '../../app/store/baseStore';
import NotFound from '../../app/layout/NoFound';
import ProfilePasswordEditForm from './ProfilePasswordEditForm';

const ProfilPassword = () => {

    const baseRepo = useContext(BaseStoreContext);
    const { profil, isCurrentUser, editProfil } = baseRepo.profilStore;
    const [editProfileMode, setEditProfileMode] = useState(false);

    if (!profil) {
        return <NotFound />
    }
    else {
        return (
            <Tab.Pane>
                <Grid>
                    <Grid.Column width={16} style={{ paddingBottom: 0 }}>
                        <Header floated='left' icon='edit' content={`Changer mon mot de passe `} />
                    </Grid.Column>
                    <Grid.Column width={16}>
                        <ProfilePasswordEditForm editProfile={editProfil} profile={profil!} />
                    </Grid.Column>
                </Grid>
            </Tab.Pane>
        );
    }
}

export default observer(ProfilPassword);