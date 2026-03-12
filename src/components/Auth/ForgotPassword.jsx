import { Link, useNavigate } from 'react-router-dom'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Zoom from '@mui/material/Zoom'

import Card from '@mui/material/Card'

import trelloLogo from '~/assets/trello.svg'
import Box from '@mui/material/Box'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { FogotPasswordAPI } from '~/apis'

function ForgotForm() {

  const { register, handleSubmit, formState: { errors } } = useForm()

  const navigate = useNavigate()

  const submitForgotPass = (data) => {
      toast.promise(FogotPasswordAPI(data), {
        pending: 'Sending recovery link...',
        error: 'Failed to send recovery link. Please try again later.'
      })
      .then(() => {
        navigate(`/auth/check-email?email=${data.email}`)
      })
  }

  return (
    <form onSubmit={handleSubmit(submitForgotPass)}>
      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        <Card sx={{ minWidth: 380, maxWidth: 380, marginTop: '6em' }}>
          <Box
            sx={{
              margin: '1em',
              display: 'flex',
              justifyContent: 'center',
              gap: 1
            }}
          >
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <img
                src={trelloLogo}
                alt="Trello"
                style={{ width: '70%', height: '70%' }}
              />
            </Avatar>
          </Box>
          <Box
            sx={{
              marginTop: '1em',
              display: 'flex',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '1.25rem',
              color: (theme) => theme.palette.grey[500]
            }}
          >
            Can't log in?
          </Box>

          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <Typography sx={{ marginTop: '1em', fontSize: '0.8rem' }}>
              We'll send a recovery link to
            </Typography>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                fullWidth
                label="Enter email..."
                type="email"
                variant="outlined"
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                })}
              />
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
              Send recovery link
            </Button>
          </CardActions>

          <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
            <Link to="/auth/login" style={{ textDecoration: 'none' }}>
              <Typography
                component="span"
                sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}
              >
                Return to login
              </Typography>
            </Link>
          </Box>
        </Card>
      </Zoom>
    </form>
  )
}

export default ForgotForm
