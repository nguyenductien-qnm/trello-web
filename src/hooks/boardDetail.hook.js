// import { useEffect } from 'react'
// import {
//   updateBoardDetailsAPI,
//   updateColumnDetailsAPI,
//   moveCardToDifferentColumnAPI
// } from '~/apis'
// import { useDispatch, useSelector } from 'react-redux'
// import {
//   fetchBoardDetailsAPI,
//   updateCurrentActiveBoard,
//   selectCurrentActiveBoard
// } from '~/redux/activeBoard/activeBoardSlice'
// import { cloneDeep } from 'lodash'
// import { useParams } from 'react-router-dom'

// const useBoardDetail = () => {
//   const board = useSelector(selectCurrentActiveBoard)

//   const dispatch = useDispatch()

//   const { boardId } = useParams()

//   useEffect(() => {
//     dispatch(fetchBoardDetailsAPI(boardId))
//   }, [dispatch, boardId])

//   const moveColumns = (dndOrderedColumns) => {
//     const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id)
//     const newBoard = cloneDeep(board)
//     newBoard.columns = dndOrderedColumns
//     newBoard.columnOrderIds = dndOrderedColumnsIds
//     dispatch(updateCurrentActiveBoard(newBoard))

//     updateBoardDetailsAPI(newBoard._id, {
//       columnOrderIds: dndOrderedColumnsIds
//     })
//   }

//   const moveCardInTheSameColumn = (
//     dndOrderedCards,
//     dndOrderedCardIds,
//     columnId
//   ) => {
//     const newBoard = cloneDeep(board)
//     const columnToUpdate = newBoard.columns.find(
//       (column) => column._id === columnId
//     )
//     if (columnToUpdate) {
//       columnToUpdate.cards = dndOrderedCards
//       columnToUpdate.cardOrderIds = dndOrderedCardIds
//     }
//     dispatch(updateCurrentActiveBoard(newBoard))

//     updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
//   }

//   const moveCardToDifferentColumn = (
//     currentCardId,
//     prevColumnId,
//     nextColumnId,
//     dndOrderedColumns
//   ) => {
//     const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id)
//     const newBoard = cloneDeep(board)
//     newBoard.columns = dndOrderedColumns
//     newBoard.columnOrderIds = dndOrderedColumnsIds
//     dispatch(updateCurrentActiveBoard(newBoard))

//     let prevCardOrderIds = dndOrderedColumns.find(
//       (c) => c._id === prevColumnId
//     )?.cardOrderIds
//     if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []

//     moveCardToDifferentColumnAPI({
//       currentCardId,
//       prevColumnId,
//       prevCardOrderIds,
//       nextColumnId,
//       nextCardOrderIds: dndOrderedColumns.find((c) => c._id === nextColumnId)
//         ?.cardOrderIds
//     })
//   }
// }
// export default useBoardDetail
