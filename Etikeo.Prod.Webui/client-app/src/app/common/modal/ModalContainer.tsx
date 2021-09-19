import React, { useContext } from 'react';
import { BaseStoreContext } from "../../store/baseStore"
import { Modal } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';


const ModalContainer = () => {
    const baseStore = useContext(BaseStoreContext);
    const { closeModal, modal: { open, body } } = baseStore.modalStore;
    return (
        <Modal open={open} onClose={closeModal} size='mini'>
            <Modal.Content>{body}</Modal.Content>
        </Modal>
    );}
export default observer(ModalContainer);