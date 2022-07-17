export interface ICategory{
    _id: string,
    name: string,
    keyname: string,
    image: string,
    parent?: ICategory,
    children?: Array<ICategory>
}