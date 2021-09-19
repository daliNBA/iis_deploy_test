import React, { useContext, useState } from 'react';
import { Form, Button, Segment, Icon, Accordion, Transition } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import { BaseStoreContext } from '../../../app/store/baseStore';
import TextInput from '../../../app/common/form/inputText';
import ErrorMessage from '../../../app/common/form/ErrorMessage';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';

const validate = combineValidators({
    email: isRequired('Email'),
    dateNaissance: isRequired('Date de Naissance'),
    prenom: isRequired('Prénom'),
});

const AddFranchiseurContent = () => {
    const baseRepo = useContext(BaseStoreContext);
    const { create } = baseRepo.franchiseurStore;
    const handleFinalFormSubmit = (values: any) => {
        let newFranchiseur = {
            ...values,
            franchiseurId: uuid(),
        };
        create(newFranchiseur);
    }
    const [state, setState] = useState({ activeIndex: 0 });
    const handleClick = (e: any, titleProps: any) => {
        const { index } = titleProps
        const { activeIndex } = state
        const newIndex = activeIndex === index ? -1 : index
        setState({ activeIndex: newIndex })
    }
    const handleClickNext = (e: any, titleProps: any) => {
        const { index } = titleProps
        const { activeIndex } = state
        const newIndex = activeIndex + 1
        setState({ activeIndex: newIndex })
    }
    const handleClickPrev = (e: any, titleProps: any) => {
        const { index } = titleProps
        const { activeIndex } = state
        const newIndex = activeIndex - 1
        setState({ activeIndex: newIndex })
    }

    const { activeIndex } = state
    return (
        <Segment raised style={{ backgroundColor: 'rgb(220,219,219)' }}>
            <FinalForm
                onSubmit={handleFinalFormSubmit}
                validate={validate}
                render={({ handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit }) => (

                    <Form onSubmit={handleSubmit} error>
                        <Accordion fluid styled>
                            <Accordion.Title
                                active={activeIndex === 0}
                                index={0}
                                onClick={handleClick}
                                style={{ textAlign: 'center', fontSize: 'large', color: 'black', marginLeft: '1%' }}
                            >
                                <i className="dropdown icon"></i>
                                Information Personelle
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 0}>
                                <div className="field">
                                    <label>Prénom</label>
                                    <Field name='prenom' label='First name' component={TextInput} placeholder='Prénom' />
                                </div>
                                <div className="field">
                                    <label>Email</label>
                                    <Field name='email' component={TextInput} placeholder='Email' type='email' />
                                </div>
                                <div className="field">
                                    <label>Date de Naissance</label>
                                    <Field name='dateNaissance' component={TextInput} placeholder='Date de Naissance' type='date' />
                                </div>
                                <Button
                                    onClick={handleClickNext}
                                    color='orange'
                                    content='suivant'
                                    style={{ width: '20%', marginLeft: '80%' }}
                                    fluid
                                    as={Link}
                                />
                            </Accordion.Content>
                        </Accordion>
                        <Accordion fluid styled>
                            <Accordion.Title
                                onClick={handleClick}
                                active={activeIndex === 1}
                                index={1}
                                style={{ textAlign: 'center', fontSize: 'large', color: 'black' }}
                            >
                                <i className="dropdown icon"></i>
                                Information Boutique
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 1}>
                                <div className="field">
                                    <label>Nom du Boutique</label>
                                    <Field name='nomBoutique' component={TextInput} placeholder='Nom du Boutique' type='text' />
                                </div>
                                <div className="field">
                                    <label>Fax</label>
                                    <Field name='fax' component={TextInput} placeholder='Fax' type='text' />
                                </div>
                                <div style={{ width: '100%' }}>
                                    <Button
                                        onClick={handleClickPrev}
                                        color='orange'
                                        content='Retour'
                                        style={{ width: '20%', display: 'inline-block' }}
                                        fluid
                                        basic
                                        as={Link}
                                    />
                                    <Button
                                        onClick={handleClickNext}
                                        color='orange'
                                        content='Suivant'
                                        style={{ width: '20%', display: 'inline-block', marginLeft: '59.3%' }}
                                        fluid
                                        as={Link}
                                    />
                                </div>
                            </Accordion.Content>
                        </Accordion>
                        <Accordion fluid styled>
                            <Accordion.Title
                                onClick={handleClick}
                                active={activeIndex === 2}
                                index={2}
                                style={{ textAlign: 'center', fontSize: 'large', color: 'black', marginRight: '1% ' }}
                            >
                                <i className="dropdown icon"></i>
                               Information Adresse
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 2}>
                                <div className="field">
                                    <label>Adresse de Facturation</label>
                                    <Field name='adrsseFacturation' component={TextInput} placeholder='Adresse de Facturation' type='text' />
                                </div>
                                <div className="field">
                                    <label>Adresse de Livraison</label>
                                    <Field name='adrsseLivraison' component={TextInput} placeholder='Adresse de Livraison' type='text' />
                                </div>
                                <div className="field">
                                    <label>Adresse de Complement</label>
                                    <Field name='adrsseComplement' component={TextInput} placeholder='Adresse de Complement' type='text' />
                                </div>
                                <div className="field">
                                    <label>Adresse de Complement</label>
                                    <Field name='intraCommunautaire' component={TextInput} placeholder='intra Communautaire' type='text' />
                                </div>
                                <div style={{ width: '100%' }}>
                                    <Button
                                        onClick={handleClickPrev}
                                        color='orange'
                                        content='Retour'
                                        style={{ width: '20%', display: 'inline-block' }}
                                        fluid
                                        basic
                                        as={Link}
                                    />
                                    {submitError && !dirtySinceLastSubmit && <ErrorMessage error={submitError} />}
                                    <Button
                                        disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                                        loading={submitting}
                                        color='orange'
                                        content='Sauvegarder'
                                        style={{ width: '20%', display: 'inline-block', marginLeft: '59.3%' }}
                                        fluid
                                    />
                                </div>
                            </Accordion.Content>
                        </Accordion>
                    </Form>
                )}
            />
        </Segment >
    );
}
export default AddFranchiseurContent;
