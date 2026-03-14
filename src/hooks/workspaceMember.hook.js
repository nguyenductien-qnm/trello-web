import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchWorkspaceMemberAPI } from '~/apis/workspace.api'
import { useDebounceFn } from '~/customHooks/useDebounceFn'

export const useWorkspaceMember = () => {
  const [members, setMembers] = useState([])
  const [search, setSearch] = useState('')

  const { workspaceId } = useParams()

  const fetchWorkspaceMembers = useCallback(
    async (searchValue = '') => {
      if (!workspaceId) return
      const data = await fetchWorkspaceMemberAPI({
        _id: workspaceId,
        search: searchValue
      })
      setMembers(data)
    },
    [workspaceId]
  )

  const debounceFetchWorkspaceMembers = useDebounceFn(
    fetchWorkspaceMembers,
    500
  )

  useEffect(() => {
    fetchWorkspaceMembers('')
  }, [fetchWorkspaceMembers])

  const handleInputSearchChange = useCallback(
    (event) => {
      const value = event.target.value || ''
      setSearch(value)
      debounceFetchWorkspaceMembers(value)
    },
    [debounceFetchWorkspaceMembers]
  )

  return {
    members,
    search,
    handleInputSearchChange
  }
}
