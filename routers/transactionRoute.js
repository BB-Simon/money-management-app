const router = require('express').Router()
const {
    create,
    getAllTransactions,
    getSingleTransaction,
    updateTransaction,
    removeTransaction
} = require('../controllers/transactionController')

const authenticate = require('../authenticate')



router.get('/', authenticate, getAllTransactions)

router.post('/', authenticate, create)

router.get("/:transactionId", authenticate, getSingleTransaction);

router.put("/:transactionId", authenticate, updateTransaction);

router.delete("/:transactionId", authenticate, removeTransaction);

module.exports = router