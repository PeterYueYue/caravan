<template>
  <div class="index">
    <div class="index_bg"></div>
    <!-- 扫码 -->
    <div class="index_head" v-if="showHead">
      <div class="index_card" @click="openScan"><img src="@/assets/icon_card.png" alt="" class="icon_card">扫描卡片获取卡号
      </div>
      <div class="index_card number">绿账卡号: {{barCode}}</div>
      <div><input type="password" placeholder="请输入密码" class="card_password" v-model="information.password"></div>
      <div class="card_btn" @click="submitBtn">验证</div>
    </div>
    <!-- 验证通过 -->
    <div class="index_head" v-else>
      <img src="@/assets/icon_finished.png" alt="" class="icon_finished">
      <div class="card_text">通过验证，请完善您的个人信息</div>
      <div class="card_number">卡号: {{barCode}}</div>
    </div>
    <div v-if="showSubmit">
      <div class="index_form">
        <div class="form_input">
          <div class="name">姓名</div>
          <input type="text" placeholder="请输入您的真实姓名" v-model="information.userName">
        </div>
        <div class="form_input">
          <div class="name">身份证号</div>
          <input type="text" placeholder="请输入您的18位身份证号码" v-model="information.idCardNumber">
        </div>
        <div class="form_input">
          <div class="name">手机号</div>
          <input type="number" placeholder="请输入您手机号码" class="tel" v-model="information.telephone">
          <span @click="getCode" v-if="timeStatus">获取验证码</span>
          <span v-else>{{time}}s</span>
        </div>
        <div class="form_input">
          <div class="name">验证码</div>
          <input type="number" placeholder="请输入验证码" v-model="information.code">
        </div>
        <div class="form_btn active" @click="clickFinish">确认提交</div>
      </div>
    </div>

    <!-- 弹窗 -->
    <div class="index_shadow" v-if="showShadow"></div>
    <div class="shadow_box" v-if="showCancel">
      <div>用户已实名</div>
      <div class="shadow_btn" @click="closeShadow1">确定</div>
    </div>
    <div class="shadow_box" v-if="showFail">
      <div>账号不存在,请重新扫描</div>
      <div class="shadow_btn" @click="closeShadow1">确定</div>
    </div>
    <div class="shadow_box" v-if="showPassword">
      <div>密码为空或不正确</div>
      <div class="shadow_btn" @click="closeShadow2">确定</div>
    </div>
    <div class="shadow_box" v-if="showTel">
      <div>手机号不能为空</div>
      <div class="shadow_btn" @click="closeShadow">确定</div>
    </div>
    <div class="shadow_box" v-if="showForm1">
      <div>身份证格式不正确</div>
      <div class="shadow_btn" @click="closeShadow">确定</div>
    </div>
    <div class="shadow_box" v-if="showForm">
      <div>手机号格式不正确</div>
      <div class="shadow_btn" @click="closeShadow">确定</div>
    </div>
    <div class="shadow_box" v-if="showPhone">
      <div>手机号已经被使用</div>
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
    <div class="shadow_box" v-if="showFcodeName">
      <div>身份证号与姓名不匹配</div>
      <div class="shadow_btn" @click="closeShadow">确定</div>
    </div>
    <div class="shadow_box" v-if="showNumber">
      <div>身份证信息重复</div>
      <div class="shadow_btn" @click="closeShadow">确定</div>
    </div>
    <div class="shadow_box" v-if="showName">
      <div>姓名格式不正确</div>
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
        showSubmit: false,
        showHead: true,
        showShadow: false,
        showCancel: false,
        showFail: false,
        showPassword: false,
        showInformation: false,
        showTel: false,
        showPhone: false,
        showForm1: false,
        showForm: false,
        showCode: false,
        showFcode: false,
        showFcodeName: false,
        showNumber: false,
        showName: false,
        information: {
          userCode: '',
          password: '',
          userName: '',
          idCardNumber: '',
          telephone: '',
          code: '',
        },
        barCode: '',
        timeStatus: true,
        time: 60
      }
    },
    mounted() {
      let env = window.navigator.userAgent;
      if (env.indexOf('MicroMessenger') > -1) {
        this.$http.get(this.$HOST + '/openapi/v2/app/hm/getWeixinConf').then((res) => {
          const sign = res.data.content
          wx.config({
            // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            debug: false,
            // 必填，公众号的唯一标识
            appId: 'wxc3ef5ae7650dbc82',
            timestamp: sign.timestamp,
            nonceStr: sign.nonceStr,
            signature: sign.signature,

            // 必填，需要使用的JS接口列表
            jsApiList: ['scanQRCode']
          });
          wx.error(function (res) {
            alert("出错了：" + res.errMsg);//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
          });
        }).catch((error) => {
          console.log(error);
        });
      }
    },
    methods: {
      submitBtn() {
        this.$http.post(this.$HOST + '/openapi/v2/app/hm/validationUser', {
          "userCode": this.barCode,
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
            this.showSubmit = true;
            this.showHead = false;
          }
        }).catch((error) => {
          console.log(error);
          alert(error);
        });
      },
      getCode() {
        //手机号正则验证
        let re = /^1[34578]\d{9}$/;
        let resultTel = re.test(this.information.telephone);
        if (!resultTel) {
          this.showShadow = true;
          this.showForm = true;
          this.information.telephone = '';
          return;
        }
        this.$http.post(this.$HOST + '/openapi/v2/app/hm/sendCodeToPhone', {
          "telephone": this.information.telephone
        }).then((res) => {
          var data = res.data.content;
          if (data.status == "0") {
            this.showShadow = true;
            this.showTel = true;
          } else {
            this.timeStatus = false;
            window.timer = setInterval(() => {
              this.time -= 1;
              if (this.time < 1) {
                clearInterval(window.timer);
                this.timeStatus = true;
                this.time = 60;
              }
            }, 1000)
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      clickFinish() {
        //姓名正则
        let rs = /[\u4e00-\u9fa5]/;
        let resultName = rs.test(this.information.userName);
        if (!resultName) {
          this.showShadow = true;
          this.showName = true;
          this.information.userName = '';
          return;
        }
        //身份证验证正则
        let reg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
        let resultCard = reg.test(this.information.idCardNumber);
        if (!resultCard) {
          this.showShadow = true;
          this.showForm1 = true;
          this.information.idCardNumber = '';
          return;
        }
        this.$http.post(this.$HOST + '/openapi/v2/app/hm/realName', {
          "userCode": this.barCode,
          "userName": this.information.userName,
          "idCardNumber": this.information.idCardNumber,
          "telephone": this.information.telephone,
          "code": this.information.code,
        }).then((res) => {
          var data = res.data.content;
          if(data == null){
            this.showShadow = true;
            this.showCode = true;
          }
          //验证码发送失败或未获取
          if (data.status == "5") {
            this.showShadow = true;
            this.showCode = true;
          }
          //手机号已经被使用
          if (data.status == "4") {
            this.showShadow = true;
            this.showPhone = true;
            this.information.telephone = '';
          }
          //验证码不正确
          if (data.status == "6") {
            this.showShadow = true;
            this.showFcode = true;
          }
          //身份证号与姓名不匹配
          if (data.status == "7") {
            this.showShadow = true;
            this.showFcodeName = true;
          }
          //身份证信息重复
          if (data.status == "3") {
            this.showShadow = true;
            this.showNumber = true;
            this.information.idCardNumber = '';
          }
          //信息为空
          if (data.status == "-9") {
            this.showShadow = true;
            this.showInformation = true;
          }
          //跳转
          if (data.status == "1") {
            this.$router.push({
              path: '/finish',
              query: {
                barCode: this.barCode
              }
            })
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      closeShadow() {
        this.showShadow = false;
        this.showInformation = false;
        this.showTel = false;
        this.showCode = false;
        this.showFcode = false;
        this.showFcodeName = false;
        this.showForm1 = false;
        this.showForm = false;
        this.showNumber = false;
        this.showPhone = false;
        this.showName = false;
      },
      closeShadow1() {
        this.showShadow = false;
        this.showCancel = false;
        this.showFail = false;
        this.barCode = '';
        this.information.password = '';
      },
      closeShadow2() {
        this.showShadow = false;
        this.showPassword = false;
        this.information.password = '';
      },
      openScan() {
        let env = window.navigator.userAgent;
        if (env.indexOf('Alipay') > -1) {
          ap.scan({
            type: 'qr'
          }, (res) => {
            this.barCode = res.code;
          });
        }
        if (env.indexOf('MicroMessenger') > -1) {
          this.wxConfig();
        }
      },
      wxConfig() {
        this.scanQRCode();
      },
      scanQRCode() {
        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: (res) => {
            this.barCode = res.resultStr;// 当needResult 为 1 时，扫码返回的结果
            if(this.barCode.includes('CODE_128')){
              this.barCode = this.barCode.split(',')[1];
            }
          }
        });
      },
    }
  }
</script>

