import { Link } from "react-router-dom"
import { Avatar, Box, Button, CardActions, TextField, Typography, Zoom } from "@mui/material"
import { Card as MuiCard } from '@mui/material'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
function ForgotForm() {
    return (
        <form>
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
                            <TrelloIcon />
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
                        <Typography sx={{ marginTop: '1em', fontSize: '0.8rem'}}>
                            We'll send a recovery link to
                        </Typography>
                        <Box sx={{ marginTop: '1em' }}>
                            <TextField
                                fullWidth
                                label="Enter email..."
                                type="email"
                                variant="outlined"
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
                            {/* ANH EM XỬ LÝ GỬI MAIL SAU ĐÓ DIỀUD HƯỚNG SANG PAGE /auth/check-email  */}
                            Send recovery link
                        </Button>
                    </CardActions>
                    <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
                        <Typography sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 1 }}>
                            <Link to="/login" style={{ textDecoration: 'none' }}>
                                <Typography
                                    sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}
                                >
                                    Return to login
                                </Typography>
                            </Link>
                        </Typography>
                    </Box>
                </MuiCard>
            </Zoom>
        </form>
    )
}

export default ForgotForm