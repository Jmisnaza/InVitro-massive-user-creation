const express = require('express');
const { users } = require('../../store/firestore');

const router = express.Router();

router.post('/', create);
router.get('/', list);

async function list (req, res, next) {
    try {
        const allUsers = users.listUsers()
        res.status(201).json({
            data: allUsers,
            message: 'Users listed correctly'
        })
    } catch (error) {
        next(error)
    }
}

async function create(req, res, next) {
    const userData = req.body
        try {
            const newUser = await users.createUser(userData);
            res.status(201).json({
                data: newUser,
                message: 'User created correctly'
            })
        } catch (error) {
            next(error)
    }
}

module.exports = router;

