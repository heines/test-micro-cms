<template lang="pug">
.modals
  b-modal(
    id="modal-1"
    title="タグ一覧"
    )
    b-button(
      v-for="tag in tagList"
      :to="{ name: 'tag-id', params: { id: tag.id } }"
      :key="tag.id"
      size="sm"
      variant="outline-primary"
      class="mr-1"
      )
      |{{ tag.name }}
    template(
      v-slot:modal-footer="{ close }"
      )
      b-link(
        @click="close()"
        )
        |CLOSE
  b-modal(
    id="modal-2"
    title="カテゴリ一覧"
    )
    b-link(
      v-for="cat in catList"
      :to="{ name: 'category-id', params: { id: cat.id } }"
      :key="cat.id"
      block="true"
      )
      div
        |{{ cat.name }}
    template(
      v-slot:modal-footer="{ close }"
      )
      b-link(
        @click="close()"
        )
        |CLOSE
</template>

<script>
export default {
  props: {
    tagList: {
      type: Array,
    },
    catList: {
      type: Array,
    },
  },
};
</script>

<style lang="scss"></style>
