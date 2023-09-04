import axios from 'axios';


const mInstance = axios.create({
    baseURL: '/',
    timeout: 300000
});

mInstance.interceptors.request.use(config => {
   return config;
});

mInstance.interceptors.response.use(config => {
   return config;
});

function post(url: string, dataObject: any) {
    return mInstance.post(url, dataObject)
        .catch(() => ({}))
}

export function shorten(longUrl: string) {
    return post('/api/shorten/', {
        url: longUrl
    })
}

export function getHostnameWhiteList() {
    return mInstance.get('/api/allowed_hostname/')
    .catch(() => ({}))
}
