import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

const url = process.env.BASE_URL


export const useProductStore = defineStore('product', () => {

    const productList = ref([])

    const addProduct = async data => {
        return new Promise((reject, resolve) => {
            axios.post(`${url}/products`, { ...data }).then((res) => {
                console.log(res)
                resolve(res.data)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    const updateProduct = async (id, data) => {
        return new Promise((reject, resolve) => {
            axios.put(`${url}/products/${id}`, { ...data }).then((res) => {
                console.log(res)
                resolve(res.data)
            }).catch((err) => {
                reject(err)
            })
        })

    }

    const removeProduct = async id => {
        return new Promise((reject, resolve) => {
            axios.delete(`${url}/products/${id}`).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    const getProduct = async () => {
        return new Promise((resolve, reject) => {
            axios.get(`${url}/products`).then((res) => {
                resolve(res)
            })
        })
    }


    return { productList, addProduct, updateProduct, removeProduct, getProduct }
})

