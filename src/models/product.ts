import { Decimal128, model, ObjectId, Schema } from "mongoose"

interface IProduct{
    id: string,
    name: string,
    keyname: string,
    reference: string,
    category: ObjectId,
    prices: {base: Decimal128, plus?: Decimal128},
    images?: Array<{
        enabled: boolean,
        name: string,
        filename: string,
        filename_small: string,
    }> | Array<any>,
    main_image?: number,
    description: string,
    short_description: string,
    keywords: Array<string>
}

const imagesSchema = new Schema(
    {
        enabled: {type: Boolean},
        name: {type: String},
        filename: {type: String},
        filename_small: {type: String}
    }, 
    {_id: false, versionKey: false}
)

const productSchema = new Schema<IProduct>(
    {
        id: {type: String, unique: true},
        name: {type: String},
        keyname: {type: String},
        reference: {type: String},
        category: {type: Schema.Types.ObjectId, ref: 'category'},
        prices: {
            base: {type: Number},
            plus: {type: Number}
        },
        images: [imagesSchema],
        main_image: {type: Number},
        description: {type: String},
        short_description: {type: String},
        keywords: [{type: String}]
    }, 
    {versionKey: false}
)

const Product = model<IProduct>('product', productSchema)

export default Product