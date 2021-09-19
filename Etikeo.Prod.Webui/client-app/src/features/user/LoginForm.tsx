import React, { useContext } from 'react';
import { Form, Button, Header, Segment} from 'semantic-ui-react';
import { BaseStoreContext } from '../../app/store/baseStore';
import { FORM_ERROR } from 'final-form';
import { Form as FinalForm, Field } from 'react-final-form';
import { IUserFromValues } from '../../app/models/IUser';
import TextInput from '../../app/common/form/inputText';
import ErrorMessage from '../../app/common/form/ErrorMessage';
import { combineValidators, isRequired } from 'revalidate';
import ForgetPassword from './ForgetPassword';

const validate = combineValidators({
    email: isRequired('Email'),
    password: isRequired('Password'),
});
const LoginForm = () => {
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
                    <Header as='h2' content='Connectez-vous' color='orange' textAlign='center'>
                    </Header>
                    <Segment>
                        <Field fluid Icon='user' name='email' iconPosition='left' component={TextInput} placeholder='Email' />
                        <Field fluid Icon='lock' iconPosition='left' name='password' component={TextInput} placeholder='Mot de passe' type='Password' />
                        {submitError && !dirtySinceLastSubmit && (
                            <ErrorMessage
                                error={submitError}
                                text='Email ou mot de passe invalide'
                            />
                        )}
                        <Button fluid size='large'
                            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                            loading={submitting}
                            color='orange'
                            content='Login'
                        />
                        <br/>
                        <a style={{ color: 'orange' }} onClick={() => openModal(<ForgetPassword />)} > Mot De Passe Oublié ?</a>
                    </Segment>
                </Form>
            )} />
    );
}
export default LoginForm;