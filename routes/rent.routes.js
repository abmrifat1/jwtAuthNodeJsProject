const router = require('express').Router();
const controller = require('../controllers/rent.controller');
const { checkExisting, jwToken } = require('../middlewares');

router.get('/', controller.getAll);
// router.get('/:userId', controller.findOne);
router.post('/', [jwToken], controller.create);
// router.put('/', [jwToken], controller.update);
// router.delete('/:userId', [jwToken], controller.delete);

module.exports = router;