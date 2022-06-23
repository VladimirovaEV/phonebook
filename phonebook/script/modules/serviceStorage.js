const getStorage = key => JSON.parse(localStorage.getItem(key)) || [];
const removeStorage = (phone) => {
  const newdata = getStorage('data');
  let dataindex;
  newdata.forEach((data, index) => {
    if (data.phone === phone) {
      dataindex = index;
    }
  });
  newdata.splice(dataindex, 1);
  localStorage.setItem('data', JSON.stringify(newdata));
};
const setStorage = (key, obj) => {
  let newdata = getStorage(key);
  if (newdata.length === 0) {
    newdata = data;
    localStorage.setItem('data', JSON.stringify(newdata));
  }
  newdata.push(obj);
  localStorage.setItem('data', JSON.stringify(newdata));
};

export default {
  removeStorage,
  getStorage,
  setStorage,
};

