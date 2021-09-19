import { IArticle } from "../../models/IArticle";
import { IClient } from "../../models/IClient";
import { IFranchiseur } from "../../models/IFranchiseur";

export const combineTimeAndDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const stringDate = `${year}-${month}-${day}`;
    return new Date(stringDate);
}

export const setClientProps = (client: IClient) => {
    client.dateCreation = new Date(client.dateCreation);
    return client;
}

export const setArticleProps = (article: IArticle) => {
    article.dateOfCreation = new Date(article.dateOfCreation);
    return article;
}

export const setFranchiseurProps = (franchiseur: IFranchiseur) => {
    franchiseur.dateCreation = new Date(franchiseur.dateCreation);
    return franchiseur;
}
