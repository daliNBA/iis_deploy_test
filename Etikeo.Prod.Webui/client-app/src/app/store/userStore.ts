import { BaseStore } from "./baseStore";
import { observable, action, runInAction, computed } from 'mobx';
import { IUserFromValues, IUser } from '../models/IUser';
import agent from "../agent/agent";
import { history } from '../../index';

export default class UserStore {

    refreshTokenTimeOut: any;

    _baseStore: BaseStore;
    constructor(baseStore: BaseStore) {
        this._baseStore = baseStore;
    }

    @observable user: IUser | null = null;

    @computed get isLoggedIn() {
        return !!this.user;
    }

    @action login = async (values: IUserFromValues) => {
        try {
            const result = await agent.userAgent.login(values);
            this._baseStore.commonStore.setToken(result.token);
            this.startRefreshTokenTimer(result);
            runInAction(() => this.user = result);
            this._baseStore.modalStore.closeModal();
            history.push('/menuPage');
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    @action register = async (values: IUserFromValues) => {
        try {
            const user = await agent.userAgent.register(values);
            this._baseStore.modalStore.closeModal();
            this._baseStore.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
            history.push(`/user/registerSuccess?email=${values.email}`);
            console.log(user);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    @action logout = () => {
        this._baseStore.commonStore.setToken(null);
        this.user = null;
        history.push('/');
    }

    @action getUser = async () => {
        console.log('getuser')
        try {
            const user = await agent.userAgent.current();
            runInAction(() => this.user = user);
            this.startRefreshTokenTimer(user);
        } catch (error) {
            console.log(error);
        }
    }

    @action refreshToken = async () => {
        this.stopRefreshTokenTimer();
        try {
            const user = await agent.userAgent.refreshToken();
            runInAction(() => this.user = user);
            this._baseStore.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
        } catch (e) {
            console.log(e);
        }
    }

    private startRefreshTokenTimer(user: IUser) {
        const jwtToken = JSON.parse(atob(user.token.split('.')[1]));
        const expired = new Date(jwtToken.exp * 1000);
        const timeOut = expired.getTime() - Date.now() - (120 * 1000);
        this.refreshTokenTimeOut = setTimeout(this.refreshToken, timeOut);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeOut);
    }

}