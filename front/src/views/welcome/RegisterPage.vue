<script setup>
import {Lock, User,Message} from "@element-plus/icons-vue";
import router from "@/router";
import {ref,computed}from 'vue'
import {ElMessage} from "element-plus";
import {get}from '../../net/index'
const form=ref({
  username:'',
  password:'',
  repeatPassword:'',
  email:'',
  code:''
})
const coldTime=ref(0)
const validateUsername = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入用户名'));
  } else if (!/^[a-zA-Z0-9_]{3,16}$/.test(value)) {
    callback(new Error('用户名不能包含特殊字符'));
  }
  else {
    callback();
  }
}

const validatePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else if (value!==form.value.password) {
    callback(new Error('两次输入的密码不一致'));
  }
  else {
    callback();
  }
}

const rule={
  username:[
    { validator: validateUsername,trigger:['blur','change']},
  ],
  password:[
    {required:true,message:'请输入密码',trigger:'blur'},
    {min:6,max:20,message:'密码长度在6-20之间',trigger:['blur','change']},
  ],
  repeatPassword:[
    {validator:validatePassword,trigger:['blur','change']},
    {min:6,max:20,message:'密码长度在6-20之间',trigger:['blur','change']},
  ],
  code:[
    {required:true,message:'请输入验证码',trigger:'blur'},
    {min:6,max:6,message:'验证码长度为6',trigger:'blur'},
  ],
  email:[
    {required:true,message:'请输入邮箱地址',trigger:'blur'},
    {type:'email',message:'请输入正确的邮箱地址',trigger:['blur','change']},
  ]
}

const isEmailValid = computed(() => {
  return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(form.value.email)
})

function askCode(){
  if (isEmailValid) {
    coldTime.value=60
    get(`/api/auth/ask-code?email=${form.value.email}&type=register`, () => {
      ElMessage.success('验证码发送成功')
      setInterval(()=>coldTime.value--,1000)
    }, () => {
      ElMessage.error('验证码发送失败')
    })

  }
  else
  {
    ElMessage.error('请输入正确的邮箱地址')
  }
}
</script>

<template>
<div style="text-align: center">
  <div style="margin-top: 100px;">
    <div style="font-size: 28px;font-weight: bold">注册新用户</div>
    <div style="font-size: 14px;color: grey">欢迎注册我们的摄影平台，请在下方填写相关信息</div>
  </div>

  <div>
    <el-form  :model="form" :rules="rule" style="margin-top: 20px">
      <el-form-item prop="username">
        <el-input v-model="form.username" style="margin:0 20px;"  placeholder="用户名" type="text">
          <template #prefix>
            <el-icon> <User /> </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input v-model="form.password" style="margin:0 20px;"  placeholder="密码" type="password">
          <template #prefix>
            <el-icon> <Lock /> </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="repeatPassword">
        <el-input v-model="form.repeatPassword" style="margin:0 20px;"  placeholder="重复密码" type="password">
          <template #prefix>
            <el-icon> <Lock /> </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="email">
        <el-input v-model="form.email" style="margin:0 20px;"  placeholder="电子邮箱地址" type="text">
          <template #prefix>
            <el-icon><Message /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="code">
        <el-row>
          <el-col :span="16" style="text-align: left">
            <el-input v-model="form.code" style="margin:0 20px;"  placeholder="验证码" type="text">
              <template #prefix>
               <el-icon><Message /></el-icon>
              </template>
            </el-input>
          </el-col>
          <el-col :span="8" >
            <el-button :disabled="!isEmailValid||coldTime" @click="askCode" plain style="margin-left: 25px" type="success">
              {{coldTime > 0 ? `请稍后${coldTime}秒`: '获取验证码'}}
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>

      <el-button plain type="warning" style="width: 200px">
        立即注册
      </el-button>

      <div style="margin-top: 20px">
      <span style="font-size: 14px;color:grey;line-height: 15px">已有账号？</span>
      <el-link style="translate:0 -2px" @click="router.push('/')">立即登录</el-link>
      </div>
    </el-form>
  </div>

</div>
</template>

<style scoped>

</style>