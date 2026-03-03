import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchBoardsAPI } from '~/apis'

const useBoardList = () => {
  const [boards, setBoards] = useState(null)
  const [totalBoards, setTotalBoards] = useState(null)
  const [isOpenCreateBoard, setIsOpenCreateBoard] = useState(false)
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const page = parseInt(query.get('page') || '1', 10)

  const updateStateData = (res) => {
    setBoards(res.boards || [])
    setTotalBoards(res.totalBoards || 0)
  }

  useEffect(() => {
    fetchBoardsAPI(location.search).then(updateStateData)
  }, [location.search])

  const handleOpenCreateBoard = () => setIsOpenCreateBoard(true)
  const handleCloseCreateBoard = () => setIsOpenCreateBoard(false)

  return {
    ui: {
      board: {
        page
      },
      createModal: {
        isOpen: isOpenCreateBoard
      }
    },
    data: {
      board: { boards, totalBoards }
    },
    handler: {
      sideBar: {
        handleOpenCreateBoard
      },
      createModal: {
        handleClose: handleCloseCreateBoard
      }
    }
  }
}
export default useBoardList
