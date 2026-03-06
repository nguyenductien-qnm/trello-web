import { Link } from "react-router-dom"
import { Avatar, Box, Button, CardActions, TextField, Typography, Zoom } from "@mui/material"
import { Card as MuiCard } from '@mui/material'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
function ChangePassword() {
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
                    <Link to="/login" style={{ textDecoration: 'none' }}>

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
                </MuiCard>
            </Zoom>
        </form>
    )
}

export default ChangePassword