export const debounce = (fn,timeout = 1000,_timer) => (...args)=>clearTimeout(_timer,(_timer = setTimeout(fn.bind(this,...args),timeout)))


export const throttle = (fn,timeout = 1000,_flag=true) => (...args)=>_flag && setTimeout(()=>{ _flag = true; fn.apply(this,args)},timeout) && (_flag = false)
