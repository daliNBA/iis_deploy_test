import React, { useContext, useState, } from 'react';
import { Tab, Header, List, Button, Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { BaseStoreContext } from '../../../app/store/baseStore';
import NotFound from '../../../app/layout/NoFound';
import ClientEditForm from './ClientEditForm';
const ClientDescription = () => {

    const baseRepo = useContext(BaseStoreContext);
    const { client, editClient } = baseRepo.clientStore;
    if (!client) {
        return <NotFound />
    }
    else {
        return (
            <Tab.Pane>
                <Grid>
                    <Grid.Column width={16} style={{ paddingBottom: 0 }}>
                        <Header floated='left' icon='address card' content={`A propos ${client!.prenom}`} />
                            <Button
                            onClick={() => { baseRepo.clientStore.changeButtonState(!baseRepo.clientStore.editClientMode) }}
                                floated='right'
                                basic
                            content={baseRepo.clientStore.editClientMode ?'Annuler' : 'Modifier client'}
                            />
                    </Grid.Column>
                    <Grid.Column width={16}>
                        {baseRepo.clientStore.editClientMode ? (
                            <ClientEditForm editClient={editClient} client={client!} />
                        ) : (
                                <List>
                                    <List.Item>
                                        <List.Icon name='marker' />
                                        <List.Content>{client!.prenom}</List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name='mail' />
                                        <List.Content>{client!.email}</List.Content>
                                    </List.Item>
                                </List>
                            )}
                    </Grid.Column>
                </Grid>
            </Tab.Pane>
        );
    }
}
export default observer(ClientDescription);