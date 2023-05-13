const { log } = require('winston')
const postModel = require('./model');
const userModel = require('./../user/model/model')

const add = async (req) => {
    try {
        console.log(req.body);
        let insertData = {
            user_id: req.body.user_id,
            image_url: req.body.image_url
        }
        let resp = await postModel.create(insertData);
        if (resp === null || resp === undefined) {
            return ({ status: "success", msg: "Post Upload Successfully", data: {} })
        }
        return ({ status: "success", data: {}, message: 'Post Upload Successfully' });
        // .then((resp) => {
        //     console.log(resp);
        //     return ({ status: "success", data: {}, message: 'Post Upload Successfully' });
        // })
        // .catch((err) => {
        //     console.log(err);
        //     return ({ status: "unsuccess", message: "Post Upload Failed", data: {} })
        // })

    } catch (err) {
        console.log(err);
    }

}
const getPostByUserId = async (req) => {
    try {
        console.log(">>>>>>>>>>>>>ghjghhgjghjhgjhg>>>>>>>>>>>>>>>>>>>>>>>>>> getPostByUserId");
        // console.log("user details",req);
        if (req.body.user_id) {
            let resp = await postModel.findAll({ where: { user_id: req.body.user_id } });
            if (resp === null || resp === undefined) {
                return ({ status: "success", msg: "Post Upload Successfully", data: {} })
            }
            return ({ status: "success", data: resp, message: 'Get Post By User Id Successfully' });
            // .then((resp) => {
            //     return ({ status: "success", data: { resp }, message: 'Post get Successfully' });
            // }).catch((err) => {
            //     console.log(err);
            // })
        }
        console.log("no data");
    } catch (err) {
        console.log(err);
    }
}
const getAll = async () => {
    try {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> getPostByUserId");
        let resp = await postModel.findAll({
            include: [{
                model: userModel,
                as:'user',
                attributes:['id','first_name','user_name']
            }]
        });
        if (resp === null || resp === undefined) {
            return ({ status: "success", msg: "There no post .. ", data: {} })
        }
        console.log(resp);
        return ({ status: "success", data: resp, message: 'Post get Successfully' });
        // .then((resp) => {
        //     // console.log(resp);
        //     return ({ status: "success", data:resp , message: 'Post get Successfully' });
        // }).catch((err) => {
        //     console.log(err);
        // })
    } catch (err) {
        console.log(err);
    }

}
module.exports = {
    add,
    getAll,
    getPostByUserId

}