import React, { useContext, Fragment } from 'react';
import { BaseStoreContext } from '../../../app/store/baseStore';
import { Item, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ArticleListItem from './ArticleListItem';

const ArticleList: React.FC = () => {
    const baseStore = useContext(BaseStoreContext);
    const { weather } = baseStore.articleStore;

    return (
        <Item.Group divided>
            <Fragment>
                <Fragment  >
                    <Item.Group>
                        <ArticleListItem articles={weather} />
                    </Item.Group>
                </Fragment>
            </Fragment>
        </Item.Group>
    );
}
export default observer(ArticleList);

