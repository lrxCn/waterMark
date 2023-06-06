export const promiseObj = (obj = {}, { isWrap } = {isWrap:false}) => (
    new Promise((resolve, reject) => {
      const result = {};
      const keys = Object.keys(obj);
      keys.forEach(key => {
        Promise.resolve(obj[key]).then(value=>{
          result[key] = isWrap ? {value}: value
        }).catch(error => {
            result[key] = isWrap ? {error}: error
        }).finally(() => {
            if(Object.keys(result).length === keys.length){
                resolve(result)
            }
        })
      })
    })
);
