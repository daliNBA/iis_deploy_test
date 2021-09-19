import React from 'react'
import { Tab } from 'semantic-ui-react';
import ProfilDescription from './ProfilDescription'
import ProfilPassword from './ProfilPassword';
import ProfilPhoto from './ProfilPhoto';
import ProfileFranchiseur from '../profil/profilMenu/ListFranchiseurs';

const panes = [
    { menuItem: 'About', render: () => <ProfilDescription /> },
    { menuItem: 'Photo', render: () => <ProfilPhoto /> },
    { menuItem: 'Mot de passe', render: () => <ProfilPassword/>},
    { menuItem: 'Mes franchiseurs', render: () => <ProfileFranchiseur />},
]

interface IProps {
    setActiveTab: (activeIndex: any) => void;
}

const ProfilContent: React.FC<IProps> = ({ setActiveTab }) => {

    return (
        <Tab
            menu={{ fluid: true, vertical: true }}
            menuPosition='right'
            panes={panes}
            onTabChange={(e, data) => setActiveTab(data.activeIndex)}
        />
    )
}

export default ProfilContent