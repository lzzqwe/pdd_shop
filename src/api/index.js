import ajax from './ajax'

// 0.基础路径
let BASE_URL = ''
const env = process.env.NODE_ENV
if(env === 'development') {
  BASE_URL = 'http://localhost:8000'
} else if(env === 'production') {
  BASE_URL = 'http://39.98.129.225:8000'
}
//1. 请求首页轮播图
export const getHomeCasual = () => ajax(BASE_URL + '/api/homecasual')

//2. 请求首页nav
export const getHomeNav = () => ajax(BASE_URL + '/api/homenav')

//3. 获取首页商品数据
export const getHomeShopList = () => ajax(BASE_URL + '/api/homeshoplist')

//4. 推荐商品数据列表
export const getRecommendShopList = (params) => ajax(BASE_URL + '/api/recommendshoplist', params)

//5. 搜索商品数据列表
export const getSearchGoods = () => ajax(BASE_URL + '/api/searchgoods')

// 6.获取短信验证码
export const getPhoneCode = (phone) => ajax(BASE_URL + '/api/send_code', { phone })

// 7.手机验证码登陆
export const phoneCodeLogin = (phone, code) => ajax(BASE_URL + '/api/login_code', { phone, code }, 'POST')

// 8.用户名和密码登陆
export const pwdLogin = (name, pwd, captcha) => ajax(BASE_URL + '/api/login_pwd', { name, pwd, captcha }, 'POST')

// 9.获取登陆的用户信息
export const getUserInfo = (id) => ajax(BASE_URL + '/api/user_info', { id })

// 10.退出登陆
export const getLogout = () => ajax(BASE_URL + '/api/logout')

// 11.修改用户信息
export const changeUserInfo = (user_id, user_name, user_sex, user_address, user_birthday, user_phone, user_sign) => ajax(BASE_URL + '/api/change_user_msg', {
    user_id,
    user_name,
    user_sex,
    user_address,
    user_birthday,
    user_phone,
    user_sign
}, 'POST')

// 12.加入购物车
export const addGoods2Car = (user_id, goods_id, goods_name, thumb_url, price) => ajax(BASE_URL + '/api/add_shop_car', { user_id, goods_id, goods_name, thumb_url, price }, 'POST')

// 13.获取购物车数据
export const getCartGoods = (user_id) => ajax(BASE_URL + '/api/car_goods', { user_id })

// 14.删除购物车数据
export const delCartGoods = (goods_id) => ajax(BASE_URL + '/api/del_car_goods', { goods_id }, 'POST')
