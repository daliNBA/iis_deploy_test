import {IArticle, IPhotos, IArticleEnvelope, IWeather, IWeatherEnvelope } from '../models/IArticle';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { IUserFromValues, IUser } from '../models/IUser';
import { IProfil, IPhoto, IUserFranchiseur } from '../models/IProfil';
import { IClient, IClientEnveloppe } from '../models/IClient';
import { PaginatedResult } from '../models/IPagination';
import { IFranchiseur, IFranchiseurEnveloppe } from '../models/IFranchiseur';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.interceptors.response.use(async response => {
    await sleep(1000);
    const pagination = response.headers['pagination'];
    if (pagination) {
        console.log(pagination);
        response.data = new PaginatedResult(response.data, JSON.parse(pagination));
        return response as AxiosResponse<PaginatedResult<any>>;
    }
    return response as AxiosResponse<PaginatedResult<any>>;

}, (error: AxiosError) => {

    const { data, status, config, headers } = error.response!;

    if (error.message === 'Network Error' && !error.response)
        toast.error('Network error - make sure API is running!')
    if (!error.response)
        toast.error("Network error - Please check your connection ");
    if (status === 404)
        history.push('/notfound');
    if (status === 401 && headers['www-authenticate'].startsWith('Bearer error="invalid_token"')) {
        window.localStorage.removeItem('jwt');
        history.push('/');
        toast.info("Your session is expired, please login again");
    }
    if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
        if (typeof data === 'string') {
            toast.error(data);
            history.push('/');
        }
        if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
            history.push('/notfound');
        }
        if (data.errors) {
            const modalStateErrors = [];
            for (const key in data.errors) {
                if (data.errors[key]) {
                    modalStateErrors.push(data.errors[key]);
                }
            }
            throw modalStateErrors.flat();
        }
    }
    history.push('/notfound');
    if (status === 500) {
        // setServerError(data);
        history.push('/server-error');
    }
    return Promise.reject(error);
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

//Common Requests
const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
    postForm: <T>(url: string, file: Blob) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios.post<T>(url, formData, {
            headers: { 'content-type': 'multipart/form-data' }
        }).then(responseBody)
    }
}

//Response Clients API
const clientAgent = {
    list: (params: URLSearchParams) => axios.get<IClientEnveloppe>('/client', { params: params }).then(responseBody),
    listClientsFranchise: (id: string, params: URLSearchParams) => axios.get<IClientEnveloppe>(`/client/clientsFranchise/${id}`, { params: params }).then(responseBody),
    details: (id: string) => requests.get<IClient>(`/client/${id}`),
    create: (client: Partial<IClient>) => requests.post(`/client/addClient`, client),
    update: (client: Partial<IClient>) => requests.put(`/client/${client.clientId}`, client),
    delete: (id: string) => requests.del(`/client/${id}`),
    enable: (id: string) => requests.post(`/client/${id}/enable`, {}),
    disable: (id: string) => requests.post(`/client/${id}/disable`, {}),
}
//Response Franchiseur API
const franchiseurAgent = {
    list: (params: URLSearchParams) => axios.get<IFranchiseurEnveloppe>('/franchiseur', { params: params }).then(responseBody),
    details: (id: string) => requests.get<IFranchiseur>(`/franchiseur/${id}`),
    create: (franchiseur: IFranchiseur) => requests.post(`/franchiseur/addFranchiseur`, franchiseur),
    update: (franchiseur: Partial<IFranchiseur>) => requests.put(`/franchiseur/${franchiseur.franchiseurId}`, franchiseur),
    delete: (id: string) => requests.del(`/franchiseur/${id}`),
    enable: (id: string) => requests.post(`/franchiseur/${id}/enable`, {}),
    disable: (id: string) => requests.post(`/franchiseur/${id}/disable`, {}),
}

//Response User API
const userAgent = {
    register: (user: IUserFromValues) => requests.post<IUser>(`/user/register`, user),
    login: (user: IUserFromValues) => requests.post<IUser>(`/user/login`, user),
    current: () => requests.get<IUser>('/user'),
    verifyEmail: (token: string, email: string) => requests.post<IUser>(`/user/verifyEmail`, { token, email }),
    resendEmailConfirm: (email: string) => requests.get(`/user/resendEmailVerification?email=${email}`),
    fbLogin: (accessToken: string) => requests.post(`/user/facebook`, { accessToken }),
    refreshToken: () => requests.post<IUser>(`/user/refreshToken`, {}),
}

//Response Articles API
const articleAgent = {
    list: (params: URLSearchParams) => axios.get<IArticleEnvelope>('/article', { params: params }).then(responseBody),
    details: (id: string) => requests.get<IArticle>(`/article/${id}`),
    create: (article: IArticle) => requests.post(`/article/addArticle`, article),
    update: (article: IArticle) => requests.put(`/article/${article.articleId}`, article),
    uploadPhoto: (id: string, photo: Blob) => requests.postForm<IPhotos>(`/article/addPhoto/${id}`, photo),
    setMainPhoto: (idArticle: string, id: string) => requests.post(`/article/${idArticle}/setmain/${id}`, {}),
    deletePhoto: (idArticle: string, id: string) => requests.del(`/article/${idArticle}/deletePhoto/${id}`),
    enable: (id: string) => requests.post(`/article/${id}/enable`, {}),
    disable: (id: string) => requests.post(`/article/${id}/disable`, {}),
}

//Response Profil API
const profilAgent = {
    detail: (username: string) => requests.get<IProfil>(`/profil/${username}`),
    editProfile: (profil: Partial<IProfil>) => requests.put(`/profil`, profil),
    uploadPhoto: (photo: Blob) => requests.postForm<IPhoto>(`/profil`, photo),
    follow: (username: string) => requests.post(`/profil/${username}/follow`, {}),
    unfollow: (username: string) => requests.del(`/profil/${username}/unfollow`),
    setMainPhoto: (id: string) => requests.post(`/profil/${id}/setmain`, {}),
    deletePhoto: (id: string) => requests.del(`/profil/${id}`),
    listFranchiseur: (username: string, predicate: string) => requests.get<IUserFranchiseur[]>(`/profil/${username}/franchiseurs?predicate=${predicate}`),
}

//Response Test API
const weatherAgent = {
    list: () => requests.get<IWeather>('/WeatherForecast')
}


const exportObject = {
    articleAgent,
    profilAgent,
    userAgent,
    clientAgent,
    franchiseurAgent,
    weatherAgent
}

export default exportObject;