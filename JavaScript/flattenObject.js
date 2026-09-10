const data = {
  name: "John",
  address: {
    city: "Pune",
    location: {
      lat: 18.52,
      lng: 73.85
    }
  }
}

// Output :=>
// {
//     name: "John",
//     "address.city": "Pune",
//     "address.location.lat": 18.52,
//     "address.location.lng": 73.85,
// };

function flatten(data, str='', obj = {}) {
    Object.keys(data).forEach((key) => {
        if(typeof data[key] !== 'object') {
            obj[str+key] = data[key];
        } else {
            flatten(data[key], str + key + '.', obj);
        }
    })
    return obj;
}

console.log(flatten(data));