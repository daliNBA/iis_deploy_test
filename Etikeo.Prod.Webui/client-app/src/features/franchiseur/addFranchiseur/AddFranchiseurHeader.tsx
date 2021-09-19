import React from 'react';
import { Header, Grid, Item } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';


const AddFranchiseurHeader: React.FC = ({ }) => {
    return (
        <Grid>
            <Grid.Column width={12}>
                <Item.Group>

                    <Item>
                        <Item.Content>
                            <Header as='h2' icon='address card outline'></Header>
                            <Header as='h2'>{'Ajouter Franchiseur'}</Header>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Grid.Column>
        </Grid>
    );
};
export default observer(AddFranchiseurHeader);