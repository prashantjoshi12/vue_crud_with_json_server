<template>
  <a-button type="primary" @click="showDrawer"
    ><ShoppingCartOutlined
  /></a-button>
  <a-drawer
    v-model:open="open"
    class="custom-class"
    root-class-name="root-class-name"
    :root-style="{ color: 'blue' }"
    
    title="Cart "
    placement="right"
    @after-open-change="afterOpenChange"
  >
  <div>
    Total Cart Items : {{ cartList.length }}
  </div>
    <div v-for="(items , index) in cartList">
        <p :key="index">{{ items.productName }}<a-button @click="removeToCart(items.id); fetchCartList()"><CloseCircleOutlined/></a-button></p>
    </div>
    <a-divider  />
    <div>
      Total : {{ cartList.reduce((pre , cur)=> pre+Number(cur.price),0 ) }}
    </div>
    
  </a-drawer>
</template>
<script setup>
import { useCartStore } from "@/stores/cart";
import { CloseCircleOutlined, ShoppingCartOutlined } from "@ant-design/icons-vue";
import { onMounted, ref } from "vue";

const {removeToCart  , getCartList } = useCartStore()
const open = ref(false);
const cartList =ref([])

const fetchCartList = () => {
  getCartList().then((res)=>{
    console.log(res)
    cartList.value = res.data
  })
}

onMounted(()=>{
  fetchCartList()
})
const afterOpenChange = (bool) => {
  console.log("open", bool);
};
const showDrawer = () => {
  open.value = true;
  fetchCartList()
};
</script>
