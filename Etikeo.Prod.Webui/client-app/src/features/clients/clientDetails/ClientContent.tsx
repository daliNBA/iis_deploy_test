import React from 'react'
import { Tab } from 'semantic-ui-react';
import ClientDescription from './ClientDescription'

const panes = [
    { menuItem: 'About', render: () => <ClientDescription /> },
    { menuItem: 'Photo', render: () => <Tab.Pane>Photos</Tab.Pane> },
    { menuItem: 'Transactions', render: () => <Tab.Pane>Transactions</Tab.Pane>}
]
interface IProps {
    setActiveTab: (activeIndex: any) => void;
}

const ClientContent: React.FC<IProps> = ({ setActiveTab }) => {

    return (
        <Tab
            menu={{ fluid: true, vertical: true }}
            menuPosition='right'
            panes={panes}
            onTabChange={(e, data) => setActiveTab(data.activeIndex)}
        />
    )
}

export default ClientContent