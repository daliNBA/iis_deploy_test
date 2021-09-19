import React, { useContext, useState, } from 'react';
import { Tab, Header, List, Button, Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { BaseStoreContext } from '../../app/store/baseStore';
import NotFound from '../../app/layout/NoFound';
import ProfileEditForm from './ProfilEditForm';
const ProfilDescription = () => {

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
                        <Header floated='left' icon='address card' content={`A propos ${profil!.displayName}`} />
                        {isCurrentUser && (
                            <Button
                                onClick={() => setEditProfileMode(!editProfileMode)}
                                floated='right'
                                basic
                                content={editProfileMode ? 'Annuler' : 'Modifier profil'}
                            />
                        )}
                    </Grid.Column>
                    <Grid.Column width={16}>
                        {editProfileMode ? (
                            <ProfileEditForm editProfile={editProfil} profile={profil!} />
                        ) : (
                                <List>
                                    <List.Item>
                                        <List.Icon name='marker' />
                                        <List.Content>{profil!.bio}</List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name='mail' />
                                        <List.Content>{profil!.email}</List.Content>
                                    </List.Item>
                                </List>
                            )}
                    </Grid.Column>
                </Grid>
            </Tab.Pane>
        );
    }
}

export default observer(ProfilDescription);