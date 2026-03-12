import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

export const fetchWorkspaceByUserAPI = async () => {
  const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/workspaces`)
  return response.data.metadata
}
