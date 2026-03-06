import { useLocation } from 'react-router-dom'
import LoginForm from '../../components/Auth/LoginForm'
import RegisterForm from '../../components/Auth/RegisterForm'
import Box from '@mui/material/Box'
<<<<<<< HEAD
=======
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import ForgotForm from './ForgotPassword'
import ChangePassword from './ChangePassword'
import CheckEmail from './CheckEmail'
>>>>>>> 4340e4c (Feat(ChangePass,CheckEmail,ForgotPassWord): add ChangePass,CheckEmail,ForgotPassword page)

function Auth() {
  const location = useLocation()
  const isLogin = location.pathname === '/login'
  const isRegister = location.pathname === '/register'
  const isResetPassword = location.pathname === '/auth/reset-password'
  const isChangePassword = location.pathname === '/auth/change-password'
  const isCheckEmail = location.pathname === '/auth/check-email'
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'flex-start',
        background: 'url("src/assets/auth/login-register-bg.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.2)'
      }}
    >
      {isLogin && <LoginForm />}
      {isRegister && <RegisterForm />}
      {isResetPassword && <ForgotForm />}
      {isChangePassword && <ChangePassword />}
      {isCheckEmail && <CheckEmail />}
    </Box>
  )
}

export default Auth
