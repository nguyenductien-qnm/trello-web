import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import WorkspaceHeader from '~/components/Workspace/WorkspaceHeader'
import { useWorkspaceLayout } from '~/hooks/workspaceLayout.hook'

function WorkspaceLayout() {
  const { workspace } = useWorkspaceLayout()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <WorkspaceHeader workspace={workspace} />
      <Outlet />
    </Box>
  )
}
export default WorkspaceLayout
