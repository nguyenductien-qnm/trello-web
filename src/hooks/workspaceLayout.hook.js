import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchWorkspaceInfoAPI } from '~/apis/workspace.api'

export const useWorkspaceLayout = () => {
  const [workspace, setWorkspace] = useState(null)

  const { workspaceId } = useParams()

  useEffect(() => {
    const fetchWorkspaceBoards = async () => {
      const data = await fetchWorkspaceInfoAPI({ _id: workspaceId })
      setWorkspace(data)
    }
    fetchWorkspaceBoards()
  }, [workspaceId])

  return { workspace }
}
