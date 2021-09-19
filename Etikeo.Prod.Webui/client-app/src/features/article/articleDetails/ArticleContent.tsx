import React from 'react'
import { Tab } from 'semantic-ui-react';
import ArticleDescription from './ArticleDescription'

const panes = [
    { menuItem: 'Detail article', render: () => <ArticleDescription /> },
    { menuItem: 'Photo', render: () => <Tab.Pane>Photos</Tab.Pane> },
]

interface IProps {
    setActiveTab: (activeIndex: any) => void;
}

const ArticleContent: React.FC<IProps> = ({ setActiveTab }) => {

    return (
        <Tab
            menu={{ fluid: true, vertical: true }}
            menuPosition='right'
            panes={panes}
            onTabChange={(e, data) => setActiveTab(data.activeIndex)}
        />
    )
}

export default ArticleContent