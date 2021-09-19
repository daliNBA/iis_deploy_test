import React from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button, Grid } from 'semantic-ui-react';
import TextInput from '../../../app/common/form/inputText';
import InputNumber from '../../../app/common/form/inputNumber';
import { observer } from 'mobx-react-lite';
import { history } from '../../../index';
import { IFranchiseur } from '../../../app/models/IFranchiseur';

interface IProps {
    editFranchiseur: (profil: Partial<IFranchiseur>) => void;
    franchiseur: IFranchiseur;
}
const FranchiseurEditForm: React.FC<IProps> = ({ editFranchiseur, franchiseur }) => {
    return (
        <FinalForm
            onSubmit={editFranchiseur}
            initialValues={franchiseur!}
            render={({ handleSubmit, invalid, pristine, submitting }) => (
                <Form onSubmit={handleSubmit} error>
                    <Grid columns={2} divided>
                        <Grid.Row>
                            <Grid.Column>
                                <h5 style={{ marginTop: '20px' }}>Adrsse du Facturation</h5>
                                <Field name='adrsseFacturation' component={TextInput} placeholder='adrsseFacturation' type='text' value={franchiseur!.adrsseFacturation} />
                            </Grid.Column>
                            <Grid.Column>
                                <h5 style={{ marginTop: '20px' }}>Nom du Boutique</h5>
                                <Field name='nomBoutique' component={TextInput} placeholder='nomBoutique' type='text' value={franchiseur!.nomBoutique} />
                            </Grid.Column>
                            <Grid.Column>
                                <h5 style={{ marginTop: '20px' }}>Prenom</h5>
                                <Field name='prenom' component={TextInput} placeholder='prenom' type='text' value={franchiseur!.prenom} />
                            </Grid.Column>
                            <Grid.Column>
                                <h5 style={{ marginTop: '20px' }}>Adrsse de Livraison</h5>
                                <Field name='adrsseLivraison' component={TextInput} placeholder='adrsseLivraison' type='text' value={franchiseur!.adrsseLivraison} />
                            </Grid.Column>
                            <Grid.Column>
                                <h5 style={{ marginTop: '20px' }}>Adrsse de Complement</h5>
                                <Field name='adrsseComplement' component={TextInput} placeholder='adrsseComplement' type='text' value={franchiseur!.adrsseComplement} />
                            </Grid.Column>
                            <Grid.Column>
                                <h5 style={{ marginTop: '20px' }}>Code Postal</h5>
                                <Field name='codePostal' component={InputNumber} placeholder='codePostal' type='number' value={franchiseur!.codePostal} />
                            </Grid.Column>
                            <Grid.Column>
                                <h5 style={{ marginTop: '20px' }}>Fax</h5>
                                <Field name='fax' component={TextInput} placeholder='fax' type='text' value={franchiseur!.fax} />
                            </Grid.Column>
                            <Grid.Column>
                                <h5 style={{ marginTop: '20px' }}>Email</h5>
                                <Field name='email' component={TextInput} placeholder='email' type='text' value={franchiseur!.email} />
                            </Grid.Column>
                            <Grid.Column>
                                <h5 style={{ marginTop: '20px' }}>Telephone</h5>
                                <Field name='telephone' component={InputNumber} placeholder='telephone' type='number' value={franchiseur!.telephone} />
                            </Grid.Column>
                            <Grid.Column>
                                <h5 style={{ marginTop: '20px' }}>Tel Mobile</h5>
                                <Field name='telMobile' component={InputNumber} placeholder='telMobile' type='number' value={franchiseur!.telMobile} />
                            </Grid.Column>
                            <Grid.Column>
                                <h5 style={{ marginTop: '20px' }}>IntraCommunautaire</h5>
                                <Field name='intraCommunautaire' component={TextInput} placeholder='intraCommunautaire' type='text' value={franchiseur!.intraCommunautaire} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <div style={{ marginTop: '30px' }}>
                        <Button.Group floated="right">
                            <Button disabled={submitting} onClick={() => history.push('/franchiseurDashboard')} floated='right' type='button'>Annuler</Button>
                            <Button.Or />
                            <Button positive disabled={submitting || invalid || pristine} loading={submitting} floated='right' type='submit'>Confirmer</Button>
                        </Button.Group>
                    </div>
                </Form>
            )}
        />
    );
};

export default observer(FranchiseurEditForm);