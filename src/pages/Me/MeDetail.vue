<template>
  <div class="user-detail">
    <div class="user-detail-top">基本信息</div>
    <div class="user-detail-group">
      <div class="user-icon">
        <span>头像</span>
        <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1289391092,1816265651&fm=26&gp=0.jpg" alt="">
      </div>
      <div class="user-item">
        <span>手机</span>
        <span v-if="userInfo.phone">{{userInfo.phone | phoneFormat}}</span>
        <span v-else><input type="tel" maxlength="11" v-model="user_phone" placeholder="绑定手机号码"></span>
      </div>
      <div class="user-item">
        <span>昵称</span>
        <span><input type="text" v-model="user_name"></span>
      </div>
      <div class="user-item" @click="sheetVisible=true">
        <span>性别</span>
        <span>{{user_sex}}</span>
      </div>
      <div class="user-item" @click="isFlag=true">
        <span>常住地</span>
        <span><input type="text" v-model="user_address"></span>
      </div>
      <div class="user-item" @click="show=true">
        <span>生日</span>
        <span>{{user_birthday}}</span>
      </div>
      <div class="user-item">
        <span>个性签名</span>
        <span><input type="text" v-model="user_sign"></span>
      </div>
      <button @click="saveUserInfo">修改</button>
    </div>
    <van-action-sheet v-model="sheetVisible" :actions="actions" @select="onSelect" />
    <van-popup position="bottom" v-model="show">
      <van-datetime-picker
       v-model="currentDate"
       type="datetime"
       :min-date="minDate"
       :max-date="maxDate"
       @confirm='confirmDate'
       />
    </van-popup>
    <van-popup position="bottom" v-model="isFlag">
      <van-area 
      :area-list="this.areaList"
       value="110101"
       @confirm='confirmAddress'
      />
    </van-popup>
  </div>
</template>

<script>
  import moment from 'moment'
  import areaList from 'common/js/area.js'
  import {mapState} from 'vuex'
  import {changeUserInfo} from '@/api/index'
  // import {Toast} from 'mint-ui'

  export default {
    name: "MeDetail",
    data() {
      return {
        user_sign: '',
        user_address: '',
        user_name: '',
        user_sex: '',
        user_phone: '',
        user_birthday: '',
        // 性别
        sheetVisible: false,
        isFlag:false,
        actions: [
          {name: '男' },
          {name: '女'}],
        show:false,
        minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date()
      }
    },
    methods: {
      confirmAddress(data) {
        console.log(data)
        let str = `${data[0].name}/${data[1].name}/${data[2].name}`
       this.user_address = str
       this.isFlag = false
      },
      onSelect(item){
        // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.sheetVisible = false;
       this.user_sex = item.name;
      },
      confirmDate(value) {
        this.user_birthday = moment(value).format('YYYY/MM/DD');
        this.show = false
      },
      selectSex(props) {
        this.user_sex = props.name;
      },
      selectDate() {
        this.$refs.picker.open();
      },
      // 修改用户信息
      async saveUserInfo() {
        // 请求接口
        let result = await changeUserInfo(this.userInfo._id, this.user_name, this.user_sex, this.user_address, this.user_birthday, this.userInfo.user_phone, this.user_sign)
        // console.log(result)
        this.$toast(result.message);
        if (result.success_code === 200) {
          // 更新本地数据
          this.$store.dispatch('getUserInfo',this.userInfo._id)
          // Back Main
          setTimeout(() => {
            this.$router.replace('/mine')
          },2000)
        }
      }
    },
    computed: {
      ...mapState(['userInfo']),
      phoneRight(user_phone) {
        return /^1[3-8][0-9]{9}$/.test(user_phone)
      }
    },
    created() {
      this.areaList=areaList
      this.user_sign = this.userInfo.user_sign || ''
      this.user_address = this.userInfo.user_address || ''
      this.user_name = this.userInfo.user_name || ''
      this.user_phone = this.userInfo.user_phone || ''
      this.user_birthday = this.userInfo.user_birthday || ''
      this.user_sex = this.userInfo.user_sex || ''
    },
    filters:
      {
      phoneFormat(phone = '18888888888') {
        // 1.转换成数组
        let phoneArr = [...phone]
        //2.遍历
        let str = ''
        phoneArr.forEach((item, index) => {
          if (index >= 3 && index <= 6) {
            str += '*'
          } else {
            str += item;
          }
        })
        return str;
      }
    },
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .user-detail
    width 100%
    height 100%
    font-size 16px
    .user-detail-top
      width 100%
      height 60px
      line-height 60px
      padding-left 10px
      font-weight bold
    .user-detail-group
      .user-icon
        height 60px
        padding 0 10px
        background-color #fff
        border-bottom: 1px solid #e0e0e0
        display flex
        justify-content space-between
        align-items center
        img
          width 50px
          height 50px
          border-radius 50%
      .user-item
        height 40px
        padding 0 10px
        background-color #fff
        border-bottom: 1px solid #e0e0e0
        display flex
        justify-content space-between
        align-items center
        input
          border none
          outline none
          text-align right
      button
        width 90%
        height 40px
        line-height 40px
        background-color #e9232c
        text-align center
        margin 20px 5%
        border none
        font-size 16px
        color #fff
        border-radius 10px
    .right-title-color
      color #999
      font-size 14px
</style>
