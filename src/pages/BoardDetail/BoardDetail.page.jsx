import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from '../../components/BoardDetail/BoardBar/BoardBar'
import BoardContent from '../../components/BoardDetail/BoardContent/BoardContent'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
import useBoardDetail from '~/hooks/boardDetail.hook'
import CardDetailModal from '~/components/BoardDetail/BoardContent/CardDetailModal/_CardDetailModal'

function BoardDetail() {
  const {
    board,
    moveColumns,
    moveCardInTheSameColumn,
    moveCardToDifferentColumn
  } = useBoardDetail()

  return (
    <>
      {!board && <PageLoadingSpinner caption="Loading Board..." />}
      {board && (
        <Container
          disableGutters
          maxWidth={false}
          sx={{
            height: '100vh',
            width: '100%',
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'
          }}
        >
          <AppBar />
          <CardDetailModal />
          <BoardBar board={board} />
          <BoardContent
            board={board}
            moveColumns={moveColumns}
            moveCardInTheSameColumn={moveCardInTheSameColumn}
            moveCardToDifferentColumn={moveCardToDifferentColumn}
          />
        </Container>
      )}
    </>
  )
}

export default BoardDetail
