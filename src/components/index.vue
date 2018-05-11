<template>
  <div class="index">
    <div class="index_bg"></div>
    <!-- 扫码 -->
    <div class="index_head" v-if="showHead">
      <div class="index_card"><img src="@/assets/icon_card.png" alt="" class="icon_card">扫描卡片获取卡号</div>
      <div><input type="password" placeholder="请输入密码" class="card_password"></div>
      <div class="card_btn" @click="submitBtn">验证</div>
    </div>
    <!-- 验证通过 -->
    <div class="index_head" v-else>
      <img src="@/assets/icon_finished.png" alt="" class="icon_finished">
      <div class="card_text">通过验证，请完善您的个人信息</div>
      <div class="card_number">卡号: 621788456468899236</div>
    </div>
    <div class="index_form">
      <div class="form_input">
        <div class="name">姓名</div>
        <input type="text" placeholder="请输入您的真实姓名">
      </div>
      <div class="form_input">
        <div class="name">身份证号</div>
        <input type="text" placeholder="请输入您的16位身份证号码">
      </div>
      <div class="form_input">
        <div class="name">手机号</div>
        <input type="number" placeholder="请输入您手机号码" class="tel">
        <span>获取验证码</span>
      </div>
      <div class="form_input">
        <div class="name">验证码</div>
        <input type="text" placeholder="请输入验证码">
      </div>
      <div class="form_btn active" @click="clickFinish">确认提交</div>
    </div>

    <!-- 弹窗 -->
    <div class="index_shadow" v-if="showShadow"></div>
    <div class="shadow_box" v-if="showCancel">
      <div>用户已实名</div>
      <div class="shadow_btn" @click="closeShadow">确定</div>
    </div>
    <div class="shadow_box" v-if="showFail">
      <div>扫描失败,请重新扫描</div>
      <div class="shadow_btn" @click="closeShadow">确定</div>
    </div>
    <div class="shadow_box" v-if="showinformation">
      <div>输入信息不能为空</div>
      <div class="shadow_btn" @click="closeShadow">确定</div>
    </div>
  </div>
</template>

<script>
  import api from '@/api/api.js'
  import '@/assets/css.css'
  import '@/assets/index.css'

  export default {
    name: 'index',
    data() {
      return {
        showHead: true,
        showShadow: false,
        showCancel: false,
        showFail: false,
        showinformation: false,
      }
    },
    methods: {
      clickFinish() {
        this.$router.push({
          path: '/finish'
        })
      },
      submitBtn() {
        this.$http.post(this.$HOST + '/openapi/v2/app/html5/validationUser', {
          "userCode": "031010601685332795",
          "passWord": "111111"
        })
          .then(function (response) {
            console.log(response);
            this.showShadow = true;
            this.showCancel = true;
            // this.showFail = true;
            // this.showinformation = true;
          })
          .catch(function (response) {
            console.log(response,"1221");
          });
      },
      closeShadow() {
        this.showShadow = false;
        this.showCancel = false;
        // this.showFail = false;
        // this.showinformation = false;
      }
    }
  }
</script>

