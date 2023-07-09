function uploadImage() {
    const ref = firebase.storage().ref();
    const file = document.querySelector('#photo').file[0];
    const metadata = {
        contentType: file.type
    };
    const name = file.name;
    const uploadIMG = ref.child(name).put(file, metadata);
    uploadIMG
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            console.log(url);
        })
        .catch(console.error)
}