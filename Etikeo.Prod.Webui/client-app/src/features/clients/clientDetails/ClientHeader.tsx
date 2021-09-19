import React from 'react';
import { Header, Grid, Segment, Item, Statistic, Divider, Reveal, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import NotFound from '../../../app/layout/NoFound';
import { IClient } from '../../../app/models/IClient';

interface IProps {
    client: IClient,
    loading: boolean,
    isLoggedIn: boolean;
    disable: (id: string) => Promise<void>;
    enable: (id: string) => Promise<void>;
}

const ClientHeader: React.FC<IProps> = ({ client, loading, isLoggedIn, disable, enable }) => {

    if (!client) return <NotFound />;

    return (
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size='small' src={client.photo! || '/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Header as='h1'>{client!.prenom}</Header>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Statistic.Group widths={1}>
                        <Statistic label='Etat client' value={client.isActive} />
                    </Statistic.Group>
                    <Divider />
                    {isLoggedIn &&
                        <Reveal animated='move'>
                            <Reveal.Content visible style={{ width: '100%' }}>
                                <Button
                                    fluid
                                    color={client.isActive ? 'green' : 'red'}
                                    content={client.isActive ? 'Client actif' : 'Client désactivé '}
                                />
                            </Reveal.Content>
                            <Reveal.Content hidden>
                                <Button
                                    loading={loading}
                                    fluid
                                    basic
                                    color={client.isActive ? 'red' : 'green'}
                                    content={client.isActive ? 'Désactiver' : 'Activer'}
                                    onClick={
                                        client.isActive
                                            ? () => disable(client.clientId)
                                            : () => enable(client.clientId)
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
export default observer(ClientHeader);