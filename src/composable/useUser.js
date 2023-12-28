import {ref} from "vue"

export const isAuthenticated = ref(!!localStorage.accessToken)
export const authError = ref(null)

