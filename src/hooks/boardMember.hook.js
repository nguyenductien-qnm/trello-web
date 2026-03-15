import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchBoardMemberAPI } from '~/apis/board.api'
import { useDebounceFn } from '~/customHooks/useDebounceFn'

export const useBoardMember = () => {
  const [members, setMembers] = useState([])
  const [search, setSearch] = useState('')

  const { boardId } = useParams()

  const fetchBoardMembers = useCallback(
    async (searchValue = '') => {
      if (!boardId) return
      const data = await fetchBoardMemberAPI({
        _id: boardId,
        search: searchValue
      })
      
      setMembers(data)
    },
    [boardId]
  )

  const debouncefetchBoardMembers = useDebounceFn(
    fetchBoardMembers,
    500
  )

  useEffect(() => {
    fetchBoardMembers('')
  }, [fetchBoardMembers])

  const handleInputSearchChange = useCallback(
    (event) => {
      const value = event.target.value || ''
      setSearch(value)
      debouncefetchBoardMembers(value)
    },
    [debouncefetchBoardMembers]
  )

  return {
    members,
    search,
    handleInputSearchChange
  }
}
