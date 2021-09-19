import React from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import AddFranchiseurContent from './AddFranchiseurContent';
import AddFranchiseurHeader from './AddFranchiseurHeader';


const AddFranchiseurPage: React.FC = ({ }) => {
    return (
        <Grid>
            <Grid.Row>
              
                <Grid.Column width={16}>
                    <Grid style={{ marginTop: 2 }}>
                        <Grid.Column width={16}>
                            <AddFranchiseurHeader />
                            <AddFranchiseurContent />
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
         
            </Grid.Row>
        </Grid>
    );
}

export default observer(AddFranchiseurPage);