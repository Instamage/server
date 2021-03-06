const router = require('express').Router()
const PostController = require('../controllers/postController')
const { authentication, authorization } = require('../middlewares/auth')
const multer = require('../middlewares/multer')
const gcs = require('../middlewares/gcs')

router.get('/all', PostController.findAll)
router.use(authentication)
router.get('/', PostController.myPost)
router.post('/', multer.single('image'), gcs, PostController.addPost)
router.patch('/like/:id', PostController.likeUnlikePost)
router.post('/comment/:id', PostController.postComment)

router.get('/postuser/:id', PostController.findPostUser)

router.use(':id', authorization)
router.patch('/:id/update', PostController.editCaption)
router.delete('/:id/delete', PostController.deletePost)


module.exports = router