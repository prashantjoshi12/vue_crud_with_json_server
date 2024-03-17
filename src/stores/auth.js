import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

const url = process.env.BASE_URL
const router = useRouter()

export const useAuthStore = defineStore('auth', () => {

    const loggedInUser = ref(JSON.parse(localStorage.getItem('loggedIn_user')) ?? '')

    const checkEmailExists = (email) =>{
        return new Promise((resolve, reject)=>{
            axios.get(`${url}/users?email=${email}`).then(({ data }) => {
                resolve(data)
            }).catch((err)=>{
                console.log(err)
            })
        })
    }
    const login = formData => {
        return new Promise((resolve, reject) => {
            checkEmailExists(formData.email).then( (data ) => {
                if (data[0].password == formData.password) {
                    loggedInUser.value = data[0]
                    localStorage.setItem('loggedIn_user', JSON.stringify(loggedInUser.value))
                    localStorage.setItem('isLoggedIn', JSON.stringify(true))

                    resolve({ success: true })
                } else {
                    resolve({ success: false })
                }
            }).catch((err) => {
                console.log(err);
            })
        })
    }
    
    const register = formData => {
        return new Promise((resolve, reject) => {
            checkEmailExists(formData.email).then((data)=>{
                if(data[0]?.email == formData.email){
                    alert('Email already Exists')
                }else{
                    axios.post(`${url}/users`, { ...formData }).then(({ data }) => {
                        if (data) {
                            resolve({ success: true })
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                }
            })
        })

    }

    const getAllUsers = () => {
        return new Promise((resolve, reject) => {
            axios.get(url).then(({ data }) => {
                resolve(data)
            })
        })

    }

    const logout = async () => {
        return new Promise((resolve, reject) => {
            localStorage.clear()
            resolve(true)
        })
    }

    return { loggedInUser, login, register, getAllUsers, logout }
})