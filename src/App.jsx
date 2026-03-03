import BoardPage from './pages/Board/Board.page'
import { Route, Routes, Navigate, Outlet } from 'react-router-dom'
import NotFound from './pages/404/NotFound'
import Auth from './pages/Auth/Auth'
import AccountVerification from './pages/Auth/AccountVerification'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from './redux/user/userSlice'
import Settings from './pages/Settings/Settings'
import BoardDetail from './pages/BoardDetail/BoardDetail.page'
/**
 * Giải pháp Clean Code trong việc xác định các route nào cần đăng nhập tài khoản xong thì mới cho truy cập
 * Sử dụng <Outlet /> của react-router-dom để hiển thị các Child Route (xem cách sử dụng trong App() bên dưới)
 * https://reactrouter.com/en/main/components/outlet
 * Một bài hướng dẫn khá đầy đủ:
 * https://www.robinwieruch.de/react-router-private-routes/
 */
const ProtectedRoute = ({ user }) => {
  if (!user) return <Navigate to="/login" replace={true} />
  return <Outlet />
}

const UnauthorizedRoute = ({ user }) => {
  if (user) return <Navigate to="/" replace={true} />
  return <Outlet />
}

function App() {
  const currentUser = useSelector(selectCurrentUser)
  return (
    <Routes>
      <Route
        path="/"
        element={
          // replace = true : ví dụ truy cập route '/' thì sẽ nhảy qua trang
          // boards/6643599343c42cd4fa6c7210 và không lưu lại lịch sử trang '/'
          <Navigate to="boards" replace={true} />
        }
      />

      {/* Protected Routes (Hiểu đơn giản trong dự án của chúng ta là những route chỉ cho truy cập sau khi đã login) */}
      <Route element={<ProtectedRoute user={currentUser} />}>
        {/* <Outlet /> của react-router-dom sẽ chạy vào các child route trong này */}

        {/* Board details  */}
        <Route path="/boards/:boardId" element={<BoardDetail />} />

        {/* Board list  */}
        <Route path="/boards" element={<BoardPage />} />

        {/* user setting */}
        <Route path="/settings/account" element={<Settings />} />
        <Route path="/settings/security" element={<Settings />} />
      </Route>

      <Route element={<UnauthorizedRoute user={currentUser} />}>
        {/* Authentication  */}
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/account/verification" element={<AccountVerification />} />
      </Route>

      {/* 404 not found  */}
      <Route
        path="*"
        element={<Navigate to="/404-not-found" replace={true} />}
      />
      <Route path="/404-not-found" element={<NotFound />} />
    </Routes>
  )
}

export default App
