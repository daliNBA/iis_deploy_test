import { BaseStore } from "./baseStore";
import { observable, action, reaction } from 'mobx';
import { IServerErrors } from "../models/IServerErrors";

export default class CommonStore {
    _baseStore: BaseStore;
    
    constructor(baseStore: BaseStore) {
        this._baseStore = baseStore

        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token);
                }
                else {
                    window.localStorage.removeItem('jwt')
                }
            }
        )
    }

    @observable token: string | null = window.localStorage.getItem('jwt');
    @observable appLoaded = false;
    @observable error: IServerErrors | null = null;


    @action setToken = (token: string | null) => {
        this.token = token;
    }
    @action setAppLoaded = () => {
        this.appLoaded = true;
    }

    @action setServerError = (error: IServerErrors) => {
        this.error = error;
    }
}
