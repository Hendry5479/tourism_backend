module.exports = (app) => ( {
  '/uploadImage post': async () => {
    await app.$ctrl.upload.uploadImage(app.ctx, 'upload')
  },
  '/uploadCover post': async () => {
    await app.$ctrl.upload.uploadImage(app.ctx, 'cover')
  },
  '/uploadAvatar post': async () => {
    await app.$ctrl.upload.uploadImage(app.ctx, 'avatar')
  },

} )
