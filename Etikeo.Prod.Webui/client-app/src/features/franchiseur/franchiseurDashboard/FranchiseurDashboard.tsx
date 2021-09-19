import React, { useContext, useEffect, useState } from 'react';
import { GridColumn, Grid,Loader, Button} from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { BaseStoreContext } from '../../../app/store/baseStore';
import ListFranchiseur from './listFranchiseur';
import FranchiseuFilter from './FranchiseurFilter';
import FranchiseuListItemPlaceholder from './FranchiseurListItemPlaceholder';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';
const FranchiseurDashboard: React.FC = () => {

    const baseStore = useContext(BaseStoreContext);
    const { loadFranchiseurs, loadingInitial, page, totalPages, setPage } = baseStore.franchiseurStore;
    const [loadingNext, setLoadingNext] = useState(false);

    const handleGetNext = () => {
        setLoadingNext(true);
        setPage(page + 1);
        loadFranchiseurs().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        loadFranchiseurs();
    }, [loadFranchiseurs]);

    return (
        <Grid>
            <GridColumn width={10} style={{ marginTop: 2 }}>
                <Grid style={{ marginTop: 2 }}>
                    <GridColumn width={16}>
                        {loadingInitial && page === 0 ? <FranchiseuListItemPlaceholder /> : (
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={handleGetNext}
                                hasMore={!loadingNext && page + 1 < totalPages}
                                initialLoad={false}
                            >
                                <ListFranchiseur />
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
                    content="Ajouter Franchiseur"
                    color="orange"
                    icon='add circle'
                    basic
                    as={Link}
                    to="/addFranchiseur"
                />
                <FranchiseuFilter />
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loadingNext} />
            </Grid.Column>
        </Grid>

    );
}
export default observer(FranchiseurDashboard);