export interface IProfil {
    displayName: string;
    email: string;
    username: string;
    image: string;
    bio: string;
    password: string;
    photos: IPhoto[];
}

export interface IPhoto {
    id: string;
    url: string;
    isMain: boolean;
}

export interface IUserFranchiseur {
    id: string;
    codeFranchiseur: string;
    nomBoutique: string;
    adrsseFacturation: string;
    image: string;
}
