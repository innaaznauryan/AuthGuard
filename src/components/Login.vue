<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input type="text" v-model="credential" placeholder="Email" autocomplete="name" required>
      <input type="password" v-model="password" placeholder="Password" autocomplete="current-password" required>
      <button type="submit">Login</button>
    </form>
  </div>
  <p v-if="authError" class="error">{{ authError }}</p>
</template>

<script setup>
import {onMounted, ref} from "vue"
import {AuthService} from "jwt-auth-custom/authService.js"
import router from "../routes/router.js"
import useUser from "../modules/useUser.js"

const {authError, setAuthError, changeAuthenticatedValue} = useUser()

const credential = ref(null)
const password = ref(null)

const handleLogin = async (e) => {
  try {
    const payload = {
      credential: credential.value,
      password: password.value,
      code: "111111"
    }
    const response = await AuthService.login(payload)
    if (!response.data.ok) {
      setAuthError(response.data.msg)
    } else {
      localStorage.setItem("accessToken", response.data.accessToken)
      localStorage.setItem("refreshToken", response.data.refreshToken)
      changeAuthenticatedValue(true)
      router.push({name: "home"})
    }
  } catch (err) {
    console.log(err)
  } finally {
    e.target.reset()
  }
}

onMounted(() => {
  authError.value = null
})
</script>