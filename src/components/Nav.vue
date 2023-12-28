<template>
  <nav>
    <router-link v-if="isAuthenticated" :to="{name: 'home'}">Home</router-link>
    <router-link v-if="!isAuthenticated" :to="{name: 'login'}">Login</router-link>
    <router-link v-if="!isAuthenticated" :to="{name: 'register'}">Register</router-link>
    <router-link v-if="isAuthenticated" :to="{name: 'profile'}">Profile</router-link>
    <a v-if="isAuthenticated" @click="handleLogout">Logout</a>
  </nav>
</template>

<script setup>
import {AuthService} from "jwt-auth-custom/authService.js"
import router from "../routes/router.js"
import useUser from "../modules/useUser.js"

const {isAuthenticated, changeAuthenticatedValue} = useUser()

const handleLogout = async () => {
  try {
    await AuthService.logout({
      refreshToken: localStorage.refreshToken
    })
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    changeAuthenticatedValue(false)
    router.push({name: "login"})
  } catch (err) {
    console.log(err)
  }
}
</script>