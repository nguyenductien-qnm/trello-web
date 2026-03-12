import { Box, Paper, Stack, Typography, Divider } from '@mui/material'
import WorkspacesOutlinedIcon from '@mui/icons-material/WorkspacesOutlined'

function WorkspaceHeader({ workspace }) {
  const title = workspace?.title || 'Untitled Workspace'
  const description = workspace?.description || 'No description'

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper'
      }}
    >
      <Stack spacing={2}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={2}
        >
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
              <WorkspacesOutlinedIcon color="primary" />
              <Typography variant="h4" fontWeight={700}>
                {title}
              </Typography>
            </Box>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 0.75, maxWidth: 720 }}
            >
              {description}
            </Typography>
          </Box>
        </Stack>

        <Divider />
      </Stack>
    </Paper>
  )
}

export default WorkspaceHeader
