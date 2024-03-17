import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

const url = process.env.BASE_URL

export const useCartStore = defineStore('cart' ,  () =>{


    const addToCart = async data => {
        return new Promise((resolve , reject)=> {
            axios.post(`${url}/cart` ,data).then((res)=>{
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


    const getCartList = async() => {
        return new Promise((resolve, reject)=>{
            axios.get(`${url}/cart`).then((res)=> {
                resolve(res)
            }).catch((err)=>{
                console.log(err);
            })

        })
    }
    

    return { addToCart , removeToCart , getCartList}
})

