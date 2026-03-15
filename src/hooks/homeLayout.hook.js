import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchWorkspacesAPI,
  createWorkspaceAPI
} from '~/redux/workspace/workspacesSlice'

export const useHomeLayout = () => {
  const dispatch = useDispatch()
  const workspaces = useSelector((state) => state.workspaces)
  const [isCreating, setIsCreating] = useState(false)
  const [isOpenCreateWorkspaceModal, setIsOpenCreateWorkspaceModal] =
    useState(false)

  useEffect(() => {
    dispatch(fetchWorkspacesAPI())
  }, [dispatch])

  const handleOpenCreateWorkspaceModal = () =>
    setIsOpenCreateWorkspaceModal(true)

  const handleCloseCreateWorkspaceModal = () =>
    setIsOpenCreateWorkspaceModal(false)

  const handleCreateWorkspace = async (data) => {
    setIsCreating(true)
    try {
      dispatch(createWorkspaceAPI({ payload: data }))
    } catch {
      throw new Error()
    } finally {
      setIsCreating(false)
      handleCloseCreateWorkspaceModal()
    }
  }

  return {
    workspaces,
    handleOpenCreateWorkspaceModal,
    createModal: {
      isOpen: isOpenCreateWorkspaceModal,
      loading: isCreating,
      onClose: handleCloseCreateWorkspaceModal,
      onSubmit: handleCreateWorkspace
    }
  }
}
