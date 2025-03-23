<script setup lang="ts">
const props = defineProps<{
  categories: Category[];
}>();

const emit = defineEmits<{
  removeCategory: [category: Category];
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

const handleRemove = (category: Category) => {
  emit("removeCategory", category);
};
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
        <span class="flex gap-5 items-center">
          {{ category.name }}
          <div class="tooltip flex pt-1" data-tip="Remove category">
            <Icon
              name="heroicons:minus-circle"
              class="text-error"
              @click.stop="handleRemove(category)"
            />
          </div>
        </span>
      </button>

      <CategoryTree
        v-if="category.subcategories && open.includes(category.name)"
        :categories="category.subcategories"
        @remove-category="handleRemove"
        v-model="selected"
        class="ml-4"
      />
    </li>
  </ul>
</template>
