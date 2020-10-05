const clasif = require('../../../utils/Clasif.json')


const price = [
    {
        "_id": 0,
        "name": "Todos",
        "array": []
    },
    {
        "_id": 1,
        "name": "$0 a $199",
        "array": [0, 199]
    },
    {
        "_id": 2,
        "name": "$200 a $399",
        "array": [200, 399]
    },
    {
        "_id": 3,
        "name": "$400 a $699",
        "array": [400, 699]
    },
    {
        "_id": 4,
        "name": "$700 a $999",
        "array": [700, 999]
    },
    {
        "_id": 5,
        "name": "$1000 o más",
        "array": [1000, 1500000]
    }
]


const types = []
for (let i in clasif) {
    types.push({_id:i, name:clasif[i]})
}


export {price, types}