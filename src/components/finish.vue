<template>
  <div class="index">
    <div class="index_bg"></div>
    <div class="index_head_finish">
      <img src="@/assets/icon_succeed.png" alt="" class="icon_succeed">
      <div class="finish_number">卡号: 621788456468899236</div>
    </div>
    <div class="index_form">
      <div class="finish_input">
        <div class="account">姓名</div>
        <div class="account">{{inforData.userName}}</div>
      </div>
      <div class="finish_input">
        <div class="account">身份证号</div>
        <div class="account">{{inforData.idCardNumber}}</div>
      </div>
      <div class="finish_input">
        <div class="account">手机号</div>
        <div class="account">{{inforData.telephone}}</div>
      </div>
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
        inforData: {}
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        this.$http.post(this.$HOST + '/openapi/v2/app/hm/getUserInformation', {
          "userCode": "031010601502725583"
        }).then((res) => {
          console.log(res.data.content);
          this.inforData = res.data.content
        }).catch((error) => {
          console.log(error);
        });
      },
    }
  }
</script>



