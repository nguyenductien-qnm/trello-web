import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

export const fetchBoardOverviewAPI = async (searchPath) => {
  const response = await authorizeAxiosInstance.get(
    `${API_ROOT}/v1/boards/overview${searchPath}`
  )
  return response.data.metadata
}

export const fetchBoardByWorkspaceIdAPI = async ({ workspaceId }) => {
  const response = await authorizeAxiosInstance.get(
    `${API_ROOT}/v1/boards/workspace/${workspaceId}`
  )
  return response.data.metadata
}

export const fetchBoardMemberAPI = async ({ _id, search }) => {
  const response = await authorizeAxiosInstance.get(
    `${API_ROOT}/v1/boards/members/${_id}`,
    { params: search ? { search } : {} }
  )
  return response.data.metadata
}

export const fetchUpdateBoardInfoAPI = async ({ _id, data }) => {
  const response = await authorizeAxiosInstance.put(
    `${API_ROOT}/v1/boards/${_id}`, data
  )
  return {
    message: response.data.message,
    metadata: response.data.metadata
  }
}

export const fetchBoardPermissionAPI = async () => {
  const response = await authorizeAxiosInstance.get(
    `${API_ROOT}/v1/boards/permissions`
  )
  return response.data.metadata
}

export const fetchBoardRoleAPI = async ({ _id }) => {
  const response = await authorizeAxiosInstance.get(
    `${API_ROOT}/v1/boards/roles/${_id}`
  )
  return response.data.metadata
}

export const createBoardRoleAPI = async ({ payload }) => {
  const response = await authorizeAxiosInstance.post(
    `${API_ROOT}/v1/boards/roles`,
    payload
  )
  return {
    message: response.data.message,
    metadata: response.data.metadata
  }
}

export const updateBoardRoleAPI = async ({ payload }) => {
  const response = await authorizeAxiosInstance.put(
    `${API_ROOT}/v1/boards/roles`,
    payload
  )
  return {
    message: response.data.message,
    metadata: response.data.metadata
  }
}

export const deleteBoardRoleAPI = async ({ roleId }) => {
  const response = await authorizeAxiosInstance.delete(
    `${API_ROOT}/v1/boards/roles/${roleId}`
  )
  return {
    message: response.data.message,
    metadata: response.data.metadata
  }
}

export const updateStatusBoardAPI = async ({ _id, data }) => {
  const response = await authorizeAxiosInstance.put(
    `${API_ROOT}/v1/boards/status/${_id}`, data
  )
  return {
    message: response.data.message,
    metadata: response.data.metadata
  }
}