import { BaseStore } from './baseStore'
import { observable, action } from 'mobx';

export default class ModalStore {
    _baseStore: BaseStore;
    constructor(baseStore: BaseStore) {
        this._baseStore = baseStore
    }

    @observable.shallow modal = {
        open: false,
        body: null
    }

    @action openModal = (content: any) => {
        this.modal.open = true;
        this.modal.body = content;
    }

    @action closeModal = () => {
        this.modal.open = false;
        this.modal.body = null;
    }
}