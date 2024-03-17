<template>
    <div class="flex header">
        <h1>Welcome {{name}}, </h1>
        <a-button @click="logoutUser"  type="primary" >logout</a-button>
    </div>
</template>
<script setup>
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
const router =useRouter()
const name = computed(()=> username)
const {loggedInUser : {username} , logout} = useAuthStore()
const logoutUser=()=>{
    logout().then((res)=>{
        if(res) router.push({name : 'login'})
    })
    
}
</script>