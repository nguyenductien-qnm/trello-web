import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchBoardByWorkspaceIdAPI } from '~/apis/board.api'

export const useWorkspaceBoards = () => {
  const [workspace, setWorkspace] = useState(null)
  const [boards, setBoards] = useState([])
  const [count, setCount] = useState(0)

  const { workspaceId } = useParams()

  useEffect(() => {
    const fetchWorkspaceBoards = async () => {
      const data = await fetchBoardByWorkspaceIdAPI({ workspaceId })
      setWorkspace(data.workspace)
      setBoards(data.boards)
      setCount(data.count)
    }
    fetchWorkspaceBoards()
  }, [workspaceId])

  return {
    ui: { boardList: { page: 1 } },
    data: { workspace, boardList: { boards, count } }
  }
}
