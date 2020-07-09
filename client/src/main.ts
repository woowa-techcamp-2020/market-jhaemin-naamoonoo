import { ApiResponse } from '../../server/src/types'
import { UserInfo } from '@@/../server/src/modules/database/schema/user'

declare global {
  interface Window {
    daum: any
  }
}
export type MethodType = 'GET' | 'POST' | 'DELETE' | 'PATCH'

export const fetchWrapper = async (
  method: MethodType,
  url: string,
  body?: UserInfo
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

export const onSubmitHandler = async (e: Event, url: string) => {
  e.preventDefault()

  const inputs = Array.from(document.querySelectorAll('.input-text'))
  const body = inputs.reduce((acc, input: HTMLInputElement) => {
    const inputText = input.value
    const key = input.name

    if (key.includes('Address') || key.includes('postal')) {
      if (!acc.address) {
        acc.address = {}
      }
      acc.address[key] = inputText
      return acc
    }

    if (inputText) {
      acc[input.name] = inputText
    }
    return acc
  }, {} as UserInfo)

  const { err: errors } = await fetchWrapper('POST', url, body)
  if (!errors) {
    window.location.href = '/welcome'
    return
  }

  for (const key in errors) {
    const input = document.querySelector(`.input-text[name=${key}]`)
    const wrapper = input.parentElement
    wrapper.classList.remove('valid-input')
    wrapper.classList.add('invalid-input')
    wrapper.querySelector('.msg-text').innerHTML = errors[key]
  }
}
