import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchWorkspaceInfoAPI, updateWorkspaceAPI } from '~/apis/workspace.api'

export const useWorkspaceLayout = () => {
  const { workspaceId } = useParams()
  const [workspace, setWorkspace] = useState(null)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchWorkspaceBoards = async () => {
      const data = await fetchWorkspaceInfoAPI({ _id: workspaceId })
      setWorkspace(data)
    }
    fetchWorkspaceBoards()
  }, [workspaceId])

  const handleOpenUpdateModal = () => setOpenUpdateModal(true)

  const handleCloseUpdateModal = () => setOpenUpdateModal(false)

  const handleUpdateWorkspace = async (data) => {
    setIsSubmitting(true)
    try {
      const updatedWorkspace = await updateWorkspaceAPI({
        _id: workspaceId,
        payload: data
      })
      setWorkspace(updatedWorkspace)
    } catch {
      throw new Error()
    } finally {
      setIsSubmitting(false)
      handleCloseUpdateModal()
    }
  }

  return {
    workspace,
    handleOpenUpdateModal,
    updateModal: {
      data: workspace,
      loading: isSubmitting,
      isOpen: openUpdateModal,
      onClose: handleCloseUpdateModal,
      onSubmit: handleUpdateWorkspace
    }
  }
}
