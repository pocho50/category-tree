<script setup lang="ts">
const {
  categories,
  getPath,
  handleAddCategory,
  handleRemoveCategory,
  resetPath,
  categorySelected,
} = useTreeCategory();

const { data } = await useFetch("/api/categories");

categories.value = data.value;
</script>

<template>
  <div class="container mx-auto flex flex-col min-h-dvh shadow-xl">
    <header class="navbar bg-base-100">
      <a class="btn btn-ghost text-3xl">Categories Tree</a>
    </header>
    <main class="p-8 bg-base-200 grow">
      <aside class="py-4">
        <p class="pb-5 text-lg text-primary">
          To add a subcategory, first select a category
        </p>
        <div class="flex flex-col lg:flex-row gap-10 text-xl lg:text-2xl">
          <div class="flex gap-3">
            <p>Path: {{ getPath || "/" }}</p>
            <div class="tooltip flex pt-1" data-tip="Reset path">
              <Icon
                name="heroicons:x-circle"
                class="cursor-pointer text-secondary"
                @click="resetPath"
              />
            </div>
          </div>

          <CategoryForm
            v-if="categories"
            :categories
            @add-category="handleAddCategory"
          />
        </div>
      </aside>
      <CategoryTree
        v-if="categories"
        :categories
        v-model="categorySelected"
        @remove-category="handleRemoveCategory"
      />
    </main>
  </div>
</template>
