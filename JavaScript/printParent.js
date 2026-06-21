const folderData = [{
  id: "1",
  name: "root",
  isFolder: true,
  items: [
    {
      id: "2",
      name: "public",
      isFolder: true,
      items: [
        {
          id: "3",
          name: "public_nested 1",
          isFolder: true,
          items: [
            {
              id: "4",
              name: "index.html",
              isFolder: false,
              items: []
            },
            {
              id: "5",
              name: "hello.html",
              isFolder: false,
              items: []
            }
          ]
        },
        {
          id: "6",
          name: "public_nested_file",
          isFolder: false,
          items: []
        }
      ]
    },
    {
      id: "7",
      name: "src",
      isFolder: true,
      items: [
        {
          id: "8",
          name: "App.js",
          isFolder: false,
          items: []
        },
        {
          id: "9",
          name: "Index.js",
          isFolder: false,
          items: []
        },
        {
          id: "10",
          name: "styles.css",
          isFolder: false,
          items: []
        }
      ]
    },
    {
      id: "11",
      name: "package.json",
      isFolder: false,
      items: []
    }
  ]
}];

// o/p → None: root root: public, src, package.json public: public_nested 1, public_nested_file public_nested 1: index.html, hello.html src: App.js, Index.js, styles.css
// parent_name : comma-separated list of immediate children

// function printDirectory(data, i) {
//   if (data?.items?.length === 0) {
//     // console.log('|'+'→'.repeat(i), data.name)
//     return;
//   }

//   if (data?.items?.length) {
//     // console.log('|'+'→'.repeat(i), data.name);
//     data.items.map((nData) => {
//       return printDirectory(nData, i + 1)
//     })
//   }

// }
// printDirectory(folderData[0], 0)

//----------------------------------------------------------------------------------------------

// let obj = {}

// function printParent(data, parentName) {
//   if(!obj[parentName]) obj[parentName] = [];
//   obj[parentName].push(data.name);

//   if(data?.items?.length === 0) {
//     // console.log('|'+'→'.repeat(i), data.name)
//     return;
//   }

//   if(data?.items?.length) {

//     // console.log('|'+'→'.repeat(i), data.name);
//     data.items.forEach((nData) => {
//       return printParent(nData, data.name)
//     })
//   }
// }

// printParent(folderData[0], 'None')
// console.log(obj)

// let str = ''
// Object.keys(obj).forEach((key) => {
//   str += `${key} : ${obj[key].toString()}`
//   // obj[key].forEach((item) => {
//   //   str += `${item} , `
//   // })

//   str += ` ;\n`
// })

// console.log(str)

//----------------------------------------------------------------------------------------------

// function printParentObj(data, parentName, obj) {
//   if (!obj[parentName]) obj[parentName] = [];
//   obj[parentName].push(data.name);

//   if (data?.items?.length === 0) {
//     return;
//   }

//   if (data?.items?.length) {
//     data.items.forEach((nData) => {
//       printParentObj(nData, data.name, obj)
//     })
//   }

//   return obj;
// }

// const result = printParentObj(folderData[0], 'None', {})

// function getStringObj(result) {
//   let str = ''
//   Object.keys(result).forEach((key) => {
//     str += `${key} : ${result[key].toString()}`
//     str += ` ;\n `
//   })
//   return str;
// }
// console.log(result)
// console.log(getStringObj(result))

//----------------------------------------------------------------------------------------------

function printParentObj(data, parentName = 'None', obj = {}) {
  if (!obj[parentName]) obj[parentName] = [];
  obj[parentName].push(data.name);

  if (!data.isFolder) {
    return obj;
  }

  if (data?.items?.length) {
    data.items.forEach((nData) => {
      printParentObj(nData, data.name, obj)
    })
  }

  return obj;
}

const result = printParentObj(folderData[0])

function getStringObj(result) {
  let str = ''
  Object.keys(result).forEach((key) => {
    str += `${key} : ${result[key].toString()}`
    str += ` ;\n `
  })
  return str;
}
console.log(result)
console.log(getStringObj(result))