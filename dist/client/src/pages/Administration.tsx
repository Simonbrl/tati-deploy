import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import CategoryController from "../controllers/category"
import ProductController from "../controllers/product"
import UserController from "../controllers/user"
import { ICategory } from "../interfaces/category"
import { IProduct } from "../interfaces/product"

const Administration = () => {
    const navigate = useNavigate()

    const [categories, setCategories] = useState<Array<ICategory>>([])

    const [name, setName] = useState<string>("")
    const [keyname, setKeyname] = useState<string>("")
    const [reference, setReference] = useState<string>("")
    const [category, setCategory] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [shortDescription, setShortDescription] = useState<string>("")
    const [image, setImage] = useState<Array<Object>>([])
    const [price, setPrice] = useState<number>(0)
    const [pricePlus, setPricePlus] = useState<number>(0)

    const [nameImageA, setNameImageA] = useState<string>("")
    const [nameImageB, setNameImageB] = useState<string>("")
    const [nameImageC, setNameImageC] = useState<string>("")
    const [nameImageD, setNameImageD] = useState<string>("")

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!name || !keyname || !reference || !description || !image || !price) return
        new ProductController().createProduct({
            name: name,
            keyname: keyname,
            reference: reference,
            category: category,
            description: description,
            shortDescription: shortDescription,
            image: image,
            price: price,
            pricePlus: pricePlus,
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    const getNameImage = (e: string) => {
        let name = e
        name = name.substring(name.lastIndexOf("/") + 1)
        name = name.substring(0, name.indexOf("."))
        return name
    }

    document.title = "Administration"
    useEffect(() => {
        new UserController().isLogged()
        .then(res => {
            if(!res) navigate("/login")
            else {
                new UserController().getUser(res.id)
                .then(res => {if(res.rank !== 1) navigate("/")})
                .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err));

        new CategoryController().getAllCategories()
        .then(res => setCategories(res))
        .catch(err => console.log(err))
    }, []);

    return (
        <div className="main">
            <div className="jumbotron">
                <div className="container">
                    <h1>Ajouter un produit</h1>
                    <form onSubmit={(e) => submit(e)}>
                        <div className="form">
                            <div className="field-group col-6">
                                <input type="text" name='name' className='text-field bg-white text-dark rounded' placeholder='Name' required onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className="field-group col-6">
                                <input type="text" name='keyname' className='text-field bg-white text-dark rounded' placeholder='Keyname' required onChange={(e) => setKeyname(e.target.value)}/>
                            </div>
                            <div className="field-group col-6">
                                <select name="category" className="text-field bg-white text-dark rounded" onChange={(e) => setCategory(e.target.value)}>
                                    {categories.map((category: ICategory, index:number) => <option key={index} value={category._id}>{category.name}</option>)}
                                </select>
                            </div>
                            <div className="field-group col-6">
                                <input type="text" name='reference' className='text-field bg-white text-dark rounded' placeholder='Référence' required onChange={(e) => setReference(e.target.value)}/>
                            </div>
                            <div style={{width:'100%'}}>
                                <div className="flex" style={{alignItems:"center"}}>
                                    <div className="field-group col-4">
                                        <input type="url" name='url[]' className='text-field bg-white text-dark rounded' placeholder='URL Image' onChange={(e) => setNameImageA(getNameImage(e.target.value))}/>
                                    </div>
                                    <div className="image_name col-4">{nameImageA}</div>
                                    <div className="col-4">
                                        <input type="checkbox" name='enabled[]' className='text-field bg-white text-dark rounded'/>
                                        <label>Active</label>
                                    </div>
                                </div>
                            </div>
                            <div className="field-group col-6">
                                <input type="number" name='price' className='text-field bg-white text-dark rounded' placeholder='Prix' required onChange={(e) => setPrice(Number(e.target.value))}/>
                            </div>
                            <div className="field-group col-6">
                                <input type="number" name='price_plus' className='text-field bg-white text-dark rounded' placeholder='Prix avec Tati Plus' onChange={(e) => setPricePlus(Number(e.target.value))}/>
                            </div>
                            <div className="field-group col-6">
                                <textarea name='description' className='text-field bg-white text-dark rounded' placeholder='Description' rows={4} onChange={(e) => setDescription(e.target.value)}></textarea>
                            </div>
                            <div className="field-group col-6">
                                <textarea name='short_description' className='text-field bg-white text-dark rounded' placeholder='Courte Description' rows={4} onChange={(e) => setShortDescription(e.target.value)}></textarea>
                            </div>
                            <div className="field-group col-full">
                                <input type="submit" className='btn btn-purple-dark text-white' value='Enregistrer'/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Administration