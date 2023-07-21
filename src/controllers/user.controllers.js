const catchError = require('../utils/catchError');
const User = require('../models/User');

// Get all users from the database
const getAll = catchError(async (req, res) => {
    const user = await User.findAll()
    return res.json(user)
});

// Create new user
const create = catchError(async (req, res) => {
    const user = await User.create(req.body);
    return res.status(201).json(user);
});

// Get the information of 1 user
const getOne = catchError(async (req, res)=> {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if(!user) return res.sendStatus(400);
    return res.json(user);
});

// Delete record by ID
const destroy = catchError(async (req, res) => {
    const { id } = req.params;
    const userDestroy = await User.destroy({ where : {id}});
    if(!userDestroy) return res.sendStatus(400);
    return res.sendStatus(204);
});

// Update data
const update = catchError(async (req, res) => {
    const { id } = req.params;
    const user = await User.update(req.body, {
        where:{id},
        returning:true
    });
    if(user[0]===0) return res.sendStatus(400);
    return res.json(user[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    destroy,
    update
}