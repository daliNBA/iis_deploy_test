import React from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button, Grid } from 'semantic-ui-react';
import TextInput from '../../../app/common/form/inputText';
import InputNumber from '../../../app/common/form/inputNumber';
import { combineValidators, isRequired } from 'revalidate';
import { observer } from 'mobx-react-lite';
import { IClient } from '../../../app/models/IClient';
import { history } from '../../../index';

const validate = combineValidators({
    prenom: isRequired('prénom'),
})

interface IProps {
    editClient: (profile: Partial<IClient>) => void;
    client: IClient;
}

const ProfileEditForm: React.FC<IProps> = ({ editClient, client }) => {
    return (
        <FinalForm
            onSubmit={editClient}
            validate={validate}
            initialValues={client!}
            render={({ handleSubmit, invalid, pristine, submitting }) => (
                <Form onSubmit={handleSubmit} error>
                    <Grid columns={4} divided>
                        <Grid.Row>
                            <Grid.Column>
                                <h5>Prenom</h5>
                                <Field name='prenom' component={TextInput} placeholder='Prénom' value={client!.prenom} />
                            </Grid.Column>
                            <Grid.Column>
                                <h5>Email</h5>
                                <Field name='email' component={TextInput} placeholder='Email' value={client!.email} />
                            </Grid.Column>
                            <Grid.Column>
                                <h5>Tel Mobil</h5>
                                <Field name='telMobile' component={InputNumber} placeholder='Tel Mobile' type='number' value={client!.telephone} />
                            </Grid.Column>
                            <Grid.Column>
                                <h5>fax</h5>
                                <Field name='fax' component={TextInput} placeholder='Fax' type='number' value={client!.fax} />
                            </Grid.Column>
                            <Grid.Column>
                                <h5 style={{ marginTop:'20px' }}>Numéro de Telephone</h5>
                                <Field name='telephone' component={InputNumber} placeholder='Numéro de Telephone' type='number' value={client!.telephone} />
                            </Grid.Column>
                            <Grid.Column>
                                <h5 style={{ marginTop: '20px' }}>Nom du Boutique</h5>
                                <Field name='nomBoutique' component={TextInput} placeholder='Nom du Boutique' type='text' value={client!.nomBoutique} />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <h5>Adresse de Facturation</h5>
                                <Field name='adrsseFacturation' component={TextInput} placeholder='Adresse de Facturation' type='text' value={client!.adrsseFacturation} />
                            </Grid.Column>
                            <Grid.Column>
                                <h5>Adresse de Livraison</h5>
                                <Field name='adrsseLivraison' component={TextInput} placeholder='Adresse de Livraison' type='text' value={client!.adrsseLivraison} />
                            </Grid.Column>
                            <Grid.Column>
                                <h5>Adresse de Complement</h5>
                                <Field name='adrsseComplement' component={TextInput} placeholder='Adresse de Complement' type='text' value={client!.adrsseComplement} />
                            </Grid.Column>
                            <Grid.Column>
                                <h5>Code Postal</h5>
                                <Field name='codePostal' component={InputNumber} placeholder='Code Postal' type='text' value={client!.codePostal} />
                            </Grid.Column>
                            <Grid.Column>
                                <h5 style={{ marginTop: '20px' }}>Intra Communautaire</h5>
                                <Field name='Intra Communautaire' component={TextInput} placeholder='Intra Communautaire' type='text' value={client!.intraCommunautaire} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Button.Group floated="right">
                        <Button disabled={submitting} onClick={() => history.push('/Clients')} floated='right' type='button'>Annuler</Button>
                        <Button.Or />
                        <Button positive disabled={submitting || invalid || pristine} loading={submitting} floated='right' type='submit'>Confirmer</Button>
                    </Button.Group>
                </Form>
            )}
        />
    );
};

export default observer(ProfileEditForm);