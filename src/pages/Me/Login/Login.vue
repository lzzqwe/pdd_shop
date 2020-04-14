<template>
  <div class="login-container">
    <!--登陆面板内容部分-->
    <div class="login-inner">
      <!--面板头部-->
      <!-- <div class="login-header">
        <div class="login-logo">
          <img src="./images/logo1.png" alt="" width="250">
        </div>
        <div class="login-header-title">
          <a href="javascript:;" :class="{current: loginMode}" @click="dealLoginMode(true)">短信登陆</a>
          <a href="javascript:;" :class="{current: !loginMode}" @click="dealLoginMode(false)">密码登陆</a>
        </div>
      </div> -->
      <!--面板表单部分-->
      <div class="login-content">
        <form>

          <!--手机验证码登陆部分-->
          <div :class="{current: loginMode}">
            <section class="login-message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button
                v-if="!countDown"
                class="get-verification"
                :class="{'phone-right': phoneRight}"
                @click.prevent="getVerifyCode()"
              >获取验证码
              </button>
              <button
                v-else
                disabled="disabled"
                class="get-verification"
              >已发送({{countDown}}s)
              </button>
            </section>
            <section class="login-verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <!-- <section class="login-hint">
              已阅读并同意
              <a href="javascript:;">服务协议与隐私政策</a>
            </section> -->
          </div>

          <!--账号登陆部分-->
          <!-- <div :class="{current: !loginMode}">
            <section class="login-message">
              <input
                v-model="user_name"
                type="tel" maxlength="11" placeholder="用户名/手机/邮箱">
            </section>
            <section class="login-verification">
              <input
                type="password"
                maxlength="18"
                placeholder="密码"
                v-if="pwdMode"
                v-model="pwd"
                autocomplete="off"
              >
              <input v-model="pwd" type="text" maxlength="18" placeholder="密码" v-else />
              <div class="switch-show">
                <img
                  @click.prevent='dealPwdMode(false)'
                  :class="{on: pwdMode}"
                  src="./images/hide_pwd.png" alt="" width="20">
                <img
                  @click.prevent='dealPwdMode(true)'
                  :class="{on: !pwdMode}" src="./images/show_pwd.png" alt="" width="20">
              </div>
            </section>
            <section class="login-message">
              <input
                v-model="captcha"
                type="text" maxlength="11" placeholder="验证码">
              <img
                ref="captcha"
                src="http://39.98.129.225:8000/api/captcha" alt="captcha"
                class="get-verification"
                @click.prevent="getCaptcha"
              >
            </section>
          </div> -->
          <van-button class="login-submit" type="primary" size="large" @click.prevent="login">同意协议并登录</van-button>
          <van-button class="login-back" plain hairline type="primary" size="large" @click="$router.back()">返回</van-button>
          <!-- <button class="login-submit" @click.prevent="login">登陆</button> -->
          <!-- <button class="login-back" @click="$router.back()">返回</button> -->
          <section class="login-hint">
              已阅读并同意
              <a href="javascript:;">服务协议与隐私政策</a>
            </section>
        </form>
        
      </div>
    </div>
  </div>
</template>

