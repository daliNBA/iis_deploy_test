import React, { useContext, useEffect, useState } from 'react';
import { GridColumn, Grid, Loader, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { BaseStoreContext } from '../../../app/store/baseStore';
import ListClient from './listClient';
import ClientFilter from './ClientFilter';
import ClientListItemPlaceholder from './ClientListItemPlaceholder';
import InfiniteScroll from 'react-infinite-scroller';
import { Link, RouteComponentProps } from 'react-router-dom';

interface RouteParams {
    id: string
}

interface IProps extends RouteComponentProps<RouteParams> { }

const ClientDashboard: React.FC<IProps> = ({ match }) => {

    const baseStore = useContext(BaseStoreContext);
    const { loadClientsFranchise, loadingInitial, page, totalPages, setPage } = baseStore.clientStore;
    const [loadingNext, setLoadingNext] = useState(false);

    const handleGetNext = () => {
        setLoadingNext(true);
        setPage(page + 1);
        loadClientsFranchise(match.params.id).then(() => setLoadingNext(false));
    }

    useEffect(() => {
        loadClientsFranchise(match.params.id);
    }, [loadClientsFranchise, match]);

    return (
        <Grid>
            <GridColumn width={10} style={{ marginTop: 2 }}>
                <Grid style={{ marginTop: 2 }}>
                    <GridColumn width={16}>
                        {loadingInitial && page === 0 ? <ClientListItemPlaceholder /> : (
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={handleGetNext}
                                hasMore={!loadingNext && page + 1 < totalPages}
                                initialLoad={false}
                            >
                                <ListClient />
                            </InfiniteScroll>
                        )}
                    </GridColumn>
                </Grid>
            </GridColumn>
            <Grid.Column width={6}>
                <Grid.Column width={16}>
                </Grid.Column>
                <Button
                    style={{ marginTop: 20 }}
                    floated="right"
                    content="Retour vers franchiseur"
                    color="orange"
                    icon='redo'
                    as={Link}
                    to="/franchiseurDashboard"
                />
                <ClientFilter />
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loadingNext} />
            </Grid.Column>
        </Grid>

    );
}
export default observer(ClientDashboard);