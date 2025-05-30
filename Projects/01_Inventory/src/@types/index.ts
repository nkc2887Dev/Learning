export interface IBaseEntity {
    _id?: string
    createdAt?: Date
    updatedAt?: Date
  }
  
  export interface IRawPart extends IBaseEntity {
    name: string
    description: string
    price: number
    stockQuantity: number
    supplier: string
    partNumber: string
    category: string
    weight?: number
    dimensions?: {
      length: number
      width: number
      height: number
    }
  }
  
  export interface IAssembledPart extends IBaseEntity {
    name: string
    description: string
    price: number
    stockQuantity: number
    components: IComponent[]
    assemblyInstructions: string
    assemblyTime: number // in minutes
    skillLevel: "beginner" | "intermediate" | "advanced"
  }
  
  export interface IComponent {
    partId: string
    partType: string
    quantity: number
    isOptional?: boolean
  }
  
  export interface IApiResponse<T = any> {
    success: boolean
    data?: T
    message?: string
    errors?: string[]
  }
  
  export interface IPaginationQuery {
    page?: number
    limit?: number
    sortBy?: string
    sortOrder?: "asc" | "desc"
  }
  
  export interface IPartQuery extends IPaginationQuery {
    search?: string
    category?: string
    minPrice?: number | undefined
    maxPrice?: number | undefined
    inStock?: boolean | undefined
  }
  