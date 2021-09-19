import React from 'react';
import { IProfil } from "../../app/models/IProfil";
import { Header, Grid, Segment, Item } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import NotFound from '../../app/layout/NoFound';

interface IProps {
    profil: IProfil
}

const ProfilHeader: React.FC<IProps> = ({ profil }) => {

    if (!profil) return <NotFound />;

    return (
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar bordered size='small' src={profil.image! || '/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Header as='h1'>{profil!.displayName}</Header>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                </Grid.Column>
            </Grid>
        </Segment >
    );
};
export default observer(ProfilHeader);