const router = require('express').Router()
const PostController = require('../controllers/postController')
const { authentication, authorization } = require('../middlewares/auth')
const multer = require('../middlewares/multer')
const gcs = require('../middlewares/gcs')

router.get('/', PostController.findAll)
router.use(authentication)
router.get('/', PostController.myPost)
router.post('/', multer.single('image'), gcs, PostController.addPost)
router.patch('/like/:id', PostController.likeUnlikePost)
router.patch('/:id/update', authorization, PostController.editCaption)

router.post('/comment/:id', PostController.postComment)

module.exports = router