import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import Tooltip from '@mui/material/Tooltip'
import BoardUserGroup from './BoardUserGroup'
import InviteBoardUser from './InviteBoardUser'
import Box from '@mui/material/Box'
import { alpha } from '@mui/material/styles'
import BoardModal from '../BoardModal/BoardModal'
import { Button, IconButton } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
const MENU_STYLES = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar({ board, boardModal }) {
  const { handleOpen } = boardModal;
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        px: 2,
        overflowX: 'auto',

        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? alpha('#000000', 0.3)
            : alpha('#000000', 0.3),

        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={{ ...MENU_STYLES, fontSize: '22px', fontWeight: 600 }}
          label={board?.title}
          clickable
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <InviteBoardUser boardId={board._id} />
        <IconButton onClick={handleOpen} sx={{ fontSize: '20px', alignContent: 'center', color:'white' }}>
          <MoreHorizIcon />
        </IconButton>
        <BoardModal boardModal={boardModal} />
        <BoardUserGroup boardUsers={board.FE_allUsers} />
      </Box>
    </Box>
  )
}

export default BoardBar
