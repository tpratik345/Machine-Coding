let arrayJson = [
    {
        'name': 'John',
        'department': 'a',
        'gender': 'M'
    },
    {
        'name': 'Bella',
        'department': 'a',
        'gender': 'F'
    },
    {
        'name': 'Jacob',
        'department': 'a',
        'gender': 'M'
    },
    {
        'name': 'Denil',
        'department': 'b',
        'gender': 'M'
    }
]

// to below array:
// op = [
// 			{
// 				"department": "a",
// 				"namesM": ["John","Jacob"],
// 				"namesF": ["Bella"]
// 			},
// 			{
// 				"department": "b",
// 				"namesM": ["Denil"],
// 				"namesF": []
// 			}
// 		]


let output = Object.values(arrayJson.reduce((acc, curr) => {
    const key = curr.department;

    let obj = {};

    if(!acc[key]) acc[key] = {department: key, namesM: [], namesF: []};
    
    if(curr.gender === 'M') {
        acc[key].namesM.push(curr.name);
    } else {
        acc[key].namesF.push(curr.name);
    }

    return acc;
}, {}))

console.log(output)