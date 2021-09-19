import { BaseStore } from "./baseStore";
import { IProfil, IPhoto, IUserFranchiseur } from "../models/IProfil";
import { observable, runInAction, action, computed, reaction } from 'mobx';
import agent from "../agent/agent";
import { toast } from "react-toastify";

export default class ProfilStore {

    _baseStore: BaseStore;
    constructor(baseStore: BaseStore) {
        this._baseStore = baseStore;

        reaction(
            () => this.activeTab,
            activeTab => {
                if (activeTab != 0)
                    return true;
            }
        )
    }

    @observable profil: IProfil | null = null
    @observable loadingProfil = true;
    @observable uploadingPhoto = false;
    @observable activeTab: number = 0;
    @observable loadingPhotoAction = false;
    @observable loadingFranchiseurs = false;
    @observable userFranchiseur: IUserFranchiseur[] = [];

    @computed get isCurrentUser() {
        if (this.profil && this._baseStore.userStore.user)
            return this.profil.username === this._baseStore.userStore.user.username;
        else
            return false;
    }

    @action setActiveTab = (activeIndex: number) => {
        this.activeTab = activeIndex;
    }

    @action loadProfil = async (username: string) => {
        this.loadingProfil = true;
        try {
            const profil = await agent.profilAgent.detail(username);
            runInAction(() => {
                this.profil = profil;
                this.loadingProfil = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loadingProfil = false;
            })
            console.log(error);
        }
    }

    @action editProfil = async (profil: Partial<IProfil>) => {
        try {
            await agent.profilAgent.editProfile(profil);
            runInAction(() => {
                if (profil.displayName !== this._baseStore.userStore.user!.displayName) {
                    this._baseStore.userStore.user!.displayName = profil.displayName!;
                }
                this.profil = { ...this.profil!, ...profil }
            })
        } catch (e) {
            toast.error("Problème de mise à jour profil");
            runInAction(() => {
            })
        }
    }

    @action uploadPhoto = async (file: Blob) => {
        this.uploadingPhoto = true;
        try {
            const photo = await agent.profilAgent.uploadPhoto(file);
            runInAction(() => {
                if (this.profil) {
                    this.profil.photos.push(photo);
                    if (photo.isMain && this._baseStore.userStore.user) {
                        this._baseStore.userStore.user.image = photo.url;
                        this.profil.image = photo.url;
                    }
                }
                this.uploadingPhoto = false;
            })
        } catch (e) {
            console.log(e);
            toast.error("Problème de mise à jour photo!");
            runInAction(() => {
                this.uploadingPhoto = false;
            })
        }
    }

    @action setMainPhoto = async (photo: IPhoto) => {
        this.loadingPhotoAction = true;
        try {
            await agent.profilAgent.setMainPhoto(photo.id);
            runInAction(() => {
                this._baseStore.userStore.user!.image = photo.url;
                this.profil!.photos.find(a => a.isMain)!.isMain = false;
                this.profil!.photos.find(a => a.id === photo.id)!.isMain = true;
                this.profil!.image = photo.url;
                this.loadingPhotoAction = false;
            })
        } catch (e) {
            console.log(e);
            toast.error("Problème de mise à jour photo de profil!");
            runInAction(() => {
                this.loadingPhotoAction = false;
            })
        }
    };

    @action deletePhoto = async (photo: IPhoto) => {
        this.loadingPhotoAction = true;
        try {
            await agent.profilAgent.deletePhoto(photo.id);
            runInAction(() => {
                this.profil!.photos = this.profil!.photos.filter(a => a.id !== photo.id);
                this.loadingPhotoAction = false;
            })
        } catch (e) {
            console.log(e);
            toast.error("Problem deleting photo!");
            runInAction(() => {
                this.loadingPhotoAction = false;
            })
        }
    }

    @action loadFranchiseurs = async (username: string, predicate: string) => {
        this.loadingFranchiseurs = true;
        try {
            const franchiseurs = await agent.profilAgent.listFranchiseur(username, predicate);
            runInAction(() => {
                this.userFranchiseur = franchiseurs;
                this.loadingFranchiseurs = false;
            })
        } catch (e) {
            toast.error("Problème chargement des franchiseurs!");
            runInAction(() => {
                this.loadingFranchiseurs = false;
            })
        }
    }
}