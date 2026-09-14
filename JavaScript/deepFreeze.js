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

Object.freeze(data);

data.name='Solapur';
data.place='Solapur';
delete data.name

data.address.city = 'Solapur'
console.log(data);

function deepFreeze(obj) {
    Object.keys(obj).forEach((key) => {
        if(typeof obj[key] !== 'object') {
            Object.freeze(obj);
        } else {
            deepFreeze(obj[key])
        }
    })
}

deepFreeze(data);

data.name='Solapur';
data.place='Solapur';
delete data.name

data.address.city = 'Pune'
console.log(data);
