import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import randomColor from 'randomcolor'
import { Link } from 'react-router-dom'
import { DEFAULT_PAGE, DEFAULT_ITEMS_PER_PAGE } from '~/utils/constants'
import Box from '@mui/material/Box'
import CreateBoardModal from './CreateBoardModal'
import ViewKanbanOutlinedIcon from '@mui/icons-material/ViewKanbanOutlined'
import { Divider } from '@mui/material'
import ArchivedBoardList from './ArchivedBoardModal'

function BoardList({ ui, data, handler }) {
  const { page } = ui
  const { boards, count } = data
  const { handleOpenCreateBoard } = handler

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <ViewKanbanOutlinedIcon fontSize="large" />
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Your boards
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {boards
          ?.filter((b) => b.status !== 'archived')
          .map((b) => (
            <Grid xs={12} sm={6} md={3} key={b._id}>
              <Card sx={{ width: '100%', borderRadius: 2 }}>
                <Box sx={{ height: '50px', backgroundColor: randomColor() }} />

                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {b.title}
                  </Typography>
                  <Box
                    component={Link}
                    to={`/boards/${b._id}`}
                    sx={{
                      mt: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      color: 'primary.main',
                      '&:hover': { color: 'primary.light' }
                    }}
                  >
                    Go to board <ArrowRightIcon fontSize="small" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}

        <Grid xs={12} sm={6} md={3}>
          <Card
            onClick={handleOpenCreateBoard}
            sx={{
              width: '100%',
              height: 138,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              borderRadius: 3,
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#e5e7eb' : '#1565c0',
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? '#1f2937' : '#e3f2fd',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? '#273449' : '#dbeafe',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#60a5fa' : '#42a5f5'
              }
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Create a new board
            </Typography>
          </Card>
        </Grid>
      </Grid>
      <CreateBoardModal ui={ui.createModal} handler={handler.createModal} />

      {count > 0 && (
        <Box
          sx={{
            my: 3,
            pr: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}
        >
          <Pagination
            size="large"
            color="secondary"
            showFirstButton
            showLastButton
            count={Math.ceil(count / DEFAULT_ITEMS_PER_PAGE)}
            page={page}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/boards${item.page === DEFAULT_PAGE ? '' : `?page=${item.page}`
                  }`}
                {...item}
              />
            )}
          />
        </Box>
      )}
      <Box sx={{ mt: 4 }}>
        <Divider sx={{marginBottom: '10px'}}/>
        <ArchivedBoardList />
      </Box>
    </>
  )
}
export default BoardList
