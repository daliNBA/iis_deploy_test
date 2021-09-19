import React, { useContext, useState, } from 'react';
import { Tab, Header, List, Button, Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { BaseStoreContext } from '../../../app/store/baseStore';
import NotFound from '../../../app/layout/NoFound';
import FranchiseurEditForm from './FranchiseurEditform';

const FranchiseurDescription = () => {

    const baseRepo = useContext(BaseStoreContext);
    const { franchiseur, editFranchiseur } = baseRepo.franchiseurStore;
    if (!franchiseur) {
        return <NotFound />
    }
    else {
        return (
            <Tab.Pane>
                <Grid>
                    <Grid.Column width={16} style={{ paddingBottom: 0 }}>
                        <Header floated='left' icon='address card' content={`A propos ${franchiseur!.prenom}`} />
                        <Button
                            onClick={() => { baseRepo.franchiseurStore.changeButtonState(!baseRepo.franchiseurStore.editFranchiseurMode) }}
                            floated='right'
                            basic
                            content={baseRepo.franchiseurStore.editFranchiseurMode ? 'Annuler' : 'Modifier Franchiseur'}
                        />
                    </Grid.Column>
                    <Grid.Column width={16}>
                        {baseRepo.franchiseurStore.editFranchiseurMode ? (
                            <FranchiseurEditForm editFranchiseur={editFranchiseur} franchiseur={franchiseur!} />
                        ) : (
                            <List>
                                <List.Item>
                                    <List.Icon name='marker' />
                                    <List.Content>{franchiseur!.prenom}</List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Icon name='mail' />
                                    <List.Content>{franchiseur!.email}</List.Content>
                                </List.Item>
                            </List>
                        )}
                    </Grid.Column>
                </Grid>
            </Tab.Pane>
        );
    }
}
export default observer(FranchiseurDescription);