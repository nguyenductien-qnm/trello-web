import { Link } from 'react-router-dom'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import Card from '@mui/material/Card'
import trelloLogo from '~/assets/trello.svg'
import Box from '@mui/material/Box'

function ChangePassword() {
  return (
    <form>
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
            Choose a new password
          </Box>

          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                fullWidth
                label="Password..."
                type="password"
                variant="outlined"
              />
            </Box>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                fullWidth
                label="Confirm Password..."
                type="password"
                variant="outlined"
              />
            </Box>
          </Box>
          <Link to="/auth/login" style={{ textDecoration: 'none' }}>
            <CardActions sx={{ padding: '0 1em 1em 1em' }}>
              <Button
                className="interceptor-loading"
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                Continue
              </Button>
            </CardActions>
          </Link>
        </Card>
      </Zoom>
    </form>
  )
}

export default ChangePassword
