<script setup lang="ts">
const props = defineProps<{
  categories: Category[];
}>();

const emit = defineEmits<{
  addCategory: [name: string];
}>();

const categoryName = ref("");
const error = ref("");

const handleSubmit = () => {
  if (!categoryName.value) {
    error.value = "The category name is required";
    return;
  }

  /* check if the category already exist, if exist getCategoryPath will return false */
  if (getCategoryPath(props.categories, categoryName.value)) {
    error.value = "The category name already exist";
    return;
  }

  /* emit the event and reset categoryName and error */
  emit("addCategory", categoryName.value);
  categoryName.value = "";
  error.value = "";
};
</script>
<template>
  <form class="join" @submit.prevent="handleSubmit">
    <div>
      <label class="input join-item">
        <input type="text" v-model="categoryName" placeholder="Category name" />
      </label>
      <div class="text-error text-sm" v-if="error">
        {{ error }}
      </div>
    </div>
    <button class="btn btn-primary join-item">Add category</button>
  </form>
</template>
