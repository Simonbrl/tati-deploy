import { model, ObjectId, Schema } from "mongoose"

interface IUser{
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    birthdate: Date,
    invoice_address: string,
    delivery_address: string,
    phone: string,
    rank: number,
    orders?: Array<{
        id: string,
        products: Array<{
            product: string,
            quantity: number,
        }>,
        total: number,
        date: Date,
    }>,
    date_creation: Date,
    last_login: Date,
}

const productSchema = new Schema(
    {
        product: {type: String},
        quantity: {type: Number},
    }, 
    {_id: false, versionKey: false}
)

const orderSchema = new Schema(
    {
        id: {type: String, unique: true},
        products: [productSchema],
        total: {type: Number},
        date: {type: Date},
    },
    {versionKey: false}
)

const userSchema = new Schema<IUser>(
    {
        id: {type: String,unique: true},
        firstname: {type: String},
        lastname: {type: String},
        email: {type: String},
        password: {type: String},
        birthdate: {type: Date},
        invoice_address: {type: String},
        delivery_address: {type: String},
        phone: {type: String},
        rank: {type: Number},
        orders: [orderSchema],
        date_creation: {type: Date},
        last_login: {type: Date},
    }, 
    {versionKey: false}
)

const User = model<IUser>('user', userSchema)

export default User