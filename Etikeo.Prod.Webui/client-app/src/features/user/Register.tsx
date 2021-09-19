import React, { useContext } from 'react';
import { Form, Button, Header } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';
import { BaseStoreContext } from '../../app/store/baseStore';
import TextInput from '../../app/common/form/inputText';
import ErrorMessage from '../../app/common/form/ErrorMessage';
import { IUserFromValues } from '../../app/models/IUser';

const validate = combineValidators({
    email: isRequired('Email'),
    password: isRequired('Password'),
    displayName: isRequired('Nom'),
    username: isRequired('Nom d utilisateur'),
});

const RegisterForm = () => {
    const baseRepo = useContext(BaseStoreContext);
    const { register } = baseRepo.userStore;
    return (
        <FinalForm
            onSubmit={(values: IUserFromValues) => register(values).catch((error: any) => ({
                [FORM_ERROR]: error
            }))}
            render={({ handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit }) => (
                <Form onSubmit={handleSubmit} error>
                    <Header as='h2' content='S inscrire à Etikeo' color='red' textAlign='center' />
                    <Field name='username' component={TextInput} placeholder='Nom d utilisateur' />
                    <Field name='displayName' component={TextInput} placeholder='Nom' />
                    <Field name='email' component={TextInput} placeholder='Email' />
                    <Field name='password' component={TextInput} placeholder='Mot de passe' type='Password' />
                    {submitError && !dirtySinceLastSubmit && <ErrorMessage error={submitError} />}
                    <Button
                        disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                        loading={submitting}
                        color='orange'
                        content='Register'
                        fluid
                    />
                </Form>
            )}
        />
    );
}

export default RegisterForm;