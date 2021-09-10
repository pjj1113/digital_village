<template>
  <div class="login">
    <div class="cont-wrap">
      <div class="page-left">tu</div>
      <div class="page-right">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
        <el-form-item prop="user">
           <el-input v-model.number="ruleForm.user" placeholder="请输入内容">
              <template slot="prefix"><i class="el-icon-user"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input 
              show-password
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off" placeholder="请输入内容">
              <template slot="prefix"><i class="el-icon-lock"></i></template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var checkUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        user: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        user: [{ validator: checkUser, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$router.push('/home')
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  background: #f2f5f8;
  display: flex;
  align-items: center;
  justify-content: center;
  .cont-wrap {
    display: flex;
    width: 80%;
    height: 600px;
    background: #fff;
    .page-left {
      width: 60%;
      height: 100%;
      background: #f9f9f9;
    }
    .page-right {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40%;
      .demo-ruleForm {
        width: 400px;
      }
    }
  }
}
/deep/.el-input__inner {
  border-color: transparent !important;
  border-bottom-color:#dcdfe6 !important;
}
/deep/.el-input__prefix {
  line-height: 30px;
}
/deep/.el-button {
  width: 100% !important;
  border-radius: 20px;
  background: #4d9ab0;
}
</style>