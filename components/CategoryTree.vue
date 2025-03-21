<script setup lang="ts">
const props = defineProps<{
  categories: Category[];
}>();

const selected = defineModel<Category>({ default: null });

const open = ref<String[]>([]);

function handleSelectCategory(category: Category) {
  if (open.value.includes(category.name)) {
    open.value = open.value.filter((name) => name !== category.name);
  } else {
    open.value.push(category.name);
  }

  selected.value = category;
}
</script>

<template>
  <ul class="ml-4">
    <li v-for="category in categories" :key="category.name" class="mb-2">
      <button
        data-test="folder-btn"
        @click="handleSelectCategory(category)"
        class="flex items-center my-1 text-xl cursor-pointer"
      >
        <span>
          <Icon
            :name="
              category.subcategories.length === 0
                ? 'heroicons:folder'
                : open.includes(category.name)
                ? 'heroicons:folder-minus'
                : 'heroicons:folder-plus'
            "
            class="mr-2"
          />
        </span>

        {{ category.name }}
      </button>

      <CategoryTree
        v-if="category.subcategories && open.includes(category.name)"
        :categories="category.subcategories"
        v-model="selected"
        class="ml-4"
      />
    </li>
  </ul>
</template>
