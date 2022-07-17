import { model, ObjectId, Schema } from "mongoose"

interface ICategory{
    id: string,
    name: string,
    keyname: string,
    parent?: ObjectId | null
    image?: string
}

const categorySchema = new Schema<ICategory>(
    {
        id: {type: String, unique: true},
        name: {type: String},
        keyname: {type: String},
        parent: {type: Schema.Types.ObjectId, ref: 'category'},
        image: {type: String}
    },
    {versionKey: false}
)

const Category = model<ICategory>('category', categorySchema)

export default Category