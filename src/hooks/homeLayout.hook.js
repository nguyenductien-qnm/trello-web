import { useEffect, useState } from 'react'
import { fetchWorkspaceByUserAPI } from '~/apis/workspace.api'

export const useHomeLayout = () => {
  const [workspaces, setWorkspaces] = useState([])

  useEffect(() => {
    const fetWorkspaces = async () => {
      const data = await fetchWorkspaceByUserAPI()
      setWorkspaces(data)
    }

    fetWorkspaces()
  }, [])

  return { workspaces }
}
