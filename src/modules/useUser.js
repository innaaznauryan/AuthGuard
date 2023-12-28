import {reactive, toRefs} from 'vue'

const userState = reactive({
    authError: null,
    isAuthenticated: !!localStorage.accessToken,
})

const changeAuthenticatedValue = (value) => {
    userState.isAuthenticated = value
}

const setAuthError = (value) => {
    userState.authError = value
}

export default function useUser() {
    return {...toRefs(userState), setAuthError, changeAuthenticatedValue}
}