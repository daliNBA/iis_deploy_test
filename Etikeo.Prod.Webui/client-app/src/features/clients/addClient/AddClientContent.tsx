import React, { useContext } from 'react';
import { Form, Button, Segment } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import { BaseStoreContext } from '../../../app/store/baseStore';
import TextInput from '../../../app/common/form/inputText';
import { v4 as uuid } from 'uuid';
import InputNumber from '../../../app/common/form/inputNumber';
import { RouteComponentProps } from 'react-router-dom';

interface IProps {
    franchiseurId: string;
}

const validate = combineValidators({
    email: isRequired('Email'),
    dateNaissance: isRequired('Date de Naissance'),
});

const AddClientContent: React.FC<IProps> = ({ franchiseurId }) => {
    const baseRepo = useContext(BaseStoreContext);
    const { create, submitting } = baseRepo.clientStore;
    const handleFinalFormSubmit = (values: any) => {
        const fr = franchiseurId;
        let newClient = {
            ...values,
            clientId: uuid(),
            franchiseurId: franchiseurId,
        };
        console.log(newClient);
        create(newClient);
    }
    return (
        <Segment raised>
         <FinalForm
                onSubmit={handleFinalFormSubmit}
                validate={validate}
                render={({ handleSubmit, invalid, pristine }) => (
                    <Form onSubmit={handleSubmit} error>
                        <Form.Group unstackable widths={2}>
                            <Field name='prenom' label='First name' component={TextInput} placeholder='Nom et prénom' />
                            <Field name='email' component={TextInput} placeholder='Email' type='email' />
                        </Form.Group>
                        <Field name='dateNaissance' component={TextInput} placeholder='Date de Naissance' type='date' />
                        <Field name='nomBoutique' component={TextInput} placeholder='Nom du Boutique' type='text' />
                        <Form.Group unstackable widths={2}>
                            <Field name='adrsseFacturation' component={TextInput} placeholder='Adresse de Facturation' type='text' />
                            <Field name='adrsseLivraison' component={TextInput} placeholder='Adresse de Livraison' type='text' />
                        </Form.Group>
                        <Field name='adrsseComplement' component={TextInput} placeholder='Adresse de Complement' type='text' />
                        <Form.Group unstackable widths={2}>
                            <Field name='intraCommunautaire' component={TextInput} placeholder='intra Communautaire' type='text' width={4} />
                            <Field name='fax' component={TextInput} placeholder='Fax' type='text' width={12} />
                        </Form.Group>
                        <Button
                            disabled={invalid || pristine}
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
export default AddClientContent;
