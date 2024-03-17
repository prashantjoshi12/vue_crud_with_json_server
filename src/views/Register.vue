<template>
  <div class="login-form"  >
    <h1>Register</h1>

    <a-form
      :model="formState"
      name="normal_login"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formState.username">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
        label="Email"
        name="email"
        :rules="[{ required: true, message: 'Please input your Email!' }]"
      >
        <a-input type="email" v-model:value="formState.email">
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

      <a-form-item
        label="Confirm Password"
        name="confirm"
        :rules="[{ required: true, message: 'Please input your Confirm Password!' }]"
      >
        <a-input-password v-model:value="formState.confirm">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
  
      
      <a-form-item>
        <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
          Register
        </a-button>
        Or
        <router-link to="/login">Login</router-link>
      </a-form-item>
    </a-form>
  </div>
  </template>
  <script setup>
  import { useAuthStore } from '@/stores/auth';
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
  const formState = reactive({
    username: '',
    email:'',
    password: '',
    confirm: '',
  });
  const router = useRouter()
  const {register} = useAuthStore()
  const onFinish = values => {
    if(formState.password  != formState.confirm ) {
      alert('Password Mismatch')
      return
    }
    register(formState).then((res)=>{
      router.push({name : 'login'})
    })
    console.log('Success:', values);
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const disabled = computed(() => {
    return !(formState.username && formState.password);
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