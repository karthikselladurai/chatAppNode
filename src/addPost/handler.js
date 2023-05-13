const { log } = require('winston');
const { add, getAll, getPostByUserId } = require('./controller')

const addPost = async (req, res) => {
    const response = await add(req);
    return res.send(response)
}
const getPostById = async (req, res) => {
    const response = await getPostByUserId(req);
    return res.send(response)
}
const getAllPost = async (req, res) => {
    const response = await getAll();
    console.log("resssssss ",response);
    return res.send(response)
}
module.exports = {
    addPost,
    getPostById,
    getAllPost
}