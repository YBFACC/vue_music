<template>
  <div>
    <router-link to="/home" tag="a">login</router-link>
  </div>
</template>

<script>
import { login } from '@/api/axios.js'
import { setCookie } from '@/utils/cookie.js'
export default {
  mounted() {
    login('15257578262', '87057876Yu').then(res => {
      console.log(res)
      setCookie(res.token)
    })
  }
}
</script>
