import React from 'react'
import { Tab } from 'semantic-ui-react';
import FranchiseurDescription from './FranchiseurDescription';

const panes = [
    { menuItem: 'Detail Franchiseur', render: () => <FranchiseurDescription /> },
    { menuItem: 'Photo', render: () => <Tab.Pane>Photos</Tab.Pane> },
]

interface IProps {
    setActiveTab: (activeIndex: any) => void;
}

const FranchiseurContent: React.FC<IProps> = ({ setActiveTab }) => {

    return (
        <Tab
            menu={{ fluid: true, vertical: true }}
            menuPosition='right'
            panes={panes}
            onTabChange={(e, data) => setActiveTab(data.activeIndex)}
        />
    )
}

export default FranchiseurContent