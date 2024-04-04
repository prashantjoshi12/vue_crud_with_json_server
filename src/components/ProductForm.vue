<template>
    <a-form
      ref="formRef"
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="handleSubmit"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="Product Name"
        name="productName"
        :rules="[{ required: true, message: 'Please input your Product Name!' }]"
      >
        <a-input v-model:value="formState.productName" />
      </a-form-item>
  
      <a-form-item
        label="Category"
        name="category"
        :rules="[{ required: true, message: 'Please input your Category!' }]"
      >
        <a-input v-model:value="formState.category" />
      </a-form-item>
  

      <a-form-item
        label="Price"
        name="price"
        :rules="[{ required: true, message: 'Please input your Price!' }]"
      >
        <a-input v-model:value="formState.price" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </template>
  <script setup>
  import { reactive, ref } from 'vue';
  const emit = defineEmits(["onFinish"])
  const {editData} = defineProps({editData : Object})
  const formRef = ref()
  
  const formState = reactive({
    id: editData && editData.id,
    productName: (editData && editData.productName) ??'',
    category: (editData && editData.category) ?? '',
    price: (editData && editData.price) ?? ''
  });

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const handleSubmit = () => {
    emit("onFinish", formState);
    formRef.value.resetFields();
  };
  </script>