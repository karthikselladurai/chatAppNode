const { productList, productItems } = require('./model/productModel')
const logger = require('../../src/services/logger');
const moment = require('moment');
const fs = require('fs');
const uploadFile = require('../middleware/upload');
const { ENUM } = require('sequelize');
const { loginSchema } = require('../middleware/joiValidation');
const env = process.env


exports.products = async (req, res) => {
    let startTime = moment().format('HH:mm:ss')
    logger.info({ time: `${startTime}`, message: ` get product process start` })
    try {
        // let resp = await products.findAll({include: {model:productElectronic,require:true}},{include:{model:productFashion,require:true}})
        let category = [{ name: "Electronics", id: "E11" }, { name: "Fashion", id: "F11" }, { name: "home", id: 'H11' }, { name: "sample product", id: "A11" }, { name: "sample product", id: "A11" }, { name: "sample product", id: "A12" }
            , { name: "sample product", id: "A13" }, { name: "sample product", id: "A14" }, { name: "sample product", id: "A15" }, { name: "sample product", id: "A16" }, { name: "sample product", id: "A14" }, { name: "sample product", id: "A15" }, { name: "sample product", id: "A16" }
            , { name: "sample product", id: "A13" }, { name: "sample product", id: "A14" }, { name: "sample product", id: "A15" }, { name: "sample product", id: "A16" }, { name: "sample product", id: "A14" }]
        let resp = await productList.findAll()
        resp = [category, resp]
        console.log(resp, resp);
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
        let body = req.body
        // let productImgName = body.productImgName
        const insertData = {
            // productImg: fs.readFileSync(env.PATH1 + '/' + productImgName + ".jpeg", (err, result) => {
            //     if (err) {
            //         console.log(err);
            //     } else {
            //         console.log(result);
            //     }
            // }),
            productImg:"null",
            productName: body.productName,
            productType: body.productType,
            productPrice: body.productPrice,
            productBrand: body.productBrand,
            productColor: body.productColor,
            productSpecification: body.productSpecification,
            pruductImageUrl:body.pruductImageUrl


        }
        console.log(">>>>>>>>>insertData>>>>>>>>>>>>", insertData);
        // let validateResult = await registerSchema.validate(insertData)

        if (false/*validateResult.error*/) {
            res.status(400).json({ message: "error", result: validateResult.error.details[0].message })
        } else {
            console.log`(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");`
            let resp = await productItems.create(insertData);
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
            laptopImg: fs.readFileSync(env.PATH1 + "/" + lapImgName),
            laptopName: body.laptopName,
            laptopModel: body.laptopModel,
            laptopPrice: body.laptopPrice,
            laptopBrand: body.laptopBrand,
            color: body.color,
            ram: body.ram,
            rom: body.rom,
            storageType: body.storageType,
            displaySize: body.displaySize,
            displayType: body.displayType
        }
        console.log(insertData);
        await productLaptop.create(insertData)
            .then(result => {
                console.log("result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", result);
            })
            .catch(err => {
                console.log(err);
            })
    }
    catch (err) {
        console.log(err)
    }
}
exports.getItems = async (req, res) => {
    try {
        let startTime = moment().format('HH:mm:ss')
        logger.info({ time: `${startTime}`, message: ` get product process start` })
        let resp = await productItems.findAll();
        console.log(resp);
        res.status(200).send({ status: "success", msg: "items", data: resp })
    } catch (err) {
        console.log(err)
    }
}
exports.getProductById = async(req,res)=>{
    let startTime = moment().format('HH:mm:ss')
    try{
        console.log( req.params.id );
        logger.info({ time: `${startTime}`, message: ` get product process start` })
        if( req.params.id &&  req.params.id == null) {
            res.status(400).send({ status: "Unsuccess", msg: "missing product id" ,data:{}})
            logger.error({ StartTime: `${startTime}`, message: "missing product id"  })
        }else{
            let resp = await productItems.findOne({where:{id:req.params.id}})
              console.log(resp);
            if(resp == null){
                logger.error({ StartTime: `${startTime}`, message: "InValid product id"  })
                res.status(400).send({ status: "Unsuccess", msg: "InValid product id" ,data:{}})
            }else{
            res.status(200).send({ status: "success", msg: "items", data: resp })
            let endTime = moment().format('HH:mm:ss')
            logger.info({ StartTime: `${startTime}`, message: ` product process end sucessfully` })
      
            }    
        } 
    }catch(err){
        // console.log(err)
        let endTime = moment().format('HH:mm:ss')
        logger.error({ StartTime: `${startTime}`,EndTime:endTime, message: err})
    }
}