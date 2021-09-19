 import React, { useContext, Fragment } from 'react';
import { Item, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { BaseStoreContext } from '../../../app/store/baseStore';
import ClientListItem from './ClientListItem';

const ListClient: React.FC = () => {
    const baseStore = useContext(BaseStoreContext);
    const { clientByAddress } = baseStore.clientStore;
    return (
        <Item.Group divided>
            <Fragment>
                {clientByAddress.map(([group, clients]) => (
                    <Fragment key={group} >
                        <Label as='a' color='teal' ribbon basic>
                            {group}
                         </Label>
                        <Item.Group>
                            {clients.map((client) => (
                                <ClientListItem key={client.clientId} client={client} />
                            ))}
                        </Item.Group>
                    </Fragment>
                ))}
            </Fragment>
        </Item.Group>
    );
}

export default observer(ListClient);