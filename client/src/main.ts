export type MethodType = 'GET' | 'POST' | 'DELETE' | 'PATCH'

export type FetchResponse = {
  res: boolean
  err?: string
}

export const fetchWrapper = async (
  method: MethodType,
  url: string,
  body?: {
    [key: string]: string
  }
): Promise<FetchResponse> => {
  try {
    const baseUrl = 'http://localhost:3000/api'
    const response = await fetch(baseUrl + url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const json = await response.json()
    console.log(json)
    return { res: true }
  } catch (err) {
    return { res: false, err }
  }
}
