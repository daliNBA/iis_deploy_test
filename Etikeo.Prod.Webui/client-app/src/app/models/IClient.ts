
export interface IClientEnveloppe {
    clients: IClient[];
    clientCount: number;
}

export interface IClient {
    clientId: string;
    codeClient: number;
    dateCreation: Date;
    dateNaissance: Date;
    nomBoutique: string;
    prenom: string;
    adrsseFacturation: string;
    adrsseLivraison: string;
    adrsseComplement: string;
    codePostal: number;
    telephone: number;
    fax: string;
    intraCommunautaire: string;
    telMobile: number;
    email: string;
    isActive: boolean;
    photo: IPhoto;
    owner: string;
    isOwner: boolean;
    franchiseurId: string;
}

export class ClientFormValues {
    clientId: string = '';
    codeClient: number = 0;
    dateCreation: Date = new Date(Date.now());
    dateNaissance: Date = new Date(Date.now());
    nomBoutique: string = '';
    prenom: string = '';
    adrsseFacturation: string = '';
    adrsseLivraison: string = '';
    adrsseComplement: string = '';
    codePostal: number = 0;
    telephone: number = 0;
    fax: string = '';
    intraCommunautaire: string = '';
    telMobile: number = 0;
    email: string = '';
    isActive: boolean = true;
    constructor(init?: ClientFormValues) {
        Object.assign(this, init)
    }
}

export interface IPhoto {
    id: string;
    url: string;
    isMain: boolean;
}