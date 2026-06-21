const users = [
    { firstName: "akshay",  lastName: "saini",     age: 26 },
    { firstName: "donald",  lastName: "trump",     age: 75 },
    { firstName: "elon",    lastName: "musk",      age: 50 },
    { firstName: "deepika", lastName: "padukone",  age: 26 },
];

// list of full name
// let output = users.reduce((acc, cur) => {
//     acc.push(`${cur.firstName} ${cur.lastName}`)
//     return acc
// }, [])

// let output = users.map((cur) => `${cur.firstName} ${cur.lastName}`)

//----------------------------------------------
// {26:2, 75:1, 50:1}

// let output = users.reduce((acc, cur) => {
//     if(acc[cur.age]) {
//         acc[cur.age] += 1;
//     } else {
//         acc[cur.age] = 1;
//     }
//     return acc;
// }, {})

// --------------------------------------------------

// get the first name of all people whose age is < 30
// let output = users.filter((i) => i.age<30).map(i=> i.firstName)
let output = users.reduce((acc, curr) => {
    if(curr.age<30) {
        acc.push(curr.firstName)
    }
    return acc;
}, [])

console.log(output)