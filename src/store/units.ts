type UnitConversion = { [key:string]:number }
type UnitAdjuster   = { n?:number, d?:number }
type Unit           = { abbr:string, name:string, to:UnitConversion, adj:UnitAdjuster[] }
type UnitType       = { type:string, units:Unit[] }


export const units:UnitType[] = [
    { type: 'Weight', units: [
        {
            abbr: 'g',
            name: 'Gram',
            to:  { g: 1, oz: 0.035274, lb: 0.00220462 },
            adj: [{ n: 100 }, { n: 10 }, { n: 1 }]
        }, {
            abbr: 'oz',
            name: 'Ounce',
            to:  { g: 28.3495, oz: 1, lb: 0.0625 },
            adj: [{ n: 10 }, { n: 1 }, { d: 2 }]
        }, {
            abbr: 'lb',
            name: 'Pound',
            to:  { g: 453.592, oz: 16, lb: 1 },
            adj: [{ n: 1 }, { d: 2 }, { d: 3 }, { d: 4 }]
        },
    ]},
    { type: 'Volume', units: [
        {
            abbr: 'tsp',
            name: 'Teaspoon',
            to:  { tsp: 1, tbsp: 0.333333, c: 0.0208333, pt: 0.0104167, qt: 0.00520833, gal: 0.00130208 },
            adj: [{ n: 1 }, { d: 2 }, { d: 4 }]
        }, {
            abbr: 'tbsp',
            name: 'Tablespoon',
            to:  { tsp: 3, tbsp: 1, c: 0.0625, pt: 0.03125, qt: 0.015625, gal: 0.00390625 },
            adj: [{ n: 1 }, { d: 2 }]
        }, {
            abbr: 'c',
            name: 'Cup',
            to:  { tsp: 48, tbsp: 16, c: 1, pt: 0.5, qt: 0.25, gal: 0.0625 },
            adj: [{ n: 1 }, { d: 2 }, { d: 3 }, { d: 4 }]
        }, {
            abbr: 'pt',
            name: 'Pint',
            to:  { tsp: 96, tbsp: 32, c: 2, pt: 1, qt: 0.5, gal: 0.125 },
            adj: [{ n: 1 }, { d: 2 }]
        }, {
            abbr: 'qt',
            name: 'Quart',
            to:  { tsp: 192, tbsp: 64, c: 4, pt: 2, qt: 1, gal: 0.25 },
            adj: [{ n: 1 }, { d: 2 }]
        }, {
            abbr: 'gal',
            name: 'Gallon',
            to:  { tsp: 768, tbsp: 256, c: 16, pt: 8, qt: 4, gal: 1 },
            adj: [{ n: 1 }, { d: 2 }]
        },
    ]},
    { type: 'Other', units: [
        {
            abbr: 'ct',
            name: 'Count',
            to:  { ct: 1 },
            adj: [{ n: 10 }, { n: 1 }]
        }
    ]}
]