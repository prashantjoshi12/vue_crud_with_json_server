<template>
  <a-button type="primary" @click="showDrawer"
    ><ShoppingCartOutlined
  /></a-button>
  <a-drawer
    v-model:open="open"
    class="drawer"
    root-class-name="root-class-name"
    :root-style="{ color: 'blue' }"
    
    title="Cart "
    placement="right"
    @after-open-change="afterOpenChange"
  >
  <div class="cart_total_item_count">
    Total Cart Items : {{ cartList.length }}
  </div>
  <div class="cart_item_box">
    <div class="cart_items" v-for="(items , index) in cartList" :key="index">
        {{ items.productName }}<a-button @click="removeToCart(items.id); fetchCartList()"><DeleteOutlined /></a-button>
    </div>
  </div>
    <a-divider  />
    <div class="cart_total">
      Total : {{ cartList.reduce((pre , cur)=> pre+Number(cur.price),0 ) }}
    </div>
    
  </a-drawer>
</template>
<script setup>
import { useCartStore } from "@/stores/cart";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons-vue";
import { computed, onMounted, ref } from "vue";

const {removeToCart  , getCartList } = useCartStore()
const open = ref(false);
const cartList =ref([])
const user = computed( () =>JSON.parse(localStorage.getItem('loggedIn_user')))


const fetchCartList = () => {
  getCartList(user.value.id).then((res)=>{
    cartList.value = res.data
  })
}

const getItemsWithQuantity = () =>{
  const counts = {}
  cartList.value.forEach((x)=>{
    counts[x.productName] = (counts[x.productName] || 0) +1 
  })
  return counts
  
}
setTimeout(() => {
  console.log(getItemsWithQuantity());
}, 2000);

onMounted(()=>{
  fetchCartList()
})
const afterOpenChange = (bool) => {
  console.log("open", bool);
};
const showDrawer = () => {
  fetchCartList()
  open.value = true;
};
</script>
