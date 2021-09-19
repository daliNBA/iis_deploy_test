import React, { useContext, useEffect } from 'react';
import ArticleHeader from './ArticleHeader';
import ArticleContent from './ArticleContent';
import { Grid, Header } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import Loading from '../../../app/layout/Loading';
import { observer } from 'mobx-react-lite';
import { BaseStoreContext } from '../../../app/store/baseStore';

interface RouteParams {
    id: string,
    title: string
}

interface IProps extends RouteComponentProps<RouteParams> { }
const ArticlePage: React.FC<IProps> = ({ match }) => {
    const baseStore = useContext(BaseStoreContext);
    const { loadArticle, setActiveTab, loadingArticle, article, enable, disable, deletingArticle } = baseStore.articleStore;
    const { isLoggedIn } = baseStore.userStore;

    useEffect(() => {
        loadArticle(match.params.id);
    }, [loadArticle, match])

    if (loadingArticle) return <Loading content="Chargement de L Article ..." />
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={2}> </Grid.Column>
                <Grid.Column width={12}>
                    <Grid style={{ marginTop: 2 }}>
                        <Grid.Column width={16}>
                            <Header floated='left' content={'Mettre à jour l Article '} />
                        </Grid.Column>
                        <Grid.Column width={16}>
                            <ArticleHeader article={article!} disable={disable} enable={enable} isLoggedIn={isLoggedIn} loading={deletingArticle} />
                            <ArticleContent setActiveTab={setActiveTab} />
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
                <Grid.Column width={2}></Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default observer(ArticlePage);