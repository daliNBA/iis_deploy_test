import React, { useContext } from 'react';
import { Form, Button, Header, Image, Grid, Segment, Dimmer } from 'semantic-ui-react';
import { BaseStoreContext } from '../../app/store/baseStore';
import { FORM_ERROR } from 'final-form';
import { Form as FinalForm, Field } from 'react-final-form';
import { IUserFromValues } from '../../app/models/IUser';
import TextInput from '../../app/common/form/inputText';
import ErrorMessage from '../../app/common/form/ErrorMessage';
import { combineValidators, isRequired } from 'revalidate';
import LoginForm from './LoginForm';


const validate = combineValidators({
    email: isRequired('Email'),
});

const ForgetPassword = () => {
    const baseRepo = useContext(BaseStoreContext);
    const { login } = baseRepo.userStore;
    const { openModal } = baseRepo.modalStore;
    return (
        <FinalForm
            onSubmit={(values: IUserFromValues) => login(values).catch((error: any) => ({
                [FORM_ERROR]: error
            }))}
            validate={validate}
            render={({ handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit }) => (
                <Form onSubmit={handleSubmit} error>
                    <Header as='h2' content='Saisir votre Email' color='orange' textAlign='center'>
                    </Header>
                    <Segment stacked>
                        <Field fluid Icon='user' name='email' iconPosition='left' component={TextInput} placeholder='Email' />
                        {submitError && !dirtySinceLastSubmit && (
                            <ErrorMessage
                                error={submitError}
                                text='Email invalide'
                            />
                        )}
                        <Button fluid size='large'
                            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                             loading={submitting}
                            color='orange'
                            content='Envoyer'
                         
                        />
                        <a style={{ color: 'orange', textAlign: 'center' }} onClick={() => openModal(<LoginForm />)} >Accueil </a>
                    </Segment>
                </Form>
            )} />
    );
}
export default ForgetPassword;