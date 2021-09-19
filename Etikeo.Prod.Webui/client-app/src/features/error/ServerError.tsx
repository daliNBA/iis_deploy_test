import React, { useContext } from 'react';
import { BaseStoreContext } from '../../app/store/baseStore';
import { Container, Header, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';

export default observer (function ServerError() {

    const baseRepo = useContext(BaseStoreContext);
    const { error } = baseRepo.commonStore;

    return (
        <Container>
            <Header as='h1' content="Erreur serveur" />
            <Header sub as='h5' color='red' content={error?.message} />
            {error?.details && (
                <Segment>
                    <Header as='h4' content='Stack trace' />
                    <code style={{ marginTop: '10px' }}> {error.details}</code>
                </Segment>
            )
            }
        </Container>
    )
})