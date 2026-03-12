import { Box } from '@mui/material'
import BoardList from '~/components/Board/BoardList'
import WorkspaceHeader from '~/components/Workspace/WorkspaceHeader'
import { useWorkspaceBoards } from '~/hooks/workspaceBoard.hook'

function WorkspaceBoardsPage() {
  const { ui, data } = useWorkspaceBoards()
  const { workspace } = data

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <WorkspaceHeader workspace={workspace} />
      <BoardList ui={ui.boardList} data={data.boardList} />
    </Box>
  )
}
export default WorkspaceBoardsPage
