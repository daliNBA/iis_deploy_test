import { createContext } from 'react';
import { configure } from 'mobx';
import ArticleStore from './articleStore';
import ModalStore from './modalStore';
import CommonStore from './commonStore';
import UserStore from './userStore';
import ClientStore from './clientStore';
import ProfilStore from './profilStore';
import FranchiseurStore from './franchiseurStore';

configure({ enforceActions: "always" });

export class BaseStore {
    articleStore: ArticleStore;
    modalStore: ModalStore;
    commonStore: CommonStore;
    userStore: UserStore;
    clientStore: ClientStore;
    profilStore: ProfilStore;
    franchiseurStore: FranchiseurStore;
    constructor() {
        this.articleStore = new ArticleStore(this);
        this.modalStore = new ModalStore(this);
        this.commonStore = new CommonStore(this);
        this.userStore = new UserStore(this);
        this.clientStore = new ClientStore(this);
        this.profilStore = new ProfilStore(this);
        this.franchiseurStore = new FranchiseurStore(this)
    }
}

export const BaseStoreContext = createContext(new BaseStore());