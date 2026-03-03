import AppBar from '~/components/AppBar/AppBar'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2'
import SideBar from '~/components/Board/SideBar'
import BoardList from '~/components/Board/BoardList'
import useBoardList from '~/hooks/board.hook'
import CreateBoardModal from '~/components/Board/CreateBoardModal'
import Box from '@mui/material/Box'

function BoardPage() {
  const { ui, data, handler } = useBoardList()
  const { boards } = data.board

  return (
    <>
      {!boards && <PageLoadingSpinner caption="Loading Boards..." />}
      {boards && (
        <Container disableGutters maxWidth={false}>
          <AppBar />
          <Box sx={{ paddingX: 2, my: 4 }}>
            <Grid container spacing={2}>
              <SideBar ui={ui.sideBar} handler={handler.sideBar} />
              <BoardList ui={ui.board} data={data.board} />
            </Grid>
          </Box>
          <CreateBoardModal ui={ui.createModal} handler={handler.createModal} />
        </Container>
      )}
    </>
  )
}

export default BoardPage
