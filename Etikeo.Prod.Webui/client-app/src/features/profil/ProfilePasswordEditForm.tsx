import React from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button, } from 'semantic-ui-react';
import TextInput from '../../app/common/form/inputText';
import { combineValidators, isRequired } from 'revalidate';
import { IProfil } from '../../app/models/IProfil';
import { observer } from 'mobx-react-lite';

var r = require('revalidate');
var matchesField = r.matchesField;
const validate = combineValidators({
    password: isRequired('password'),
    currentPassword: isRequired('currentPassword'),
    confirmPassword: matchesField('password')(
        {
            message: 'Les mots de passe ne sont pas compatibles'
        }
    ),
})

interface IProps {
    editProfile: (profile: Partial<IProfil>) => void;
    profile: IProfil;
}

const ProfilePasswordEditForm: React.FC<IProps> = ({ editProfile, profile }) => {
    return (
        <FinalForm
            onSubmit={editProfile}
            validate={validate}
            initialValues={profile!}
            render={({ handleSubmit, invalid, pristine, submitting }) => (
                <Form onSubmit={handleSubmit} >
                    <Field
                        type='password'
                        name='currentPassword'
                        component={TextInput}
                        placeholder='Mot de passe actuel'
                    />
                    <Field
                        type='password'
                        name='password'
                        component={TextInput}
                        placeholder='Nouveau mot de passe'
                    />
                    <Field
                        type='password'
                        name='confirmPassword'
                        component={TextInput}
                        placeholder='Confirmez votre mot de passe '

                    />
                    <Button
                        loading={submitting}
                        floated='right'
                        disabled={invalid || pristine || submitting}
                        positive
                        content='Mettre à jour'
                    />
                </Form>
            )}
        />
    );
};

export default observer(ProfilePasswordEditForm);