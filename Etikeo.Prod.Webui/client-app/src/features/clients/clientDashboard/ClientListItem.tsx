import { Item, Segment, Icon, Button } from 'semantic-ui-react';
import { IClient } from '../../../app/models/IClient';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import React from 'react';

const stylesNonactif = {
    border: 'solid',
    borderColor:'red',
    borderWidth: 1
}

const ClientListItem: React.FC<{ client: IClient }> = ({ client }) => {
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image
                            size='tiny'
                            circular
                            src={client.photo || '/assets/user.png'}
                            style={client.isActive ? null : stylesNonactif } />
                        <Item.Content>
                            <Item.Header as={Link} to={`/detailClient/${client.clientId}`}>
                                {client.prenom}
                            </Item.Header>
                            <Item.Description>
                                <div style={{ color: 'rgb(245,128,39)', fontWeight: 'bold' }} >Code  {client.codeClient}</div>
                                Créé par
                                <Link to={`/profil/${client.owner}`}> {client.owner}</Link>
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <Icon name='marker' />  {client.adrsseLivraison} , {client.codePostal}
            </Segment>
            <Segment clearing>
                <Icon name='mail' />
                <span>{client.email}</span>
                <Button
                    as={Link}
                    to={`/detailClient/${client.clientId}`}
                    floated='right'
                    content='Détail'
                    color='blue'      
                />
            </Segment>
        </Segment.Group>);
}

export default ClientListItem;