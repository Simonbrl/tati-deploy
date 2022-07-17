"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const category_1 = __importDefault(require("../models/category"));
router.get('/:keyname', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.keyname === 'parents')
        res.send(yield category_1.default.find({ parent: null }).skip(req.query.start).limit(req.query.limit));
    else
        res.send(yield getCategoryByKeyname(req.params.keyname));
}));
router.get('/', (req, res) => {
    category_1.default.find((err, docs) => {
        if (!err)
            res.send(docs);
        else
            console.log('Error : ' + err);
    });
});
router.get('/:keyname/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield getProductsFromChildrenCategories(yield getCategoryByKeyname(req.params.keyname)));
}));
router.get('/:keyname/children', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield getCategoryChildren(req.params.keyname));
}));
router.get('/:keyname/all-children', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield getCategoryAllChildren(req.params.keyname));
}));
router.get('/:keyname/parents', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield getCategoryParents(req.params.keyname));
}));
const getCategoryParents = (keyname) => __awaiter(void 0, void 0, void 0, function* () {
    let categoryFamily = [];
    const recursive = (keyname) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield category_1.default.aggregate([
            { $match: { keyname: keyname } },
            { $lookup: {
                    from: 'categories',
                    localField: 'parent',
                    foreignField: '_id',
                    as: 'parents'
                } }
        ]).exec();
        categoryFamily.push(data[0]);
        if (data[0].parents.length > 0)
            yield recursive(data[0].parents[0].keyname);
    });
    yield recursive(keyname);
    return categoryFamily.reverse();
});
const getCategoryByKeyname = (keyname) => __awaiter(void 0, void 0, void 0, function* () { return yield category_1.default.findOne({ keyname: keyname }); });
const getCategoryProducts = (keyname) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield category_1.default.aggregate([
        { $match: { keyname: keyname } },
        { $lookup: {
                from: 'products',
                localField: '_id',
                foreignField: 'category',
                as: 'products'
            } }
    ]).exec();
    return data[0].products;
});
const getCategoryChildren = (keyname) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield category_1.default.aggregate([
        { $match: { keyname: keyname } },
        { $lookup: {
                from: 'categories',
                localField: '_id',
                foreignField: 'parent',
                as: 'children'
            } }
    ]).exec();
    return data[0].children;
});
const getCategoryAllChildren = (keyname) => __awaiter(void 0, void 0, void 0, function* () {
    let categoriesChildren = '[';
    const recursive = (keyname) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield category_1.default.aggregate([
            { $match: { keyname: keyname } },
            { $lookup: {
                    from: 'categories',
                    localField: '_id',
                    foreignField: 'parent',
                    as: 'children'
                } }
        ]).exec();
        categoriesChildren +=
            `{
            "name":"${data[0].name}",
            "keyname":"${data[0].keyname}",
            "parent":"${data[0].parent}",
            "children":[
        `;
        if (data[0].children.length > 0)
            for (let child of data[0].children)
                yield recursive(child.keyname);
        categoriesChildren += `]},`;
    });
    yield recursive(keyname);
    categoriesChildren += `]`;
    categoriesChildren = categoriesChildren.replace(/\,(?=\s*?[\}\]])/g, '');
    return JSON.parse(categoriesChildren)[0];
});
const getProductsFromChildrenCategories = (category) => __awaiter(void 0, void 0, void 0, function* () {
    let categories = [];
    const getCategories = (category) => __awaiter(void 0, void 0, void 0, function* () {
        categories.push(category);
        const children = yield getCategoryChildren(category.keyname);
        if (children.length > 0)
            for (let child of children)
                yield getCategories(child);
    });
    yield getCategories(category);
    let products = [];
    const getProducts = (categories) => __awaiter(void 0, void 0, void 0, function* () {
        for (let category of categories) {
            const categoryProducts = yield getCategoryProducts(category.keyname);
            if (categoryProducts.length > 0)
                categoryProducts.forEach(product => products.push(product));
        }
    });
    yield getProducts(categories);
    return products;
});
router.get('/create/new', (req, res) => {
    const categories = require('../data/categories.json');
    if (!categories) {
        console.log('no file');
        return;
    }
    for (let category of categories) {
        category_1.default.findOne({ keyname: nameToKeyname(category.name) }, (err, doc) => {
            if (doc)
                console.log(category.name, 'already exists');
            else {
                category_1.default.findOne({ keyname: nameToKeyname(category.parent) }, (err, doc) => {
                    if (doc) {
                        const newCategory = new category_1.default({
                            name: category.name,
                            keyname: nameToKeyname(category.name),
                            parent: doc._id,
                            image: category.image
                        });
                        newCategory.save((err) => {
                            if (err)
                                console.log(err);
                            else
                                console.log(newCategory.name, 'created');
                        });
                    }
                });
            }
        });
    }
    res.send('done');
});
const nameToKeyname = (name) => {
    let keyname = name.toLowerCase();
    keyname = keyname.replace(/[éèêë]/g, 'e');
    keyname = keyname.replace(/[àâäã]/g, 'a');
    keyname = keyname.replace(/[îïì]/g, 'i');
    keyname = keyname.replace(/[ôöòõ]/g, 'o');
    keyname = keyname.replace(/[ûüù]/g, 'u');
    keyname = keyname.replace(/[ç]/g, 'c');
    keyname = keyname.replace(/[^a-zA-Z0-9]/g, '-');
    keyname = keyname.replace(/-+/g, '-');
    return keyname;
};
module.exports = router;
