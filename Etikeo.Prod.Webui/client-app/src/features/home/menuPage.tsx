import React from 'react';
import { Card, Grid, Image, Icon } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';

const MenuPage: React.FC = () => {
    //TODO addd token and condition if token to show the menu
    return (
        <div>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Grid style={{ marginTop: 2 }}>
                            <Grid.Column width={16}>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Card href='/franchiseurDashboard'
                                    style={{  height: '150px' }}>
                                    <Card.Content>
                                        <Image floated='right'>
                                            <Icon.Group size='big'>
                                                <Icon name='user' />
                                            </Icon.Group>
                                        </Image>
                                        <Card.Header>Gestion Franchiseurs</Card.Header>
                                        <Card.Description>
                                            Gérer tous les  <strong>Franchiseurs</strong>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Card href='#card-example-link-card' style={{ height: '150px' }}>
                                    <Card.Content>
                                        <Image floated='right'>
                                            <Icon.Group size='big'>
                                                <Icon name='users' />
                                            </Icon.Group>
                                        </Image>
                                        <Card.Header>Gestion Fournisseurs</Card.Header>
                                        <Card.Description>
                                            Gérer tous les  <strong>fournisseurs</strong>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Card href='/articles' style={{ height: '150px' }}>
                                    <Card.Content>
                                        <Image floated='right'>
                                            <Icon.Group size='big'>
                                                <Icon name='shopping basket' />
                                            </Icon.Group>
                                        </Image>
                                        <Card.Header>Gestion Articles</Card.Header>
                                        <Card.Description>
                                            Gérer tous les  <strong>articles</strong> 
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Card href='#card-example-link-card' style={{ height: '150px' }}>
                                    <Card.Content>
                                        <Image floated='right'>
                                            <Icon.Group size='big'>
                                                <Icon name='clipboard' />
                                            </Icon.Group>
                                        </Image>
                                        <Card.Header>Gestion Commandes</Card.Header>
                                        <Card.Description>
                                            Gérer tous les  <strong>commandes</strong>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid>
                    </Grid.Column>
                    <Grid.Column width={2}></Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2}>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Grid style={{ marginTop: 2 }}>
                            <Grid.Column width={16}>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Card href='#card-example-link-card' style={{ height: '150px' }}>
                                    <Card.Content>
                                        <Image floated='right'>
                                            <Icon.Group size='big'>
                                                <Icon name='euro' />
                                            </Icon.Group>
                                        </Image>
                                        <Card.Header>Gestion Tarifs</Card.Header>
                                        <Card.Description>
                                            Gérer tous les  <strong>tarifs</strong>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Card href='#card-example-link-card' style={{ height: '150px' }}>
                                    <Card.Content>
                                        <Image floated='right'>
                                            <Icon.Group size='big'>
                                                <Icon name='block layout' />
                                            </Icon.Group>
                                        </Image>
                                        <Card.Header>Gestion F-Articles</Card.Header>
                                        <Card.Description>
                                            Gérer tous les  <strong>familles articles</strong>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Card href='#card-example-link-card' style={{ height: '150px' }}>
                                    <Card.Content>
                                        <Image floated='right'>
                                            <Icon.Group size='big'>
                                                <Icon name='users' />
                                            </Icon.Group>
                                        </Image>
                                        <Card.Header>Gestion *****</Card.Header>
                                        <Card.Description>
                                            Gérer tous les  <strong>*****</strong>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Card href='#card-example-link-card' style={{ height: '150px' }}>
                                    <Card.Content>
                                        <Image floated='right'>
                                            <Icon.Group size='big'>
                                                <Icon name='users' />
                                            </Icon.Group>
                                        </Image>
                                        <Card.Header>Gestion *****</Card.Header>
                                        <Card.Description>
                                            Gérer tous les  <strong>*******</strong>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid>
                    </Grid.Column>
                    <Grid.Column width={2}></Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
}

export default observer(MenuPage);