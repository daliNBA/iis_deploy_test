import React from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import AddClientHeader from './AddClientHeader';
import AddClientContent from './AddClientContent';
import { RouteComponentProps } from 'react-router-dom';

interface IDetailParams {
    id: string;
}

const AddClientPage: React.FC<RouteComponentProps<IDetailParams>> = ({ match }) => {
    const franchiseurId = match.params.id;

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={16}>
                    <Grid style={{ marginTop: 2 }}>
                        <Grid.Column width={16}>
                            <AddClientHeader />
                            <AddClientContent franchiseurId={franchiseurId}/>
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default observer(AddClientPage);