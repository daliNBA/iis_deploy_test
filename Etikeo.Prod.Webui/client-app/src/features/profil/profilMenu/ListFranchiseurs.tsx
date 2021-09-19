import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Card, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { BaseStoreContext } from '../../../app/store/baseStore';
import { IUserFranchiseur } from '../../../app/models/IProfil';

const panes = [
    { menuItem: 'Mes frachiseurs', pane: { key: 'owned' } }
];

const ProfileFranchiseur = () => {

    const baseRepo = useContext(BaseStoreContext);
    const {
        loadFranchiseurs,
        profil,
        loadingFranchiseurs,
        userFranchiseur
    } = baseRepo.profilStore;

    useEffect(() => {
        loadFranchiseurs(profil!.username, 'owning');
    }, [loadFranchiseurs, profil]);

    return (
        <Tab.Pane loading={loadingFranchiseurs}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='book' content={'Franchiseurs'} />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Tab
                        panes={panes}
                    />
                    <br />
                    <Card.Group itemsPerRow={4}>
                        {userFranchiseur.map((franchiseur: IUserFranchiseur) => (
                            <Card
                                as={Link}
                                to={`/detailFranchiseur/${franchiseur.id}`}
                                key={franchiseur.id}
                            >
                                <Image
                                    src={franchiseur.image! || 'https://res.cloudinary.com/fasserly/image/upload/v1609850266/le6nbqm8jpx4jpdfolfj.jpg'}
                                    style={{ minHeight: 100, objectFit: 'cover' }}
                                />
                                <Card.Content>
                                    <Card.Header textAlign='center'>{franchiseur.codeFranchiseur}</Card.Header>
                                    <Card.Meta textAlign='center'>
                                        <div>{franchiseur.nomBoutique}</div>
                                        <div>{franchiseur.adrsseFacturation}</div>
                                    </Card.Meta>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
};

export default observer(ProfileFranchiseur);