import React from "react";
import { FormInput} from 'semantic-ui-react';

const Searchbar = () => {
    const [searchResults, setSearchResults] = React.useState([]);
    const handleChange = (event: any) => {
        setSearchResults(event.target.value);
    };
    return (
        <FormInput 
            icon='search'
            type="text"
            placeholder="Rechercher article"
            value={searchResults}
            onChange={handleChange}
            style={{ width: '100%' }}
        />
    );
}
export default Searchbar