import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

export const fetchWorkspaceByUserAPI = async () => {
  const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/workspaces`)
  return response.data.metadata
}

export const fetchWorkspaceInfoAPI = async ({ _id }) => {
  const response = await authorizeAxiosInstance.get(
    `${API_ROOT}/v1/workspaces/${_id}`
  )
  return response.data.metadata
}

export const fetchWorkspaceMemberAPI = async ({ _id, search }) => {
  const response = await authorizeAxiosInstance.get(
    `${API_ROOT}/v1/workspaces/members/${_id}`,
    { params: search ? { search } : {} }
  )
  return response.data.metadata
}

export const fetchWorkspacePermissionAPI = async () => {
  const response = await authorizeAxiosInstance.get(
    `${API_ROOT}/v1/workspaces/permissions`
  )
  return response.data.metadata
}

export const fetchWorkspaceRoleAPI = async ({ _id }) => {
  const response = await authorizeAxiosInstance.get(
    `${API_ROOT}/v1/workspaces/roles/${_id}`
  )
  return response.data.metadata
}

export const updateWorkspaceAPI = async ({ _id, payload }) => {
  const response = await authorizeAxiosInstance.post(
    `${API_ROOT}/v1/workspaces/${_id}`,
    payload
  )
  return response.data.metadata
}

export const createWorkspaceRoleAPI = async ({ payload }) => {
  const response = await authorizeAxiosInstance.post(
    `${API_ROOT}/v1/workspaces/roles`,
    payload
  )
  return response.data.metadata
}

export const updateWorkspaceRoleAPI = async ({ payload }) => {
  const response = await authorizeAxiosInstance.put(
    `${API_ROOT}/v1/workspaces/roles`,
    payload
  )
  return response.data.metadata
}

export const deleteWorkspaceRoleAPI = async ({ roleId }) => {
  const response = await authorizeAxiosInstance.delete(
    `${API_ROOT}/v1/workspaces/roles/${roleId}`
  )
  return response.data.metadata
}

export const deleteWorkspaceAPI = async ({ _id }) => {
  const response = await authorizeAxiosInstance.delete(
    `${API_ROOT}/v1/workspaces/${_id}`
  )
  return response.data.metadata
}
