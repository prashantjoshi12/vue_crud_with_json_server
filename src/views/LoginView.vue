<template>
    <div  class="login-form">
        <h1>Login</h1>
        <a-form
          :model="formState"
          name="normal_login"
         
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            label="Email"
            name="email"
            :rules="[{ required: true, message: 'Please input your Email!' }]"
          >
            <a-input v-model:value="formState.email">
              <template #prefix>
                <UserOutlined class="site-form-item-icon" />
              </template>
            </a-input>
          </a-form-item>
      
          <a-form-item
            label="Password"
            name="password"
            :rules="[{ required: true, message: 'Please input your password!' }]"
          >
            <a-input-password v-model:value="formState.password">
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input-password>
          </a-form-item>
      
         
          <a-form-item>
            <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
              Log in
            </a-button>
            Or
            <router-link to="/register">Register</router-link>
          </a-form-item>
        </a-form>
    </div>
  </template>
  <script setup>
  import { reactive, computed } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
  
  const formState = reactive({
    email: '',
    password: '',
  });
  const router = useRouter()
  const {login} = useAuthStore()
  const onFinish = values => {
    login(formState).then((res)=>{
        if(res.success){
            router.push({name : 'home'})
        }else{
            alert('Invalid Credential')
        }
    })
    console.log('Success:', values);
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const disabled = computed(() => {
    return !(formState.email && formState.password);
  });
  </script>
  <style scoped>
  #components-form-demo-normal-login .login-form {
    max-width: 300px;
  }
  #components-form-demo-normal-login .login-form-forgot {
    float: right;
  }
  #components-form-demo-normal-login .login-form-button {
    width: 100%;
  }
  </style>