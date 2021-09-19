import React, { Fragment, useContext, useState } from 'react';
import { Menu, Header, FormInput } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { BaseStoreContext } from '../../../app/store/baseStore';

const FranchiseurFilter = () => {
    const baseStore = useContext(BaseStoreContext);
    const { predicate, setPredicate } = baseStore.franchiseurStore;
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (event: any) => {
        setSearchResults(event.target.value);
        if (event.target.value.length > 2)
            setPredicate('search', event.target.value)
        if (event.target.value.length === 0 )
            setPredicate('all', 'true')

    }

    const handleFilter = (key: string, value: string) => {
        setPredicate(key, value);
        setSearchResults([]);
    }

    return (
        <Fragment>
            <Menu vertical size={'large'} style={{ width: '100%', marginTop: 66 }}>
                <Header icon={'filter'} attached color='teal' content={'Filters'} />
                <FormInput
                    icon='search'
                    type="text"
                    placeholder="Rechercher Franchiseur"
                    value={searchResults}
                    onChange={handleChange}
                    style={{ width: '100%' }}

                />
                <Menu.Item
                    active={predicate.size === 0}
                    onClick={() => handleFilter('all', 'true')}
                    color='teal'
                    name={'all'}
                    content={'Tout les franchiseurs'}
                />
                <Menu.Item
                    active={predicate.has('Enable')}
                    onClick={() => handleFilter('isEnabled', 'true')}
                    color={'blue'}
                    name={'isEnabled'}
                    content={"Actif"}
                />
                <Menu.Item
                    active={predicate.has('Disabled')}
                    onClick={() => handleFilter('isDisabled', 'true')}
                    color={'blue'}
                    name={'isDisabled'}
                    content={"Non actif"}
                />
            </Menu>
            <Header
                icon={'calendar'}
                attached
                color='teal'
                content={'Choisir la date de création'}
            />
        </Fragment>
    );
};

export default observer(FranchiseurFilter);
