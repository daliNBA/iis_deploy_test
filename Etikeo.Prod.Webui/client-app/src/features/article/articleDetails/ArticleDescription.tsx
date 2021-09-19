import React, { useContext } from 'react';
import { Tab, Header, List, Button, Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { BaseStoreContext } from '../../../app/store/baseStore';
import NotFound from '../../../app/layout/NoFound';
import ArticleEditForm from './ArticleEditform';

const ArticleDescription = () => {
    const baseRepo = useContext(BaseStoreContext);
    const { article, editArticle } = baseRepo.articleStore;
    if (!article) {
        return <NotFound />
    }
    else {
        return (
            <Tab.Pane>
                <Grid>
                    <Grid.Column width={16} style={{ paddingBottom: 0 }}>
                        <Header floated='left' icon='euro sign' content={`Prix ${article!.price}€`} />
                        <Button
                            onClick={() => { baseRepo.articleStore.changeButtonState(!baseRepo.articleStore.editArticleMode)}}
                            floated='right'
                            basic
                            content={baseRepo.articleStore.editArticleMode ? 'Annuler' : 'Modifier article'}
                        />
                    </Grid.Column>
                    <Grid.Column width={16}>
                        {baseRepo.articleStore.editArticleMode ? (
                            <ArticleEditForm editArticle={editArticle} article={article!} />
                        ) : (
                            <List>
                                <List.Item>
                                    <List.Content>{article!.description}</List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Content>{article!.updateDate}</List.Content>
                                </List.Item>
                            </List>
                        )}
                    </Grid.Column>
                </Grid>
            </Tab.Pane>
        );
    }
}
export default observer(ArticleDescription);