<script>
  import jwt_decode from "jwt-decode";
  import {getPhoneCode, phoneCodeLogin, pwdLogin} from '@/api/index'
  import {mapActions} from 'vuex'
  export default {
    name: "Login",
    data() {
      return {
        loginMode: true, // 登陆方式, true验证码登陆, false 密码登陆
        phone: '', // 手机号码
        countDown: 0, // 倒计时
        pwdMode: true, // 密码显示方式. true 密文  false 明文,
        pwd: '', // 密码
        code: '', //验证码
        userInfo: {}, // 用户信息
        user_name: '', // 用户名
        captcha: '',// 图形验证码
      }
    },
    computed: {
      // 2.验证手机号是否合理
      phoneRight() {
        return /^1[3-8][0-9]{9}$/.test(this.phone)
      }
    },
    methods: {
      ...mapActions(['syncUserInfo']),
      // 1.登陆模式切换
      dealLoginMode(flag) {
        this.loginMode = flag
      },
      // 2.获取验证码
      async getVerifyCode() {
        //2.0 禁止点击
        if (this.phoneRight === false) {
          this.$toast('请输入正确的手机号码')
          return;
        }
        //  2.1.开启倒计时
        if (this.phoneRight) {
          this.countDown = 30
          //2.2设置定时器
          this.intervalId = setInterval(() => {
            this.countDown--
            if (this.countDown === 0) {
              clearInterval(this.intervalId)
            }
          }, 1000)
        }
        //  2.2获取短信验证码
        let result = await getPhoneCode(this.phone)
        console.log(result)
        //  2.3获取验证码失败
        if (result.err_code === 0) {
          // 提示信息
          this.$toast.fail(result.message)
        }
      },
      // 3. 密码的显示方式
      dealPwdMode(flag) {
        this.pwdMode = flag
      },
      // 4.获取图形验证码
      getCaptcha() {
        this.$refs.captcha.src = 'http://39.98.129.225:8000/api/captcha?time=' + new Date()
      },
      // 5.登陆
      async login() {
        // 5.1登陆模式
        if (this.loginMode) { // 验证码登陆
          // 5.2 前台校验
          if (!this.phone) {
            this.$toast("请输入手机号码")
            return
          } else if (!this.phoneRight) {
            this.$toast("请输入正确的手机号码")
            return
          } else if (!this.code) {
            this.$toast("请输入验证码")
            return
          } else if (!/^\d{6}$/gi.test(this.code)) {
            this.$toast("请输入正确的验证码")
            return
          }
          // 5.3 手机验证码登陆
          const {token,success_code} = await phoneCodeLogin(this.phone, this.code)
          console.log(token)
          localStorage.setItem('ele',token)
          //解析token
          const detoken = jwt_decode(token)
          console.log(detoken)

          if (success_code === 200) {
            this.userInfo = detoken
          } else {
            this.userInfo = {
              message: '登陆失败,手机号或验证码不正确!'
            }
          }
        } else { // 账号和密码登陆
          // 5.4前端校验
          if (!this.user_name) {
            this.$toast('请输入用户名/手机/邮箱')
            return
          } else if (!this.pwd) {
            this.$toast('请输入密码')
            return
          } else if (!this.captcha) {
            this.$toast('请输入验证码')
            return
          }
          //5.5用户名和密码
          const result = await pwdLogin(this.user_name, this.pwd, this.captcha)
          console.log(result)
          if (result.success_code === 200) {
            this.userInfo = result.message
          } else {
            this.userInfo = { message: result }
            this.getCaptcha();
            this.capture = '';
          }
        }
        // 6.后续处理
        if (!this.userInfo._id) { // 失败
          this.$toast(this.userInfo.message)
        } else { // 成功
          this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
          });
          // 6.1 同步用户数据
          this.syncUserInfo(this.userInfo)
          // 6.2 回到主界面
          this.$router.back()
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  // @import "~common/stylus/mixins.styl"
  .login-container
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    background #f5f5f5
    .login-inner
      margin-top -18px
      width 100%
      .login-header
        .login-logo
          font-size: 40px
          color mediumpurple
          text-align: center
        .login-header-title
          padding-top 40px
          padding-bottom 10px
          text-align: center
          > a
            font-size: 14px
            padding-bottom: 4px
            color #333
            &:first-child
              margin-right 40px
            &.current
              font-weight: 700;
              border-bottom: 2px solid #f44739
              color #f44739
      .login-content
        > form
          > div
            display none
            &.current
              display block
            input
              width 100%
              height 100%
              padding-left: 8px;
              box-sizing: border-box
              border: 1px solid #ddd
              border-radius 4px
              outline none
              font 400 14px Arial
              &:focus
                border 1px solide #f44739
            .login-message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background: #fff
              .get-verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size: 14px
                background transparent
                &.phone-right
                  color purple
            .login-verification
              position relative
              margin-top 16px
              height 48px
              font-size: 14px
              background: #fff
              .switch-show
                position absolute
                right 10px
                top 12px
                img
                  display none
                img.on
                  display block
          .login-submit
            display: block
            width 95%
            height 42px
            // margin-top: 30px;
            border-radius 4px
            text-align: center
            font-size: 16px
            line-height 42px
            color #fff
            margin 15px auto
          .login-back
            display block
            width 95%
            height 42px
            border-radius 4px
            background transparent
            border 1px solid #f44739
            text-align: center
            font-size: 16px
            line-height: 42px
            color #f44739
            margin 15px auto
          .login-hint
            margin-left 12px
            font-size 12px
            line-height: 20px
            color #999
            > a
              color #f44739  
</style>
