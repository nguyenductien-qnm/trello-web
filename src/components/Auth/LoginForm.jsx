import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import LockIcon from '@mui/icons-material/Lock'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import trelloLogo from "~/assets/trello.svg"
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import Alert from '@mui/material/Alert'
import { useForm } from 'react-hook-form'
import {
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginUserApi } from '~/redux/user/userSlice'
import { useDispatch } from 'react-redux'
import Box from '@mui/material/Box'

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm()

  let [searchParams] = useSearchParams()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const registeredEmail = searchParams.get('registeredEmail')

  const verifiedEmail = searchParams.get('verifiedEmail')

  const submitLogIn = (data) => {
    const { email, password } = data
    toast
      .promise(dispatch(loginUserApi({ email, password })), {
        pending: 'Logging in ...'
      })
      .then((res) => {
        if (!res.error) navigate('/')
      })
  }

  return (
    <form onSubmit={handleSubmit(submitLogIn)}>
      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        <MuiCard sx={{ minWidth: 380, maxWidth: 380, marginTop: '6em' }}>
          <Box
            sx={{
              margin: '1em',
              display: 'flex',
              justifyContent: 'center',
              gap: 1
            }}
          >
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <LockIcon />
            </Avatar>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <img src={trelloLogo} alt="Trello" style={{ width: '70%', height: '70%' }} />
            </Avatar>
          </Box>
          <Box
            sx={{
              marginTop: '1em',
              display: 'flex',
              justifyContent: 'center',
              color: (theme) => theme.palette.grey[500]
            }}
          >
            Welcome to Taskio
          </Box>
          <Box
            sx={{
              marginTop: '1em',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              padding: '0 1em'
            }}
          >
            {verifiedEmail && (
              <Alert
                severity="success"
                sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}
              >
                Your email&nbsp;
                <Typography
                  variant="span"
                  sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}
                >
                  {verifiedEmail}
                </Typography>
                &nbsp;has been verified.
                <br />
                Now you can login to enjoy our services! Have a good day!
              </Alert>
            )}

            {registeredEmail && (
              <Alert
                severity="info"
                sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}
              >
                An email has been sent to&nbsp;
                <Typography
                  variant="span"
                  sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}
                >
                  {registeredEmail}
                </Typography>
                <br />
                Please check and verify your account before logging in!
              </Alert>
            )}
          </Box>
          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                autoFocus
                fullWidth
                label="Enter Email..."
                type="text"
                variant="outlined"
                error={!!errors['email']}
                {...register('email', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: { value: EMAIL_RULE, message: EMAIL_RULE_MESSAGE }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName={'email'} />
            </Box>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                fullWidth
                label="Enter Password..."
                type="password"
                variant="outlined"
                error={!!errors['password']}
                {...register('password', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName={'password'} />
            </Box>
          </Box>
          <CardActions sx={{ padding: '0 1em 1em 1em' }}>
            <Button
              className="interceptor-loading"
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Login
            </Button>
          </CardActions>
          <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
            <Typography>New to Trello MERN Stack Advanced?</Typography>
            <Typography sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 1 }}>
              <Link to="/auth/reset-password" style={{ textDecoration: 'none' }}>
                <Typography
                  sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}
                >
                  Can't log in?
                </Typography>
              </Link>
              <Typography>or</Typography>
              <Link to="/auth/register" style={{ textDecoration: 'none' }}>
                <Typography
                  sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}
                >
                  Create account!
                </Typography>
              </Link>
            </Typography>
          </Box>
        </MuiCard>
      </Zoom>
    </form>
  )
}

export default LoginForm
