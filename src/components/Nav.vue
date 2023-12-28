<template>
  <nav>
    <router-link :to="{name: 'home'}">Home</router-link>
    <router-link v-if="!isLoggedIn" :to="{name: 'login'}">Login</router-link>
    <router-link v-if="!isLoggedIn" :to="{name: 'register'}">Register</router-link>
    <router-link v-if="isLoggedIn" :to="{name: 'profile'}">Profile</router-link>
    <a v-if="isLoggedIn" @click="handleLogout">Logout</a>
  </nav>
</template>

<script setup>
import {computed} from "vue"
import {AuthService} from "jwt-auth-custom/authService.js"
import router from "../routes/router.js"
import {isAuthenticated} from "../composable/useUser.js"

const isLoggedIn = computed(() => isAuthenticated.value)

const handleLogout = async () => {
  try {
    await AuthService.logout({
      refreshToken: localStorage.refreshToken
    })
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    isAuthenticated.value = false
    router.push({name: "login"})
  } catch (err) {
    console.log(err)
  }
}
</script>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px;
}

a {
  cursor: pointer;
}

</style>