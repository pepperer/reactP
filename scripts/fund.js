const axios = require('axios').default

const requestApi = async (url, params) => {
  return axios.get(url, {
    params: { ...params }
  }).then(res => {
    console.log("返回接口: ", res.data.data)
    return Promise.resolve(res.data.data)
  }).catch(e => {
    return Promise.resolve(e)
  })
}


const printResult = (target) => {
  for (const key in target) {
    if (target[key].length == 1) {
      console.log(key, target[key])
    }
  }

  console.log('')
  console.log('')
  console.log('')


  for (const key in target) {
    if (target[key].length > 1) {
      console.log(key, target[key])
    }
  }
}


const codes = [
  '005760', // 富国周期
  '008086',  // 华夏5g
  '519674', // 银河
  '320007', // 诺安
  '002692', // 富国科技
  '400015', //东方新能源w
  '005312', // 万家经济
]
const apis = []

codes.forEach(item => apis.push(requestApi('https://api.doctorxiong.club/v1/fund/position', { code: item })))

Promise.all([
  ...apis
]).then(res => {
  const targets = {}

  res.forEach((fund, fundIndex) => {
    fund.stockList.forEach((stock) => {
      const key = `${stock[0]}-${stock[1]}`
      const value = `${stock[2]}(${codes[fundIndex]})`

      const keys = Object.keys(targets)
      if (keys.indexOf(key) == -1) {
        targets[key] = []
      }

      targets[key].push(value)

    })
  })
  printResult(targets)
})