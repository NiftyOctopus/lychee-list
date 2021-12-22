type Message = {key:number, text:string}

type Item = {
    id?:      number,
    i?:       number,
    name:     string,
    category: string,
    prev?:    string,
    unit:     string,
    amount:   number,
    recipe:   number,
    done?:    number
}

type ItemList = {[key:string]:Item[]}

type Recipe      = {id:number, name:string, url?:string, items?:ItemList}
type RecipeList  = {[key:number]:Recipe}
type RecipeCache = {[key:number]:ItemList}