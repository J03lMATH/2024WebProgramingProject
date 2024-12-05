import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { restAPI } from '../models/myFetch'
import { type DataEnvelope } from '../models/dataEnvelope'
import { type User } from '../models/user'

const session = reactive({
  user: JSON.parse(localStorage.getItem('user') || 'null') as User | null,
  token: localStorage.getItem('token') as string | null,
  loading: 0,
})

export const refSession = () => session

export function getSession() {
  return session
}

export function showError(err: any) {
  console.error(err)
}

export function userLoggedIn() {
  return {
    async loginByData(email: string, password: string): Promise<boolean> {
      const resp = await restAPI<DataEnvelope<{ user: User; token: string }>>(
        'users/loginByData',
        { email, password },
      )

      if (resp.isSuccess) {
        session.user = resp.data?.user || null
        session.token = resp.data?.token || null

        if (session.user == null || session.token == null) {
          return false
        }

        localStorage.setItem('user', JSON.stringify(session.user))
        localStorage.setItem('token', session.token)
        return true
      } else {
        showError(resp.message || 'Unknown error')
        return false
      }
    },
  }
}
