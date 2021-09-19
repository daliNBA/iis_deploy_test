import React, { useContext } from 'react';
import { Header, Image, Segment, Container, Button, Dimmer } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { BaseStoreContext } from '../../app/store/baseStore';
import LoginForm from '../user/LoginForm';

const HomePage: React.FC = () => {
    const baseStore = useContext(BaseStoreContext);
    const { openModal } = baseStore.modalStore;

    return (
        <Dimmer active>
            <Segment textAlign='center' vertical className='masthead'>
                <Container>
                    <Header as='h1' inverted content="Bienvenue sur Etikeo" color="orange" />
                    <Button onClick={() => openModal(<LoginForm />)} basic color='orange'>Login</Button>
                </Container>
            </Segment>
        </Dimmer>
    );
}
export default observer(HomePage);