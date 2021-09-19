import React, { useContext } from 'react';
import { Form, Button, Header, Segment, Grid, Item } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';
import { BaseStoreContext } from '../../../app/store/baseStore';
import TextInput from '../../../app/common/form/inputText';
import ErrorMessage from '../../../app/common/form/ErrorMessage';
import { IClient } from '../../../app/models/IClient'

const validate = combineValidators({
    email: isRequired('Email'),
    dateCreation: isRequired('DateCreation'),
    dateNaissance: isRequired('DateNaissance'),
    codePostal: isRequired('CodePostal'),
    telephone: isRequired('Telephone'),
    telMobile: isRequired('TelMobile'),
});

const AddClient = () => {
    const baseRepo = useContext(BaseStoreContext);
    const { create } = baseRepo.clientStore;
    return (
        <Segment>
            <FinalForm
                onSubmit={(Client: IClient) => create(Client).catch((error: any) => ({
                    [FORM_ERROR]: error
                }))}
                validate={validate}
                render={({ handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit }) => (
                    <Form className='formAdd' onSubmit={handleSubmit} error>
                        <Header as='h2' content='Ajouter Client' color='orange' textAlign='center' />
                        <Field name='prenom' component={TextInput} placeholder='DisplayName' />
                        <Field name='email' component={TextInput} placeholder='Email' />
                        <Field name='dateNaissance' component={TextInput} placeholder='Date de Naissance' type='date' />
                        <Field name='telMobile' component={TextInput} placeholder='Tel Mobile' type='number' />
                        <Field name='fax' component={TextInput} placeholder='Fax' type='number' />
                        <Field name='telephone' component={TextInput} placeholder='Numéro de Telephone' type='number' />
                        <Field name='nomBoutique' component={TextInput} placeholder='Nom du Boutique' type='text' />
                        <Field name='dateCreation' component={TextInput} placeholder='Date de Creation' type='date' />
                        <Field name='adrsseFacturation' component={TextInput} placeholder='Adresse de Facturation' type='text' />
                        <Field name='adrsseLivraison' component={TextInput} placeholder='Adresse de Livraison' type='text' />
                        <Field name='adrsseComplement' component={TextInput} placeholder='Adresse de Complement' type='text' />
                        <Field name='codePostal' component={TextInput} placeholder='Code Postal' type='text' />
                        {submitError && !dirtySinceLastSubmit && <ErrorMessage error={submitError} />}
                        <Button
                            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                            loading={submitting}
                            color='orange'
                            content='Sauvegarder'
                            fluid
                        />
                    </Form>
                )}
            />
        </Segment >
    );
}
export default AddClient;
