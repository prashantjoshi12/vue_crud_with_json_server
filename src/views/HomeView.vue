<template>
  <div>
    <Header />
    <div class="flex product">
      <h2>Products</h2>
      <span>
        <a-button @click="addForm = true"> + Add </a-button>
        <a-divider type="vertical" />
        <Cart />
      </span>
    </div>
    <a-table :dataSource="productData" :columns="columns" :pagination="false">
      <template #bodyCell="{ text, column, record }">
        <template v-if="column.key === 'action'">
          <span>
            <a-button @click="addToCart(record)">
              <ShoppingCartOutlined />
            </a-button>
            <a-divider type="vertical" />
            <a-button @click="editProductData(record)">
              <EditOutlined />
            </a-button>
            <a-divider type="vertical" />
            <a-button @click="deleteProduct(record.id)">
              <DeleteOutlined />
            </a-button>
          </span>
        </template>
      </template>
    </a-table>
  </div>

  <a-modal v-model:open="addForm" title="Add Product" :footer="null">
    <ProductForm @onFinish="(data) => submitAddForm(data)" />
  </a-modal>

  <a-modal
    v-model:open="editForm"
    title="Edit Product"
    :footer="null"
    @cancel="editData = {}"
  >
    <ProductForm
      :key="editData.id"
      :editData="editData"
      @onFinish="(data) => submitEditForm(data.id, data)"
    />
  </a-modal>
</template>

<script setup>
import { useProductStore } from "@/stores/product";
import { onMounted, ref } from "vue";
import {
  ShoppingCartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import Cart from "@/components/Cart.vue";
import ProductForm from "@/components/ProductForm.vue";
import { useCartStore } from "@/stores/cart";
import Header from "@/components/Header.vue";

const { getProduct, addProduct, updateProduct, removeProduct } =
  useProductStore();
const { addToCart } = useCartStore();
const addForm = ref(false);
const editForm = ref(false);
const editData = ref({});
const productData = ref([]);
const fetchProduct = () => {
  getProduct().then((res) => {
    productData.value = res.data;
  });
};

const editProductData = (record) => {
  editData.value = record;
  editForm.value = true;
};

const submitEditForm = (id, data) => {
  updateProduct(id, data);
  editForm.value = false;
  fetchProduct();
};

const submitAddForm = (data ) => {
  addProduct(data).then(()=>{
    addForm.value = false;
    fetchProduct();
  })
};


const deleteProduct = (id)=>{ 
  removeProduct(id)
  fetchProduct()
}

onMounted(() => {
  fetchProduct();
});

const columns = [
  {
    title: "Name",
    dataIndex: "productName",
    key: "name",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Actions",
    key: "action",
  },
];
</script>
