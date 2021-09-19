import { BaseStore } from "./baseStore";
import { observable, action, computed, runInAction, reaction, toJS } from 'mobx';
import { IArticle, IPhotos, IWeather } from '../models/IArticle'
import agent from '../agent/agent';
import { history } from '../../index';
import { toast } from "react-toastify";
import { IPhoto } from "../models/IProfil";
import { setArticleProps } from "../common/util/util";

const LIMIT = 16;

export default class ArticleStore {
    _baseStore: BaseStore;
    constructor(baseStore: BaseStore) {
        this._baseStore = baseStore;
        reaction(
            () => this.predicate.keys(),
            () => {
                this.page = 0;
                this.articleRegestry.clear();
                this.loadArticles();
            }
        )
        reaction(
            () => this.activeTab,
            activeTab => {
                if (activeTab != '')
                    this.loadArticle(activeTab)
            }
        )
    }

    @observable loadingInitial = false;
    @observable loadingArticle = true;
    @observable submitting = false;
    @observable loadingArticleProfil = false;
    @observable uploadingPhoto = false;
    @observable articles: IArticle[] = [];

    @observable article: IArticle | null = null;
    @observable weather: IWeather | null = null;
    @observable articleRegestry = new Map();
    @observable articlesCount: number = 0;
    @observable predicate = new Map();
    @observable page = 0
    @observable activeTab: string = "";
    @observable editArticleMode: boolean = false;
    @observable deletingArticle = false;

    @computed get axiosParams() {
        const params = new URLSearchParams();
        params.append('limit', String(LIMIT));
        params.append('offset', `${this.page ? this.page * LIMIT : 0}`);
        this.predicate.forEach((value, key) => {
            if (key === 'startDate') {
                params.append(key, value.toISOString())
            } else {
                params.append(key, value)
            }
        })
        return params;
    }

    @computed get articleByCategory() {
        return this.sortByCategory(Array.from(this.articleRegestry.values()));
    }

    @computed get totalPages() {
        return Math.ceil(this.articlesCount / LIMIT);
    }


    @action setPage = (page: number) => {
        this.page = page;
    }

    @action setPredicate = (predicate: string, value: string | Date) => {
        this.predicate.clear();
        if (predicate !== 'all') {
            this.predicate.set(predicate, value);
        }
    }

    sortByCategory(articles: IArticle[]) {
        const sortedAticles = articles.sort(
            (a, b) => new Date(a.dateOfCreation).getTime() - new Date(b.dateOfCreation).getTime());
        const sotedByCate = sortedAticles.sort((a, b) => a.category.localeCompare(b.category));

        return Object.entries(
            sotedByCate.reduce(
                (articles, article) => {

                    const cate = article.category;
                    articles[cate] = articles[cate]
                        ? [...articles[cate], article]
                        : [article];
                    return articles;
                },
                {} as { [key: string]: IArticle[] }
            )
        );
    }

    @action changeButtonState = async (newState: boolean) => {
        this.editArticleMode = newState;
    }

    @action loadArticles = async () => {
        this.loadingInitial = true;
        try {
            const articleEnveloppe = await agent.articleAgent.list(this.axiosParams);
            const { articles, articleCount } = articleEnveloppe;
            runInAction(() => {
                articles.forEach((article) => {
                    setArticleProps(article);
                    this.articleRegestry.set(article.articleId, article);
                })
                //this.setPagination(result.clientCount);
                // this.clients = result.data;
                this.articlesCount = articleCount;
                this.loadingInitial = false;
            })
        } catch (e) {
            runInAction(() => {
                this.loadingInitial = false;
            })
            console.log(e);
        }
    }

    @action clearActivity = () => {
        this.article = null;
    };

    @action setActiveTab = async (activeIndex: string) => {
        runInAction(() => {
            this.activeTab = activeIndex;
        })
    }

