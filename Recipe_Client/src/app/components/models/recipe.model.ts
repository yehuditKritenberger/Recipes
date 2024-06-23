export class Recipe {
    id!: number
    name!: string
    categoryId!: number
    preparationTime!: number
    level!: number
    date!: Date
    ingredients!: string[]
    instructions!: string[]
    userId!: number
    img!: string
}
