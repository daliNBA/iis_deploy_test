import React, { useContext } from 'react';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { BaseStoreContext } from '../../app/store/baseStore';
import { observer } from 'mobx-react-lite';

const NavBar: React.FC = () => {
    const baseStore = useContext(BaseStoreContext);
    const { user, logout } = baseStore.userStore;

    return (
        <Menu fixed='top' borderless>
            <Menu.Item header name='home'>
                <Image as={Link} to='/menuPage' src='/assets/EtikeoLogo1.png' alt='Logo' height='50px' width='90' />
            </Menu.Item>
            <Dropdown text='Gestion Tiers' pointing className='link item'  >
                <Dropdown.Menu>
                    <Dropdown.Item>
                        <Dropdown text='Gestion Franchiseur' simple  >
                            <Dropdown.Menu>
                                <Dropdown.Item href='/addFranchiseur'>Ajouter un franchiseur</Dropdown.Item>
                                <Dropdown.Item href='/franchiseurDashboard'>Liste des franchiseurs</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Dropdown.Item>
                    <Dropdown.Item>Gestion Fournisseurs</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown text='Gestion Référentiel Articles' pointing className='link item'>
                <Dropdown.Menu>
                    <Dropdown.Item>
                        <Dropdown text='Gestion Articles' simple>
                            <Dropdown.Menu>
                                <Dropdown.Item href=''>Ajouter un article</Dropdown.Item>
                                <Dropdown.Item href='/articles'>Liste des articles</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Dropdown.Item>
                    <Dropdown.Item> Gestion Responsable Famille</Dropdown.Item>
                    <Dropdown.Item> Gestion Famille Articles</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown text='Gestion Tarifs ' pointing className='link item'>
                <Dropdown.Menu>
                   
                    <Dropdown.Item> Gestion Tarifs Achats </Dropdown.Item>
                    <Dropdown.Item> Gestion Tarifs Ventes </Dropdown.Item>
                    <Dropdown.Item> Gestion Tarifs Ventes Operation </Dropdown.Item>
                    <Dropdown.Item> Gestion Selection </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown text='Gestion Achat ' pointing className='link item'>
                <Dropdown.Menu>

                    <Dropdown.Item> Gestion Commande Fournisseurs </Dropdown.Item>
                    <Dropdown.Item> Gestion Commande Stockees </Dropdown.Item>
                    <Dropdown.Item> Gestion Des Reception </Dropdown.Item>
                    <Dropdown.Item> Gestion De Commande Client </Dropdown.Item>
                    <Dropdown.Item> Gestion De Commande Direct </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
         
            <Dropdown text='Gestion Import/Export' pointing className='link item'>
                <Dropdown.Menu>
                    <Dropdown.Item>Importation Des Articles</Dropdown.Item>
                    <Dropdown.Item>Importation Des Clients</Dropdown.Item>
                    <Dropdown.Item>Importation Des Fournisseurs</Dropdown.Item>
                    <Dropdown.Item>Importation Des Tarifs D'achat</Dropdown.Item>
                    <Dropdown.Item>Importation Des Familles D'articles</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
         
            <Menu.Menu position='right'>
                {user && (
                    <Menu.Item>
                        <Image avatar spaced='right' src={user.image || '/assets/user.png'} />
                        <Dropdown pointing='top right' text={user.displayName}>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to={`/profil/${user.username}`} text='Mon profil' icon='vcard' />
                                <Dropdown.Item as={Link} to={`/register`} text='Ajouter utilisateur' icon='user' />
                                <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                )}
            </Menu.Menu>
        </Menu>
    );
}

export default observer(NavBar);
