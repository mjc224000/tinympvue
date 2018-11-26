import axios from 'axios';

//axios.defaults.baseURL = 'http://localhost:3001/';
axios.defaults.baseURL = 'https://bds.mjc224000.top/';
axios.defaults.withCredentials = false;

axios.interceptors.request.use(function (e) {
    let token=store('token');
    if (token) {
        e.headers['Authorization']=token;
        e.params={...e.params,token}
    }
    console.log(e);
    return e
})
export function store(key, value) {
   if(value)
    sessionStorage.setItem(key,value);

   return sessionStorage[key]
}

export default axios;
