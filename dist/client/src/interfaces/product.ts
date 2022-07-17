import { ICategory } from "./category";

export interface IProduct {
    id: string,
    name: string,
    keyname: string,
    reference: string,
    category: ICategory,
    prices: {base: number, plus?: number},
    images?: Array<{
        enabled: boolean,
        name: string,
        filename: string,
        filename_small: string,
    }>,
    main_image: number,
    description: string,
    short_description: string,
    keywords: Array<string>
}