import axios from "axios";
import { defineStore } from "pinia";

const url = process.env.BASE_URL

export const useCartStore = defineStore('cart' ,  () =>{

    const user = JSON.parse(localStorage.getItem('loggedIn_user'))

    const addToCart = async data => {
        return new Promise((resolve , reject)=> {
            axios.post(`${url}/cart` ,{...data , userId: user.id}).then((res)=>{
                resolve(res)
            })
        })
    }

 
    const removeToCart = async id => {
        return new Promise((resolve , reject)=>{
            axios.delete(`${url}/cart/${id}`).then((res)=>{
               resolve(res)
            })
        })
    }


    const getCartList = async(id) => {
        return new Promise((resolve, reject)=>{
            axios.get(`${url}/cart?userId=${id}`).then((res)=> {
                resolve(res)
            }).catch((err)=>{
                console.log(err);
            })

        })
    }
    

    return { addToCart , removeToCart , getCartList}
})

