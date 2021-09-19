import React, { useContext, useState, } from 'react';
import { Tab, Header, List, Button, Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { BaseStoreContext } from '../../../app/store/baseStore';
import NotFound from '../../../app/layout/NoFound';

const UpdatePhotoarticle = () => {
    const baseRepo = useContext(BaseStoreContext);
    const { article, editArticle } = baseRepo.articleStore;
    const [editArticleMode, setEditArticleMode] = useState(false);

    if (!article) {
        return <NotFound />
    }
    else {
        return (
            <Tab.Pane>
                <Header floated='left' icon='image' content={`Image ${article!.image}`} />
                <Button
                    onClick={() => setEditArticleMode(!editArticleMode)}
                    floated='right'
                    inverted color='orange'
                    content={editArticleMode ? 'Confirmer la modification' : 'Modifier photo'}
                />
            </Tab.Pane>
        );
    }
}

export default observer(UpdatePhotoarticle);