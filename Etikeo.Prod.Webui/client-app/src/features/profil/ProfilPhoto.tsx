import React, { useContext, useState } from 'react';
import { Tab, Header, Card, Image, Button, Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { BaseStoreContext } from '../../app/store/baseStore';
import PhotoUploadWidget from '../../app/common/photoUpload/PhotoUploadWidget';

const ProfilPhoto = () => {
    const baseStore = useContext(BaseStoreContext)
    const { profil, isCurrentUser, uploadPhoto, uploadingPhoto, setMainPhoto, deletePhoto, loadingPhotoAction } = baseStore.profilStore;

    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [target, setTarget] = useState<string | undefined>(undefined);
    const [deleteTarget, setDeleteTarget] = useState<string | undefined>(undefined);
    const handleUploadImage = (photo: Blob) => {
        uploadPhoto(photo).then(() => setAddPhotoMode(false));
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16} style={{ paddingBottom: 0 }}>
                    <Header floated='left' icon='image' content='Photos' />
                    {isCurrentUser && profil!.photos!.length < 2 && (
                        <Button
                            onClick={() => setAddPhotoMode(!addPhotoMode)}
                            floated='right'
                            basic
                            content={addPhotoMode ? 'Cancel' : 'Add Photo'}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode ? (
                        <PhotoUploadWidget
                            uploadPhoto={handleUploadImage}
                            loading={uploadingPhoto}
                        />
                    ) : (
                            <Card.Group itemsPerRow={5}>
                                {profil &&
                                    profil.photos.map(photo => (
                                        <Card key={photo.id}>
                                            <Image src={photo.url} />
                                            {isCurrentUser && (
                                                <Button.Group fluid widths={2}>
                                                    <Button
                                                        onClick={e => {
                                                            setMainPhoto(photo);
                                                            setTarget(e.currentTarget.name);
                                                        }}
                                                        name={photo.id}
                                                        disabled={photo.isMain}
                                                        loading={loadingPhotoAction && target === photo.id}
                                                        basic
                                                        positive
                                                        content='Main'
                                                    />
                                                    <Button
                                                        name={photo.id}
                                                        disabled={photo.isMain}
                                                        onClick={(e) => {
                                                            deletePhoto(photo);
                                                            setDeleteTarget(e.currentTarget.name)
                                                        }}
                                                        loading={loadingPhotoAction && deleteTarget === photo.id}
                                                        basic
                                                        negative
                                                        icon='trash'
                                                    />
                                                </Button.Group>
                                            )}
                                        </Card>
                                    ))}
                            </Card.Group>
                        )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
};

export default observer(ProfilPhoto);
