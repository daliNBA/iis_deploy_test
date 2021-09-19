import { BaseStore } from "./baseStore";
import { observable, action, runInAction, reaction, toJS, computed } from 'mobx';
import agent from '../agent/agent';
import { history } from '../../index';
import { toast } from "react-toastify";
import { IClient } from "../models/IClient";
import { setClientProps } from "../common/util/util";
import { IPagination, PagingParams } from "../models/IPagination";

const LIMIT = 5;

export default class ClientStore {
    _baseStore: BaseStore;
    constructor(baseStore: BaseStore) {
        this._baseStore = baseStore;
        reaction(
            () => this.predicate.keys(),
            () => {
                this.page = 0;
                this.clientRegestry.clear();
                this.loadClients();
            }
        )
        reaction(
            () => this.activeTab,
            activeTab => {
                if (activeTab != '')
                    this.loadClient(activeTab)
            }
        )
    }
    @observable loadingInitial = false;
    @observable loadingClient = true;
    @observable submitting = false;
    @observable deletingClient = false;
    @observable uploadingPhoto = false;
    @observable client: IClient | null = null;
    @observable clients: IClient[] = [];
    @observable clientRegestry = new Map();
    @observable clientsCount = 0;
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
        return Math.ceil(this.clientsCount / LIMIT);
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
    @observable editClientMode: boolean = false;


    @computed get clientByAddress() {
        return this.sortByFranchiseur(Array.from(this.clientRegestry.values()));
    }

    @action setPredicate = (predicate: string, value: string | Date) => {
        this.predicate.clear();
        if (predicate !== 'all') {
            this.predicate.set(predicate, value);
        }
    }

    @action clearActivity = () => {
        this.client = null;
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

    sortByFranchiseur(clients: IClient[]) {

        //const sortedClients = clients.sort((a, b) => a.dateCreation!.getDate() - b.dateCreation!.getDate());
        const sotedByFranchiseur = clients.sort((a, b) => a.prenom.localeCompare(b.prenom));

        return Object.entries(
            sotedByFranchiseur.reduce(
                (clients, client) => {
                    const code = client.prenom;
                    clients[code] = clients[code]
                        ? [...clients[code], client]
                        : [client];
                    return clients;
                },
                {} as { [key: string]: IClient[] }
            )
        );
    }

    @action loadClients = async () => {
        this.loadingInitial = true;
        try {
            const clientEnveloppe = await agent.clientAgent.list(this.axiosParams);
            const { clients, clientCount } = clientEnveloppe;
            runInAction(() => {
                clients.forEach((client) => {
                    setClientProps(client);
                    this.clientRegestry.set(client.clientId, client);
                })
                //this.setPagination(result.clientCount);
                // this.clients = result.data;
                this.clientsCount = clientCount;
                this.loadingInitial = false;
            })
        } catch (e) {
            runInAction(() => {
                this.loadingInitial = false;
            })
            console.log(e);
        }
    }

    @action loadClientsFranchise = async (id: string) => {
        this.loadingInitial = true;
        try {
            const clientEnveloppe = await agent.clientAgent.listClientsFranchise(id, this.axiosParams);
            const { clients, clientCount } = clientEnveloppe;
            runInAction(() => {
                clients.forEach((client) => {
                    setClientProps(client);
                    this.clientRegestry.set(client.clientId, client);
                })
                this.clientsCount = clientCount;
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
        this.editClientMode = newState;
    }

    @action loadClient = async (id: string) => {
        this.loadingClient = true;
        let client = this.getClient(id);
        if (client) {
            this.client = client;
            this.loadingClient = false;
            return toJS(client);
        }
        else {
            try {
                client = await agent.clientAgent.details(id);
                runInAction(() => {
                    client.dateCreation = client.dateCreation.split('T')[0];
                    this.client = client;
                    this.clientRegestry.set(client.clientId, client);
                    this.loadingClient = false;
                })
                return client;
            } catch (e) {
                runInAction(() => {
                    this.loadingClient = false;
                })
                console.log(e);
            }
        }
    }

    getClient = (id: string) => {
        return this.clientRegestry.get(id);
    }

    @action create = async (values: Partial<IClient>) => {
        this.submitting = true;
        try {
            await agent.clientAgent.create(values);
            runInAction(() => {
                this.clientRegestry.set(values.clientId, values)
                this.client = { ...this.client!, ...values };
                this.submitting = false;
            })
            history.push(`/clients/${this.client?.franchiseurId}`);
        } catch (e) {
            runInAction(() => {
                this.submitting = false;
                console.log(e);
            })
        }
    }

    @action editClient = async (values: Partial<IClient>) => {
        this.submitting = true;
        try {
            await agent.clientAgent.update(values);
            runInAction(() => {
                this.clientRegestry.set(values.clientId, values);
                this.client = { ...this.client!, ...values };
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
        this.deletingClient = true;
        try {
            await agent.clientAgent.disable(id);
            runInAction(() => {
                this.deletingClient = false;
                this.client!.isActive = false;
            })
        } catch (e) {
            console.log(e);
            toast.error("Problème désactivation client!");
            runInAction(() => {
                this.deletingClient = false;
            })
        }
    }

    @action enable = async (id: string) => {
        this.deletingClient = true;
        try {
            await agent.clientAgent.enable(id);
            runInAction(() => {
                this.deletingClient = false;
                this.client!.isActive = true;
            })
        } catch (e) {
            console.log(e);
            toast.error("Problème d'activation client!");
            runInAction(() => {
                this.deletingClient = false;
            })
        }
    };
}