// 定义公共类型
export interface ITableIistItem {
    id?: number
    name: string
    subtitle: string
    price: number    
    status: number
}

export interface IProductProps extends Partial<ITableIistItem> {
    parentCategoryId: number
    categoryId: number
    stock: number
    imageHost?: string
    mainImage?: string
    detail: any    
}

