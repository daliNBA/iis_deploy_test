 import React, { useContext, Fragment } from 'react';
import { Item, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { BaseStoreContext } from '../../../app/store/baseStore';
import FranchiseurListItem from './FranchiseurListItem';

const ListFranchiseur: React.FC = () => {
    const baseStore = useContext(BaseStoreContext);
    const { franchiseurByAddress } = baseStore.franchiseurStore;
    return (
        <Item.Group divided>
            <Fragment>
                {franchiseurByAddress.map(([group, franchiseurs]) => (
                    <Fragment key={group} >
                        <Label as='a' color='teal' ribbon basic>
                            {group}
                         </Label>
                        <Item.Group>
                            {franchiseurs.map((franchiseur) => (
                                <FranchiseurListItem key={franchiseur.franchiseurId} franchiseur={franchiseur} />
                            ))}
                        </Item.Group>
                    </Fragment>
                ))}
            </Fragment>
        </Item.Group>
    );
}

export default observer(ListFranchiseur);