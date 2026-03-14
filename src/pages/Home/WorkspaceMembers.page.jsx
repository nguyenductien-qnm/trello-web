import { Box, Button, TextField, Typography } from '@mui/material'
import { useWorkspaceMember } from '~/hooks/workspaceMember.hook'
import Diversity2OutlinedIcon from '@mui/icons-material/Diversity2Outlined'
import WorkspaceMemberTable from '~/components/Workspace/WorkspaceMemberTable'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
function WorkspaceMemberPage() {
  const { members, search, handleInputSearchChange } = useWorkspaceMember()

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          mb: 1,
          flexWrap: 'wrap'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Diversity2OutlinedIcon fontSize="large" />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Workspace members
          </Typography>
        </Box>

        <Button
          startIcon={<PersonAddIcon />}
          variant="contained"
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 2,
            px: 2,
            py: 1,
            minHeight: 42,
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? '#90caf9' : '#1976d2',
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#0f172a' : '#fff',
            '&:hover': {
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? '#64b5f6' : '#1565c0'
            }
          }}
        >
          Invite Workspace Members
        </Button>
      </Box>
      <TextField
        placeholder="Filter by name"
        value={search}
        onChange={handleInputSearchChange}
        sx={{
          minWidth: 260
        }}
      />
      <WorkspaceMemberTable members={members} />
    </>
  )
}

export default WorkspaceMemberPage
