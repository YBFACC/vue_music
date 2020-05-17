<template>
  <div class="login">
    <form @submit.prevent>
      <p>
        <label for="phone">phone</label>
        <input
          id="phone"
          v-model.trim="Form.phone"
          type="text"
          maxlength="11"
          autofocus
          @blur="blur_phone()"
          ref="ruleForm"
          class="input"
          placeholder="手机号"
        />
      </p>
      <p>
        <label for="password">password</label>
        <input
          id="password"
          v-model.trim="Form.password"
          type="password"
          class="input"
        />
      </p>
      <button @click="handleLogin()">登录</button>
    </form>
  </div>
</template>

<script>
import AsyncValidator from 'async-validator'
export default {
  data() {
    return {
      Form: {
        phone: '',
        password: ''
      },
      rule_phone: {
        phone: {
          type: 'string',
          required: true,
          min: 11,
          max: 11
        }
      },
      rule_password: {
        password: {
          type: 'string',
          required: true,
          min: 6
        }
      }
    }
  },
  methods: {
    blur_phone() {
      const validator = new AsyncValidator(this.rule_phone)
      validator
        .validate(this.Form)
        .then(() => {})
        .catch(({ errors, fields }) => {
          this.$message.error({ message: errors[0].message, center: true })
        })
    },
    handleLogin() {
      this.$store.dispatch('LOGIN', this.Form).then(res => {
        this.$router.push({ path: '/' })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/variable"
.login
  width 100%
  height 10rem
  padding-top 70%
  form
    width 100%
    display flex
    flex-direction column
    justify-content space-around
    height 100%
    p
      display flex
      flex-direction row
      justify-content space-around
      margin 0 10%
      align-items center
      label
        color: #fff
      .input
        height 1.8rem
        background: $color-highlight-background
        color: $color-text
        font-size: $font-size-medium
        &::placeholder
          color: $color-text-d
    button
      height 2.3rem
      color: $color-text-l
      border-color $color-theme
      border-width 2px
      background-color $color-background
      border-radius 6px
      margin-left 10%
      margin-right 10%
</style>
