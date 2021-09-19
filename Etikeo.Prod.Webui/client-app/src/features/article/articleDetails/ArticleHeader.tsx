import React from 'react';
import { Header, Grid, Segment, Item, Statistic, Divider, Reveal, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import NotFound from '../../../app/layout/NoFound';
import { IArticle } from '../../../app/models/IArticle';

interface IProps {
    article: IArticle,
    loading: boolean,
    isLoggedIn: boolean;
    disable: (id: string) => Promise<void>;
    enable: (id: string) => Promise<void>;
}
const ArticleHeader: React.FC<IProps> = ({ article, loading, isLoggedIn, disable, enable }) => {
    if (!article) return <NotFound />;
    return (
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size='small' src={article.image! || '/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Header as='h1'>{article!.title}</Header>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Statistic.Group widths={2}>
                        <Statistic label='Etat Article' value={article.isActive} />
                    </Statistic.Group>
                    <Divider />
                    {isLoggedIn &&
                        <Reveal animated='move'>
                            <Reveal.Content visible style={{ width: '100%' }}>
                                <Button
                                    fluid
                                color={article.isActive ? 'green' : 'red'}
                                content={article.isActive ? 'Article Active' : 'Article désactivé '}
                                />
                            </Reveal.Content>
                            <Reveal.Content hidden>
                                <Button
                                    loading={loading}
                                    fluid
                                    basic
                                color={article.isActive ? 'red' : 'green'}
                                content={article.isActive ? 'Désactiver' : 'Activer'}
                                    onClick={
                                        article.isActive
                                            ? () => disable(article.articleId)
                                            : () => enable(article.articleId)
                                    }
                                />
                            </Reveal.Content>
                        </Reveal>
                    }
                </Grid.Column>
            </Grid>
        </Segment >
    );
};
export default observer(ArticleHeader);