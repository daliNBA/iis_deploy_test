import { BaseStore } from "./baseStore";
import { observable, action, runInAction, reaction, toJS, computed } from 'mobx';
import agent from '../agent/agent';
import { toast } from "react-toastify";
import { setFranchiseurProps } from "../common/util/util";
import { IFranchiseur } from "../models/IFranchiseur";
import { history } from '../../index';
const LIMIT = 5;

export default class FranchiseurStore {
    _baseStore: BaseStore;
    constructor(baseStore: BaseStore) {
        this._baseStore = baseStore;
        reaction(
            () => this.predicate.keys(),
            () => {
                this.page = 0;
                this.franchiseurRegestry.clear();
                this.loadFranchiseurs();
            }
        )
        reaction(
            () => this.activeTab,
            activeTab => {
                if (activeTab != '')
                    this.loadFranchiseur(activeTab)
            }
        )
    }
    @observable loadingInitial = false;
    @observable loadingFranchiseur = true;
    @observable submitting = false;
    @observable deletingFranchiseur = false;
    @observable uploadingPhoto = false;
    @observable franchiseur: IFranchiseur | null = null;
    @observable franchiseurs: IFranchiseur[] = [];
    @observable franchiseurRegestry = new Map();
    @observable franchiseursCount = 0;
    @observable page = 0
    @observable predicate = new Map();
    @observable activeTab: string = "";
    // @observable pagination: IPagination | null = null;
    // @observable pagingParams = new PagingParams();


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

    @computed get totalPages() {
        return Math.ceil(this.franchiseursCount / LIMIT);
    }


    @action setPage = (page: number) => {
        this.page = page;
    }

    //@computed get axiosParams() {
    //    const params = new URLSearchParams();
    //    params.append('pageNumber', this.pagingParams.pageNumber.toString());
    //    params.append('pageSize', this.pagingParams.pageSize.toString());
    //    return params;
    //}
    @observable editFranchiseurMode: boolean = false;


    @computed get franchiseurByAddress() {
        return this.sortByAddress(Array.from(this.franchiseurRegestry.values()));
    }

    @action setPredicate = (predicate: string, value: string | Date) => {
        this.predicate.clear();
        if (predicate !== 'all') {
            this.predicate.set(predicate, value);
        }
    }

    @action clearActivity = () => {
        this.franchiseur = null;
    };

    @action setActiveTab = async (activeIndex: string) => {
        runInAction(() => {
            this.activeTab = activeIndex;
        })
    }


    //setPagination = (pagination: IPagination) => {
    //    this.pagination = pagination;
    //}

    //setPagingParams = (pagingParams: PagingParams) => {
    //    this.pagingParams = pagingParams;
    //}

    sortByAddress(franchiseurs: IFranchiseur[]) {

        //const sortedClients = clients.sort((a, b) => a.dateCreation!.getDate() - b.dateCreation!.getDate());
        const sotedByAdress = franchiseurs.sort((a, b) => a.adrsseFacturation.localeCompare(b.adrsseFacturation));

        return Object.entries(
            sotedByAdress.reduce(
                (franchiseurs, franchiseur) => {
                    const code = franchiseur.adrsseFacturation;
                    franchiseurs[code] = franchiseurs[code]
                        ? [...franchiseurs[code], franchiseur]
                        : [franchiseur];
                    return franchiseurs;
                },
                {} as { [key: string]: IFranchiseur[] }
            )
        );
    }

    @action loadFranchiseurs = async () => {
        this.loadingInitial = true;
        try {
            const franchiseurEnveloppe = await agent.franchiseurAgent.list(this.axiosParams);
            const { franchiseurs, franchiseurCount } = franchiseurEnveloppe;
            runInAction(() => {
                franchiseurs.forEach((franchiseur) => {
                    setFranchiseurProps(franchiseur);
                    this.franchiseurRegestry.set(franchiseur.franchiseurId, franchiseur);
                })
                this.franchiseursCount = franchiseurCount;
                this.loadingInitial = false;
            })
        } catch (e) {
            runInAction(() => {
                this.loadingInitial = false;
            })
            console.log(e);
        }
    }

    @action changeButtonState = async (newState: boolean) => {
        this.editFranchiseurMode = newState;
    }

    @action loadFranchiseur = async (id: string) => {
        this.loadingFranchiseur = true;
        let franchiseur = this.getFranchiseur(id);
        if (franchiseur) {
            this.franchiseur = franchiseur;
            this.loadingFranchiseur = false;
            return toJS(franchiseur);
        }
        else {
            try {
                franchiseur = await agent.franchiseurAgent.details(id);
                runInAction(() => {
                    franchiseur.dateCreation = franchiseur.dateCreation.split('T')[0];
                    this.franchiseur = franchiseur;
                    this.franchiseurRegestry.set(franchiseur.franchiseurId, franchiseur);
                    this.loadingFranchiseur = false;
                })
                return franchiseur;
            } catch (e) {
                runInAction(() => {
                    this.loadingFranchiseur = false;
                })
                console.log(e);
            }
        }
    }

    getFranchiseur = (id: string) => {
        return this.franchiseurRegestry.get(id);
    }

    @action create = async (values: IFranchiseur) =>
    {
        this.submitting = true;
        try {
            await agent.franchiseurAgent.create(values);
            runInAction(() => {
                this.franchiseurRegestry.set(values.franchiseurId, values)
                this.franchiseur = values;
                this.submitting = false;
            })
            history.push('/franchiseurDashboard');
        } catch (e) {
            runInAction(() => {
                this.submitting = false;
                console.log(e);
            })
        }
    }
    @action editFranchiseur = async (values: Partial<IFranchiseur>) => {
        this.submitting = true;
        try {
            await agent.franchiseurAgent.update(values);
            runInAction(() => {
                this.franchiseurRegestry.set(values.franchiseurId, values);
                this.franchiseur = { ...this.franchiseur!, ...values };
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

    @action disable = async (id: string) => {
        this.deletingFranchiseur = true;
        try {
            await agent.franchiseurAgent.disable(id);
            runInAction(() => {
                this.deletingFranchiseur = false;
                this.franchiseur!.isActive = false;
            })
        } catch (e) {
            console.log(e);
            toast.error("Problème désactivation franchiseur!");
            runInAction(() => {
                this.deletingFranchiseur = false;
            })
        }
    }

    @action enable = async (id: string) => {
        this.deletingFranchiseur = true;
        try {
            await agent.franchiseurAgent.enable(id);
            runInAction(() => {
                this.deletingFranchiseur = false;
                this.franchiseur!.isActive = true;
            })
        } catch (e) {
            console.log(e);
            toast.error("Problème d'activation franchiseur!");
            runInAction(() => {
                this.deletingFranchiseur = false;
            })
        }
    };
}