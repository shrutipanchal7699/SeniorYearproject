const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'paramppatel',
    api_key: 866195422747955,
    api_secret: 'AHgupdmq8eHZ2DIKjj8og2DuGjw',
});


exports.uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                url: result.url,
                id: result.public_id
            })
        }, {
            resource_type: "auto",
            folder: folder
        })
    })
}