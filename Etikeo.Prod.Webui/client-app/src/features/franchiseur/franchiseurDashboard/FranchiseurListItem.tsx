import { Item, Segment, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import React from 'react';
import { IFranchiseur } from '../../../app/models/IFranchiseur';

const stylesNonactif = {
    border: 'solid',
    borderColor:'red',
    borderWidth: 1
}

const FranchiseurListItem: React.FC<{ franchiseur: IFranchiseur }> = ({ franchiseur }) => {
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image
                            size='tiny'
                            circular
                            src={franchiseur.photo || '/assets/user.png'}
                            style={franchiseur.isActive ? null : stylesNonactif } />
                        <Item.Content>
                            <Item.Header as={Link} to={`/detailFranchiseur/${franchiseur.franchiseurId}`}>
                               Nom Boutique:  {franchiseur.nomBoutique}
                            </Item.Header>
                            <Item.Description>
                                <div style={{ color: 'rgb(245,128,39)', fontWeight: 'bold' }} >Code  {franchiseur.codeFranchiseur}</div>
                                Créé par
                                <Link to={`/profil/${franchiseur.owner}`}> {franchiseur.owner}</Link>
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <Icon name='marker' />  {franchiseur.adrsseLivraison} , {franchiseur.codePostal}
            </Segment>
            <Segment clearing>
                <Icon name='mail' />
                <span>{franchiseur.email}</span>
                <Button
                    as={Link}
                    to={`/detailFranchiseur/${franchiseur.franchiseurId}`}
                    floated='right'
                    content='Détail'
                    color='blue'
                    basic
                />
                <Button
                    floated="right"
                    content="Accèder aux franchisés"
                    color="orange"
                    basic
                    as={Link}
                    to={`/clients/${franchiseur.franchiseurId}`}
                />
                <Button
                    floated="right"
                    content="Ajouter franchisé"
                    color="orange"
                    basic
                    as={Link}
                    to={`/addClient/${franchiseur.franchiseurId}`}
                />
            </Segment>
        </Segment.Group>);
}

export default FranchiseurListItem;