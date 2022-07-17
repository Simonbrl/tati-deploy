import express from 'express';
const router = express.Router();

import Category from '../models/category';

router.get('/:keyname', async (req: any, res: any) => {
    if(req.params.keyname === 'parents') 
        res.send(await Category.find({parent: null}).skip(req.query.start).limit(req.query.limit))
    else
        res.send(await getCategoryByKeyname(req.params.keyname))
})

router.get('/', (req: any, res: any) => {
    Category.find((err: any, docs: any) => {
        if(!err) res.send(docs)
        else console.log('Error : ' + err);
    })
})

router.get('/:keyname/products', async (req: any, res: any) => {
    res.send(await getProductsFromChildrenCategories(await getCategoryByKeyname(req.params.keyname)))
})

router.get('/:keyname/children', async (req: any, res: any) => {
    res.send(await getCategoryChildren(req.params.keyname))
})

router.get('/:keyname/all-children', async (req: any, res: any) => {
    res.send(await getCategoryAllChildren(req.params.keyname))
})

router.get('/:keyname/parents', async (req: any, res: any) => {
    res.send(await getCategoryParents(req.params.keyname))
})

const getCategoryParents = async (keyname: any) => {
    let categoryFamily: Array<any> = []

    const recursive = async (keyname: any) => {
        const data = await Category.aggregate([
            {$match: {keyname: keyname}},
            {$lookup: {
                from: 'categories',
                localField: 'parent',
                foreignField: '_id',
                as: 'parents'
            }}
        ]).exec();

        categoryFamily.push(data[0])

        if(data[0].parents.length > 0) await recursive(data[0].parents[0].keyname)
    }
    await recursive(keyname)
    return categoryFamily.reverse()
}

const getCategoryByKeyname = async (keyname: string) => await Category.findOne({keyname: keyname})

const getCategoryProducts = async (keyname: string) => {
    const data = await Category.aggregate([
        {$match: {keyname: keyname}},
        {$lookup: {
            from: 'products',
            localField: '_id',
            foreignField: 'category',
            as: 'products'
        }}
    ]).exec();
    return data[0].products;
}

const getCategoryChildren = async (keyname: any) => {
    const data = await Category.aggregate([
        {$match: {keyname: keyname}},
        {$lookup: {
            from: 'categories',
            localField: '_id',
            foreignField: 'parent',
            as: 'children'
        }}
    ]).exec();
    return data[0].children;
}

const getCategoryAllChildren = async (keyname: any) => {
    let categoriesChildren: string = '['

    const recursive = async (keyname: any) => {
        const data = await Category.aggregate([
            {$match: {keyname: keyname}},
            {$lookup: {
                from: 'categories',
                localField: '_id',
                foreignField: 'parent',
                as: 'children'
            }}
        ]).exec();
        categoriesChildren += 
        `{
            "name":"${data[0].name}",
            "keyname":"${data[0].keyname}",
            "parent":"${data[0].parent}",
            "children":[
        `
        if(data[0].children.length > 0) for(let child of data[0].children) await recursive(child.keyname)
        categoriesChildren += `]},`
    }
    await recursive(keyname)
    categoriesChildren += `]`
    
    categoriesChildren = categoriesChildren.replace(/\,(?=\s*?[\}\]])/g, '')
    return JSON.parse(categoriesChildren)[0]
}

const getProductsFromChildrenCategories = async (category: any) => {
    let categories: Array<any> = []

    const getCategories = async (category: any) => {
        categories.push(category)
        const children: Array<any> = await getCategoryChildren(category.keyname)
        if(children.length > 0) for(let child of children) await getCategories(child)
    }

    await getCategories(category)

    let products: Array<any> = []

    const getProducts = async (categories: any) => {
        for(let category of categories) {
            const categoryProducts: Array<any> = await getCategoryProducts(category.keyname)
            if(categoryProducts.length > 0) categoryProducts.forEach(product => products.push(product))
        }
    }

    await getProducts(categories)

    return products
}

router.get('/create/new', (req: any, res: any) => {
    const categories = require('../data/categories.json')
    if(!categories) {console.log('no file'); return}
    for(let category of categories) {
        Category.findOne({keyname: nameToKeyname(category.name)}, (err: any, doc: any) => {
            if(doc) console.log(category.name, 'already exists')
            else {
                Category.findOne({keyname: nameToKeyname(category.parent)}, (err: any, doc: any) => {
                    if(doc){
                        const newCategory = new Category({
                            name: category.name,
                            keyname: nameToKeyname(category.name),
                            parent: doc._id,
                            image: category.image
                        })
                        newCategory.save((err: any) => {
                            if(err) console.log(err)
                            else console.log(newCategory.name, 'created')
                        })
                    }
                })
            }
        })
    }
    res.send('done')
})

const nameToKeyname = (name: string) => {
    let keyname:string = name.toLowerCase()
    keyname = keyname.replace(/[éèêë]/g, 'e')
    keyname = keyname.replace(/[àâäã]/g, 'a')
    keyname = keyname.replace(/[îïì]/g, 'i')
    keyname = keyname.replace(/[ôöòõ]/g, 'o')
    keyname = keyname.replace(/[ûüù]/g, 'u')
    keyname = keyname.replace(/[ç]/g, 'c')
    keyname = keyname.replace(/[^a-zA-Z0-9]/g, '-')
    keyname = keyname.replace(/-+/g, '-')
    return keyname
}

module.exports = router;