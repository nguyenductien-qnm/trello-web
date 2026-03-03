import Grid from '@mui/material/Unstable_Grid2'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import ListAltIcon from '@mui/icons-material/ListAlt'
import HomeIcon from '@mui/icons-material/Home'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import { Box, styled } from '@mui/material'

const SidebarItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: '12px 16px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark' ? '#33485D' : theme.palette.grey[300]
  },
  '&.active': {
    color: theme.palette.mode === 'dark' ? '#90caf9' : '#0c66e4',
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#e9f2ff'
  }
}))

function SideBar({ handler }) {
  const { handleOpenCreateBoard } = handler
  return (
    <Grid item xs={12} sm={3}>
      <Stack direction="column" spacing={1}>
        <SidebarItem className="active">
          <SpaceDashboardIcon fontSize="small" />
          Boards
        </SidebarItem>
        <SidebarItem>
          <ListAltIcon fontSize="small" />
          Templates
        </SidebarItem>
        <SidebarItem>
          <HomeIcon fontSize="small" />
          Home
        </SidebarItem>
      </Stack>
      <Divider sx={{ my: 1 }} />
      <Stack direction="column" spacing={1}>
        <SidebarItem onClick={handleOpenCreateBoard}>
          <LibraryAddIcon fontSize="small" />
          Create a new board
        </SidebarItem>
      </Stack>
    </Grid>
  )
}
export default SideBar
