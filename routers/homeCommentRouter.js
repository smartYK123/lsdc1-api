// Comment Routes
const router = require("express").Router();
const homeCommentController = require('../controllers/homeCommentController');

router.post('/', homeCommentController.postComment);
router.get('/total/:videoId', homeCommentController.getTotalComments);
router.get('/:videoId', homeCommentController.getAllComments);

module.exports = router;