    @action loadArticle = async (id: string) => {
        const isLogged = this._baseStore.userStore.isLoggedIn;
        let article = this.getArticle(id);
        if (article) {
            this.article = article;
            this.loadingArticle = false;
            return toJS(article);
        }
        else {
            try {
                console.log(id);
                article = await agent.articleAgent.details(id);
                runInAction(() => {
                    article.dateOfCreation = article.dateOfCreation.split('T')[0];
                    this.article = article;
                    this.articleRegestry.set(article.articleId, article);
                    this.loadingArticle = false;
                })
                return article;
            } catch (e) {
                runInAction(() => {
                    this.loadingArticle = false;
                })
                console.log(e);
            }
        }
    }

    @action loadWeather = async () => {
        this.loadingArticle = true;

        try {
            const weather = await agent.weatherAgent.list();
            runInAction(() => {
                this.weather = weather;
                this.loadingArticle = false;
            })
            return weather;
        } catch (e) {
            runInAction(() => {
                this.loadingArticle = false;
            })
            console.log(e);
        }

    }

    getArticle = (id: string) => {
        return this.articleRegestry.get(id);
    }

    @action create = async (values: IArticle) => {
        this.submitting = true;
        try {
            await agent.articleAgent.create(values);
            runInAction(() => {
                this.articleRegestry.set(values.articleId, values)
                this.article = values;
                this.submitting = false;
            })
            history.push('/ReservingSuccess');
        } catch (e) {
            runInAction(() => {
                this.submitting = false;
                console.log(e);
            })
        }
    }

    @action editArticle = async (values: IArticle) => {
        this.submitting = true;
        try {
            await agent.articleAgent.update(values);
            runInAction(() => {
                this.articleRegestry.set(values.articleId, values);
                this.article = values;
                this.submitting = false;
                this.changeButtonState(false);
            })
        } catch (e) {
            runInAction(() => {
                this.submitting = false;
            })
            toast.error("Error submitting Data");
        }
    }

    @action addArticlePhoto = async (file: Blob) => {
        this.uploadingPhoto = true;
        try {
            const photo = await agent.articleAgent.uploadPhoto(this.article!.articleId, file);
            runInAction(() => {
                if (this.article) {
                    this.article.photos!.push(photo);
                    if (photo.isMain)
                        this.article.image = photo.url;
                }
                this.uploadingPhoto = false;
            })
        } catch (e) {
            console.log(e);
            toast.error("Problem Uploading photo!");
            runInAction(() => {
                this.uploadingPhoto = false;
            })
        }
    }

    @action setMainPhoto = async (photo: IPhoto) => {
        this.loadingArticleProfil = true;
        try {
            await agent.articleAgent.setMainPhoto(this.article!.articleId, photo.id);
            runInAction(() => {
                this.article!.photos!.find(a => a.isMain)!.isMain = false;
                this.article!.photos!.find(a => a.id === photo.id)!.isMain = true;
                this.article!.image = photo!.url;
                this.loadingArticleProfil = false;
            })
        } catch (e) {
            console.log(e);
            toast.error("Problem setting photo as main!");
            runInAction(() => {
                this.loadingArticleProfil = false;
            })
        }
    }

    @action deletePhoto = async (photo: IPhotos) => {
        this.loadingArticleProfil = true;
        try {
            await agent.articleAgent.deletePhoto(this.article!.articleId, photo.id);
            runInAction(() => {
                this.article!.photos = this.article!.photos?.filter(a => a.id != photo.id);
                this.loadingArticleProfil = false;
            })
        } catch (e) {
            console.log(e);
            toast.error("Problem deleting photo!");
            runInAction(() => {
                this.loadingArticleProfil = false;
            })
        }
    }

    @action disable = async (id: string) => {
        this.deletingArticle = true;
        try {
            await agent.articleAgent.disable(id);
            runInAction(() => {
                this.deletingArticle = false;
                this.article!.isActive = false;
            })
        } catch (e) {
            console.log(e);
            toast.error("Problème désactivation article!");
            runInAction(() => {
                this.deletingArticle = false;
            })
        }
    }

    @action enable = async (id: string) => {
        this.deletingArticle = true;
        try {
            await agent.articleAgent.enable(id);
            runInAction(() => {
                this.deletingArticle = false;
                this.article!.isActive = true;
            })
        } catch (e) {
            console.log(e);
            toast.error("Problème d'activation article!");
            runInAction(() => {
                this.deletingArticle = false;
            })
        }
    }
}