import React from 'react';
import { Card, Image, Popup, Header } from 'semantic-ui-react';
import { IArticle, IWeather } from '../../../app/models/IArticle';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

interface IProps {
    articles: IWeather | null
}

const ArticleItem: React.FC<IProps> = ({ articles }) => {
    return (
        <Card.Group itemsPerRow={4}>
            <Popup key={articles!.id}
                    trigger={
                        <Card >
                            <Image
                                as={Link} to={`/detailArticle/${articles!.id}`}
                                style={{ minHeight: 100, objectFit: 'cover' }}
                            />
                            <Card.Content extra>
                                <Card.Header textAlign='center'>{articles!.summary}</Card.Header>
                                <Card.Meta textAlign='center'>
                                    <br />
                                    <div>
                                        <Header sub> {format(new Date(articles!.date), 'dd/MM/yyyy')}</Header>
                                    </div>
                                    <div></div>
                                    <div>
                                        <Header sub>{articles!.temperatureC} $</Header>
                                    </div>
                                </Card.Meta>
                            </Card.Content>
                        </Card>
                    }
                content={articles!.temperatureF}
                    hideOnScroll
                    mouseEnterDelay={200}
                    mouseLeaveDelay={600}
                />
            ))
        </Card.Group>
    );
}

export default observer(ArticleItem);