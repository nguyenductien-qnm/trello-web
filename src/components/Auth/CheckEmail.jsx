import { Link } from 'react-router-dom'

import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Zoom from '@mui/material/Zoom'

import Card from '@mui/material/Card'

import trelloLogo from '~/assets/trello.svg'
import Box from '@mui/material/Box'
function CheckEmail() {
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
            Can't log in?
          </Box>
          <Box
            sx={{
              backgroundImage:
                'url(https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/check-your-email-open-letter.58fc87ea.svg)',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              height: '6rem',
              marginTop: '1em',
              marginBottom: '1em'
            }}
          />

          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <Typography variant="caption" sx={{ marginTop: '1em' }}>
              We sent a recovery link to you at
            </Typography>
            <Typography
              sx={{
                marginTop: '1em',
                fontWeight: 'bold',
                marginBottom: '0.5em'
              }}
            >
              nguyentruongphuc.25022004@gmail.com
            </Typography>
            <Typography variant="caption" sx={{ marginTop: '1rem' }}>
              If you haven't received the email, check your spam folder or
              <Link to="/auth/register" style={{ textDecoration: 'none' }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 'bold',
                    marginLeft: '0.25em'
                  }}
                >
                  Sign up
                </Typography>
              </Link>
            </Typography>
          </Box>
          <Box sx={{ marginBottom: '1.5em' }}>
            <Typography
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 1
              }}
            >
              <Link to="/auth/login" style={{ textDecoration: 'none' }}>
                <Typography
                  component="span"
                  sx={{ color: 'primary.main', fontWeight: 'bold' }}
                >
                  Return to log in
                </Typography>
              </Link>
              |
              <Link
                to="/auth/reset-password"
                style={{ textDecoration: 'none' }}
              >
                <Typography
                  component="span"
                  sx={{ color: 'primary.main', fontWeight: 'bold' }}
                >
                  Resend recovery link
                </Typography>
              </Link>
            </Typography>
          </Box>
        </Card>
      </Zoom>
    </form>
  )
}

export default CheckEmail
