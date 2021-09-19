import React, { Fragment } from 'react';
import { Placeholder, Grid, Card } from 'semantic-ui-react';
const ArticleListPlaceholder = () => {
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={14}>
                        <Placeholder>
                            <Placeholder.Paragraph>
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Paragraph>
                        </Placeholder>
                    <Grid style={{ marginTop: 2 }}>
                        <Grid.Column width={16}>
                            <Fragment>
                                <Card.Group itemsPerRow={6}>
                                    <Card>
                                        <Card.Content>
                                            <Placeholder>
                                                <Placeholder.Image square />
                                            </Placeholder>
                                        </Card.Content>
                                    </Card>
                                    <Card>
                                        <Card.Content>
                                            <Placeholder>
                                                <Placeholder.Image square />
                                            </Placeholder>
                                        </Card.Content>
                                    </Card>
                                    <Card>
                                        <Card.Content>
                                            <Placeholder>
                                                <Placeholder.Image square />
                                            </Placeholder>
                                        </Card.Content>
                                    </Card>
                                    <Card>
                                        <Card.Content>
                                            <Placeholder>
                                                <Placeholder.Image square />
                                            </Placeholder>
                                        </Card.Content>
                                    </Card>
                                    <Card>
                                        <Card.Content>
                                            <Placeholder>
                                                <Placeholder.Image square />
                                            </Placeholder>
                                        </Card.Content>
                                    </Card>
                                    <Card>
                                        <Card.Content>
                                            <Placeholder>
                                                <Placeholder.Image square />
                                            </Placeholder>
                                        </Card.Content>
                                    </Card>
                                </Card.Group>
                            </Fragment>
                            <br/>
                            <Placeholder style={{ height: 50, width: 50 }}>
                                <Placeholder.Image />
                            </Placeholder>
                            <Fragment>
                                <Card.Group itemsPerRow={6}>
                                    <Card>
                                        <Card.Content>
                                            <Placeholder>
                                                <Placeholder.Image square />
                                            </Placeholder>
                                        </Card.Content>
                                    </Card>
                                    <Card>
                                        <Card.Content>
                                            <Placeholder>
                                                <Placeholder.Image square />
                                            </Placeholder>
                                        </Card.Content>
                                    </Card>
                                    <Card>
                                        <Card.Content>
                                            <Placeholder>
                                                <Placeholder.Image square />
                                            </Placeholder>
                                        </Card.Content>
                                    </Card>
                                    <Card>
                                        <Card.Content>
                                            <Placeholder>
                                                <Placeholder.Image square />
                                            </Placeholder>
                                        </Card.Content>
                                    </Card>
                                    <Card>
                                        <Card.Content>
                                            <Placeholder>
                                                <Placeholder.Image square />
                                            </Placeholder>
                                        </Card.Content>
                                    </Card>
                                    <Card>
                                        <Card.Content>
                                            <Placeholder>
                                                <Placeholder.Image square />
                                            </Placeholder>
                                        </Card.Content>
                                    </Card>
                                </Card.Group>
                            </Fragment>
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
            </Grid.Row>
        </Grid >
    );
};
export default ArticleListPlaceholder;