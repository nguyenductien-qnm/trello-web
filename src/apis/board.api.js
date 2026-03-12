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
