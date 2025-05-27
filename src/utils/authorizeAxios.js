import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatters'
import { refreshTokenAPI } from '~/apis'
import { logoutUserApi } from '~/redux/user/userSlice'

let axiosReduxStore

export const injectStore = (mainStore) => {
  axiosReduxStore = mainStore
}

// khởi tạo đối tượng axios để custom
let authorizeAxiosInstance = axios.create()

// thời gian tối đa 1 request là 10 phút
authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10

// withCredentials sẽ cho phép axios tự động gữi cookie cho mỗi request bên BE
// chúng ta sẽ lưu dữ JWT token (refresh và access) vào trong httpOnly Cookie
// từ BE trả về của trình duyệt

authorizeAxiosInstance.defaults.withCredentials = true

// Add a request interceptor
authorizeAxiosInstance.interceptors.request.use(
  (config) => {
    // chặn spam click
    interceptorLoadingElements(true)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// để khi gọi API refreshToken xong thì retry lại các API lỗi trước đó
let refreshTokenPromise = null

// Add a response interceptor
authorizeAxiosInstance.interceptors.response.use(
  (response) => {
    interceptorLoadingElements(false)
    return response
  },
  (error) => {
    // dùng toast để hiện thị tất cả mã lỗi , trừ mã lỗi 410 -GONE phục vụ việc tự động
    // refresh token
    interceptorLoadingElements(false)

    // xử lí refreshToken tự động
    // trường hợp 1 : nếu lỗi 401 thì cho logout lun
    if (error.response?.status === 401) {
      axiosReduxStore.dispatch(logoutUserApi(false))
      return Promise.reject(error)
    }
    // trường hợp 2 :nếu 410 thì gọi refreshToken lấy lại accessToken mới
    const originalRequest = error.config
    if (error.response?.status === 410 && !originalRequest._retry) {
      // cách khác if (error.response?.status === 410 && originalRequest) // không cần _retry
      // gán 1 giá trị originalRequest._retry = true trong thời gian chờ đảm bảo refreshToken gọi 1 lần tại
      // 1 thời điểm
      originalRequest._retry = true
      // kiểm tra nếu ch có refreshTokenPromise thì gọi api refreshToken đồng thời gán vào cho cái
      // refreshTokenPromise
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenAPI()
          .then((data) => {
            // đối với TH cần lưu accessToken và localStorage hoặc đâu đó thì code thêm ở đây
            // hiện tại thì không cần vì accessToken nằm trong httpOnlyCookie (xử lí ở BE) sau khi
            // refreshToken thành công
            return data?.accessToken
          })
          // .catch((_error) => {
          .catch(() => {
            // nếu nhận bất kì lỗi nào khác từ refreshToken thì cho đăng xuất lun
            axiosReduxStore.dispatch(logoutUserApi(false))
            return Promise.reject(error)
            // return Promise.reject(_error)
          })
          .finally(() => {
            // dùng API refreshToken thành công hay lỗi thì vẫn lun gán lại refreshTokenPromise = null
            refreshTokenPromise = null
          })
      }

      // cuối cùng mới return refreshTokenPromise trong trường hợp success
      return refreshTokenPromise.then(() => {
        //return lại axiosInstance của chúng ta kết hợp originalRequest để gọi lại các API bị lỗi
        return authorizeAxiosInstance(originalRequest)
      })
    }

    if (error.response?.status !== 410) {
      error.response?.data?.message
        ? toast.error(error.response.data.message)
        : toast.error(error.message)
    }
    return Promise.reject(error)
  }
)

export default authorizeAxiosInstance
