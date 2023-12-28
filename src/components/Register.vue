<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <input type="text" v-model="fullName" placeholder="Full Name" autocomplete="name" required>
      <input type="text" v-model="email" placeholder="Email" autocomplete="email" required>
      <input type="text" v-model="phone" placeholder="Phone" autocomplete="phone" required>
      <input type="password" v-model="password" placeholder="Password" autocomplete="current-password" required>
      <button type="submit">Register</button>
    </form>
  </div>
  <p v-if="authError" class="error">{{ authError }}</p>
</template>

<script setup>
import {onMounted, ref} from "vue"
import {AuthService} from "jwt-auth-custom/authService.js"
import router from "../routes/router.js"
import useUser from "../modules/useUser.js"

const {authError, setAuthError} = useUser()

const fullName = ref("")
const email = ref("")
const phone = ref("")
const password = ref("")

const handleRegister = async (e) => {
  try {
    await AuthService.sendConfirmCode({
      email: email.value,
      phone: phone.value,
      use_call: true
    })
    const response = await AuthService.register({
      email: email.value,
      emailConfirmCode: "111111",
      phone: phone.value,
      phoneConfirmCode: "111111",
      password: password.value,
      userinfo: {
        property1: {fullName: fullName.value}
      }
    })
    if (!response.data.ok) {
      setAuthError(response.data.msg)
    } else {
      router.push({name: "login"})
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