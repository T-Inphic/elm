import axios from 'axios'

//设置超时时间
axios.defaults.timeout = 5000
axios.defaults.baseURL = '/api'
//code状态码200判断
axios.interceptors.response.use((res) => {
  if (res.errno !== 0) {
    return res
  }
  return res
},(error) =>{
  return error
})
export default axios