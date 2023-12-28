<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input type="text" v-model="credential" placeholder="Credential" autocomplete="name" required>
      <input type="password" v-model="password" placeholder="Password" autocomplete="current-password" required>
      <button type="submit">Login</button>
    </form>
  </div>
  <p class="error">{{ authError }}</p>
</template>

<script setup>
import {onMounted, ref} from "vue"
import {AuthService} from "jwt-auth-custom/authService.js"
import router from "../routes/router.js"
import {authError, isAuthenticated} from "../composable/useUser.js"

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
      authError.value = response.data.msg
    } else {
      localStorage.setItem("accessToken", response.data.accessToken)
      localStorage.setItem("refreshToken", response.data.refreshToken)
      isAuthenticated.value = true
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

<style scoped>
.error {
  color: red;
}
</style>