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
