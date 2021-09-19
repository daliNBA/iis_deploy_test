import React from 'react';
import { Header, Grid, Segment, Item, Statistic, Divider, Reveal, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import NotFound from '../../../app/layout/NoFound';
import { IFranchiseur } from '../../../app/models/IFranchiseur';

interface IProps {
    franchiseur: IFranchiseur,
    loading: boolean,
    isLoggedIn: boolean;
    disable: (id: string) => Promise<void>;
    enable: (id: string) => Promise<void>;
}
const FranchiseurHeader: React.FC<IProps> = ({ franchiseur, loading, isLoggedIn, disable, enable }) => {
    if (!franchiseur) return <NotFound />;

    return (
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size='small' src={franchiseur.photo! || '/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Header as='h1'>{franchiseur!.nomBoutique}</Header>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Statistic.Group widths={1}>
                        <Statistic label='Etat Franchiseur' value={franchiseur.isActive} />
                    </Statistic.Group>
                    <Divider />
                    {isLoggedIn &&
                        <Reveal animated='move'>
                            <Reveal.Content visible style={{ width: '100%' }}>
                                <Button
                                    fluid
                                    color={franchiseur.isActive ? 'green' : 'red'}
                                    content={franchiseur.isActive ? 'Franchiseur Active' : 'Franchiseur désactivé '}
                                />
                            </Reveal.Content>
                            <Reveal.Content hidden>
                                <Button
                                    loading={loading}
                                    fluid
                                    basic
                                    color={franchiseur.isActive ? 'red' : 'green'}
                                    content={franchiseur.isActive ? 'Désactiver' : 'Activer'}
                                    onClick={
                                        franchiseur.isActive
                                            ? () => disable(franchiseur.franchiseurId)
                                            : () => enable(franchiseur.franchiseurId)
                                    }
                                />
                            </Reveal.Content>
                        </Reveal>
                    }
                </Grid.Column>
            </Grid>
        </Segment >
    );
};
export default observer(FranchiseurHeader);