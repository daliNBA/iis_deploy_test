import React, { useContext, useEffect, useState } from 'react';
import { GridColumn, Grid, Header, Loader, Card, Popup } from 'semantic-ui-react';
import { BaseStoreContext } from '../../../app/store/baseStore';
import { observer } from 'mobx-react-lite';
import ArticleList from './ArticleList';
import ArticleListPlaceholder from './ArticleListPlaceholder';
import InfiniteScroll from 'react-infinite-scroller';
import ArticleFilter from './ArticleFilter';
import { format } from 'date-fns';

const ArticleDashboard: React.FC = () => {
    const baseStore = useContext(BaseStoreContext);
    const { loadWeather, loadingArticle, weather } = baseStore.articleStore;

    useEffect(() => {
        loadWeather();
    }, [loadWeather]);

    if (loadingArticle) return <ArticleListPlaceholder />

    return (
        <Grid>
            <GridColumn width={12} style={{ marginTop: 2 }}>
                <Grid style={{ marginTop: 2 }}>
                    <GridColumn width={16}>
                        <Card.Group itemsPerRow={4}>
                            <Popup 
                                trigger={
                                    <Card >
                                        <Card.Content extra>
                                            <Card.Header textAlign='center'>{weather!.summary}</Card.Header>
                                            <Card.Meta textAlign='center'>
                                                <br />
                                                <div>
                                                    <Header sub> {format(new Date(weather!.date), 'dd/MM/yyyy')}</Header>
                                                </div>
                                                <div></div>
                                                <div>
                                                    <Header sub>{weather!.temperatureC} $</Header>
                                                </div>
                                            </Card.Meta>
                                        </Card.Content>
                                    </Card>
                                }
                                content={weather!.temperatureF}
                                hideOnScroll
                                mouseEnterDelay={200}
                                mouseLeaveDelay={600}
                            />
                            ))
                        </Card.Group>
                    </GridColumn>
                </Grid>
            </GridColumn>
            <Grid.Column width={4}>
                <Grid.Column width={16}>
                    <Header floated='left' content={'Filtrer les articles'} />
                </Grid.Column>
                <ArticleFilter />
            </Grid.Column>
        </Grid>
    );
}

export default observer(ArticleDashboard);