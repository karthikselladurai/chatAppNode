const { products,
    productElectronic,
    productLaptop } = require('./model/model')
const logger = require('../../src/services/logger');
const moment = require('moment');
const fs = require("fs");
const uploadFile = require('../middleware/upload')
const env = process.env


exports.products = async (req, res) => {
    let startTime = moment().format('HH:mm:ss')
    logger.info({ time: `${startTime}`, message: ` get product process start` })
    try {
        let resp = await products.findAll()
        res.status(200).send({ status: "success", msg: "products", data: resp })
    }
    catch (err) {
        console.log(err);
    }
}
exports.insertProduct = async (req, res) => {
    let startTime = moment().format('HH:mm:ss')
    logger.info({ time: `${startTime}`, message: ` get insert product  process start` })
    try {
        console.log("try");
        const insertData = {
            productName: req.body.productName
        }
        // let validateResult = await registerSchema.validate(insertData)

        if (false/*validateResult.error*/) {
            res.status(400).json({ message: "error", result: validateResult.error.details[0].message })
        } else {
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            let resp = await products.create(insertData);
            console.log(resp);
        }
    }
    catch (err) {
        console.log(err);
    }
}
exports.insertLaptop = async (req, res) => {
    try {
        let body = req.body
        let lapImgName = body.lapImgName
        const insertData = {
            laptopImg: fs.readFileSync(
                env.PATH1 + "/" + lapImgName
            ),
            laptopName: body.laptopName,
            laptopModel: body.laptopModel,
            laptopPrice: body.laptopPrice,
            laptopBrand: body.laptopBrand,
            color: body.color,
            ram: body.ram,
            rom: body.rom,
            storageType: body.storageType,
            displaytSize: body.displaytSize,
            displayType: body.displayType
        }
        console.log(insertData);
        await productLaptop.create(insertData)
            .then(result => {
                console.log("result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",result);
            })
            .catch(err => {
                console.log(err);
            })
    }
    catch (err) {
        console.log(err)
    }
}