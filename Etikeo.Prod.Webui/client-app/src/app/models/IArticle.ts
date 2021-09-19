export interface IArticleEnvelope {
    articles: IArticle[],
    articleCount: number
}

export interface IWeatherEnvelope {
    weathers: IWeather[],
    weathersCount: number
}

export interface IArticle {
    articleId: string;
    title: string;
    description: string;
    dateOfCreation: Date;
    updateDate?: Date;
    price: number;
    language: string;
    isActive?: boolean;
    image: string;
    photos?: IPhotos[];
    category: string;
    owner: string;
}

export class ArticleFormValues {
    articleId: string = '';
    title: string = '';
    price: number = 0;
    description: string = '';
    category: string = '';
    image = '';
    owner = '';
    dateOfCreation: Date = new Date(Date.now());
    constructor(init?: ArticleFormValues) {
        Object.assign(this, init)
    }
}

export interface IPhotos {
    id: string;
    url: string;
    isMain: boolean;
}

export interface IComment {
    commentId: string;
    body: string;
    dateOfComment: Date;
    image: string;
    displayName: string;
    username: string;
}

export interface IWeather {
    summary: string;
    date: Date;
    temperatureC: number;
    temperatureF: number;
    id: number;
}
