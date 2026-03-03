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

function BoardList({ ui, data }) {
  const { page } = ui
  const { boards, totalBoards } = data
  return (
    <Grid xs={12} sm={9}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        Your boards:
      </Typography>

      {boards?.length === 0 && (
        <Typography variant="span" sx={{ fontWeight: 'bold', mb: 3 }}>
          No result found!
        </Typography>
      )}

      {boards?.length > 0 && (
        <Grid container spacing={2}>
          {boards.map((b) => (
            <Grid xs={12} sm={6} md={2.4} key={b._id}>
              <Card sx={{ width: '280px' }}>
                <Box
                  sx={{ height: '50px', backgroundColor: randomColor() }}
                ></Box>

                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {b.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {b.description}
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
        </Grid>
      )}

      {totalBoards > 0 && (
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
            count={Math.ceil(totalBoards / DEFAULT_ITEMS_PER_PAGE)}
            page={page}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/boards${
                  item.page === DEFAULT_PAGE ? '' : `?page=${item.page}`
                }`}
                {...item}
              />
            )}
          />
        </Box>
      )}
    </Grid>
  )
}
export default BoardList
