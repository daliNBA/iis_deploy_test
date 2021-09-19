import React from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button, Grid } from 'semantic-ui-react';
import TextInput from '../../../app/common/form/inputText';
import InputNumber from '../../../app/common/form/inputNumber';
import { observer } from 'mobx-react-lite';
import { IArticle } from '../../../app/models/IArticle';
import { history } from '../../../index';

interface IProps {
    editArticle: (article: IArticle) => void;
    article: IArticle;
}
const ArticleEditForm: React.FC<IProps> = ({ editArticle, article }) => {
    return (
        <FinalForm
            onSubmit={editArticle}
            initialValues={article!}
            render={({ handleSubmit, invalid, pristine, submitting }) => (
                <Form onSubmit={handleSubmit} error>
                    <Grid columns={4} divided>
                        <Grid.Row>
                            <Grid.Column>
                                <h5>Titre</h5>
                                <Field name='title' component={TextInput} placeholder='title' value={article!.title} />
                            </Grid.Column>
                            <Grid.Column>
                                <h5>Description</h5>
                                <Field name='description' component={TextInput} placeholder='description' type='text' value={article!.description} />
                            </Grid.Column>
                            <Grid.Column>
                                <h5>Price</h5>
                                <Field name='price' component={InputNumber} placeholder='price' type='number' value={article!.price} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <div style={{ marginTop: '20px' }}>
                        <Button.Group floated="right">
                            <Button disabled={submitting} onClick={() => history.push('/Articles')} floated='right' type='button'>Annuler</Button>
                            <Button.Or />
                            <Button positive disabled={submitting || invalid || pristine} loading={submitting} floated='right' type='submit'>Confirmer</Button>
                        </Button.Group>
                    </div>
                </Form>
            )}
        />
    );
};

export default observer(ArticleEditForm);