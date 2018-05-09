<template>
  <div class="index">
    <div class="index_bg"></div>
    <!-- 扫码 -->
    <div class="index_head" v-if="showHead">
      <div class="index_card"><img src="@/assets/icon_card.png" alt="" class="icon_card">扫描卡片获取卡号</div>
      <div class="index_card number">绿账卡号：031010601502725583</div>
      <div><input type="password" placeholder="请输入密码" class="card_password" v-model="information.password"></div>
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
        <input type="text" placeholder="请输入您的真实姓名" v-model="information.userName">
      </div>
      <div class="form_input">
        <div class="name">身份证号</div>
        <input type="text" placeholder="请输入您的16位身份证号码" v-model="information.idCardNumber">
      </div>
      <div class="form_input">
        <div class="name">手机号</div>
        <input type="number" placeholder="请输入您手机号码" class="tel" v-model="information.telephone">
        <span @click="getCode">获取验证码</span>
      </div>
      <div class="form_input">
        <div class="name">验证码</div>
        <input type="number" placeholder="请输入验证码" v-model="information.code">
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
      <div>账号不存在,请重新扫描</div>
      <div class="shadow_btn" @click="closeShadow">确定</div>
    </div>
    <div class="shadow_box" v-if="showPassword">
      <div>密码为空或不正确</div>
      <div class="shadow_btn" @click="closeShadow">确定</div>
    </div>
    <div class="shadow_box" v-if="showTel">
      <div>手机号不能为空</div>
      <div class="shadow_btn" @click="closeShadow">确定</div>
    </div>
    <div class="shadow_box" v-if="showForm">
      <div>手机号或身份证格式不正确</div>
      <div class="shadow_btn" @click="closeShadow">确定</div>
    </div>
    <div class="shadow_box" v-if="showInformation">
      <div>上述信息不能为空</div>
      <div class="shadow_btn" @click="closeShadow">确定</div>
    </div>
    <div class="shadow_box" v-if="showCode">
      <div>未获取验证码</div>
      <div class="shadow_btn" @click="closeShadow">确定</div>
    </div>
    <div class="shadow_box" v-if="showFcode">
      <div>验证码不正确</div>
      <div class="shadow_btn" @click="closeShadow">确定</div>
    </div>
  </div>
</template>

<script>
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
        showPassword: false,
        showInformation: false,
        showTel: false,
        showForm: false,
        showCode: false,
        showFcode: false,
        information: {
          userCode: '',
          password: '',
          userName: '',
          idCardNumber: '',
          telephone: '',
          code: '',
        }
      }
    },
    methods: {
      submitBtn() {
        this.$http.post(this.$HOST + '/openapi/v2/app/hm/validationUser', {
          "userCode": "031010601502725583",
          // "userCode": "031010601502725583",
          "password": this.information.password,
        }).then((res) => {
          var data = res.data.content;
          //密码为空或不正确
          if (data.status == "-1") {
            this.showShadow = true;
            this.showPassword = true;
          }
          //账号不存在
          if (data.status == "0") {
            this.showShadow = true;
            this.showFail = true;
          }
          //已实名
          if (data.status == "1") {
            this.showShadow = true;
            this.showCancel = true;
          }
          //完善信息
          if (data.status == "2") {
            this.showHead = false;
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      getCode() {
        this.$http.post(this.$HOST + '/openapi/v2/app/hm/sendCodeToPhone', {
          "telephone": this.information.telephone
        }).then((res) => {
          var data = res.data.content;
          if (data.status == "0") {
            this.showShadow = true;
            this.showTel = true;
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      clickFinish() {
        this.$http.post(this.$HOST + '/openapi/v2/app/hm/realName', {
          "userCode": "031010601502725583",
          "userName": this.information.userName,
          "idCardNumber": this.information.idCardNumber,
          "telephone": this.information.telephone,
          "code": this.information.code,
        }).then((res) => {
          var data = res.data.content;
          //验证码发送失败或未获取
          if (data.status == "5") {
            this.showShadow = true;
            this.showCode = true;
          }
          //验证码不正确
          if (data.status == "6") {
            this.showShadow = true;
            this.showFcode = true;
          }
          //信息为空
          if (data.status == "-9") {
            this.showShadow = true;
            this.showInformation = true;
          }
          //跳转
          if (data.status == "1") {
            //手机身份证验证正则
            var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            let re = /^1[34578]\d{9}$/;
            let resultCard = reg.test(this.idCardNumber);
            let resultTel = re.test(this.telephone);
            if (!resultTel || !resultCard) {
              this.showShadow = true;
              this.showForm = true;
            }
            this.$router.push({
              path: '/finish'
            })
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      closeShadow() {
        this.showShadow = false;
        this.showFail = false;
        this.showCancel = false;
        this.showPassword = false;
        this.showInformation = false;
        this.showTel = false;
        this.showCode = false;
        this.showFcode = false;
        this.showForm = false;
      }
    }
  }
</script>

