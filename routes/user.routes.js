const router = require('express').Router();
const controller = require('../controllers/user.controller');
const { checkExisting, jwToken } = require('../middlewares');

router.get('/', controller.getAll);
router.get('/:userId', controller.findOne);
router.post('/', [checkExisting], controller.create);
router.post('/signin', controller.signin);
router.put('/', [jwToken], controller.update);
router.delete('/:userId', [jwToken], controller.delete);

module.exports = router;