import { ApiResponse } from '../../server/src/types'

export type MethodType = 'GET' | 'POST' | 'DELETE' | 'PATCH'

export const fetchWrapper = async (
  method: MethodType,
  url: string,
  body?: {
    [key: string]: string
  }
): Promise<ApiResponse> => {
  try {
    const baseUrl = 'http://localhost:3000/api'
    const response = await fetch(baseUrl + url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const res = await response.json()
    return res
  } catch (err) {
    return err
  }
}
