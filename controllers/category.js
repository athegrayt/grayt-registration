const { errorHandler } = require("../helpers/dbErrorsHandler")
const Category = require("../models/category")

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: "Category does not exist"
            })
        }
        req.category = category
        next() 
    })
}

exports.alreadyExists = (req, res, next) => {
    Category.findOne({ name: req.body.name }).exec((err, curCategory) => {
        if (curCategory) {
            return res.status(400).json({
                error: `"${req.body.name}" already exists as a category`
            })
        }
        next()
    })
}

exports.create = (req, res) => {
    const category = new Category(req.body)
            category.save((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }
                res.json(data)
            })
}

exports.read = (req, res) => {
    return res.json(req.category)
}

exports.update = (req, res) => {
    const category = req.category
    category.name = req.body.name
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}
exports.remove = (req, res) => {
    const category = req.category
    category.deleteOne((err, categoryRemoved) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
      res.json({message: "Category was removed"})
    })
}
exports.list = (req, res) => {
    Category.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
               error: errorHandler(err) 
            })
        }
        res.json({
            data
        })
    })
}