const data = {
    name: "John",
    "address.city": "Pune",
    "address.location.lat": 18.52,
    "address.location.lng": 73.85,
};

// output:=>
// {
//   name: "John",
//   address: {
//     city: "Pune",
//     location: {
//       lat: 18.52,
//       lng: 73.85
//     }
//   }
// }

function unFlat(data) {
    let obj = {};

    Object.keys(data).forEach((key) => {
        let keys = key.split(".");
        // console.log(keys);
        let curr = obj;
        keys.forEach((k, i) => {
            if (i === keys.length - 1) {
                curr[k] = data[key];
            } else {
              if(!curr[k]) curr[k] = {}
              curr = curr[k];
            }
        });
    });
    return obj;
}

// console.log(unFlat(data));

function unFlatRecurr(data) {
  let obj = {};
  Object.keys(data).forEach((key) => {
    let keys = key.split('.');
    
    let curr = obj;
    keys.forEach((k, i) => {
      if(i === keys.length-1) {
        curr[k] = data[key];
      } else {
        if(!curr[k]) curr[k] = {};
        curr = curr[k];
      }
    })
  })
  return obj;
}

console.log(unFlatRecurr(data));
