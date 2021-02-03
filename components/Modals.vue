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
      class="mr-1 mb-1"
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
  b-modal(
    id="modal-3"
    title="全文検索（タイトル・本文）"
    )
    b-form(
      @submit="onSubmit"
      )
      b-form-group(
        id="input-group"
        label="キーワード："
        label-for="input-keyword"
        description="カンマ区切りで入力してください（AND検索）"
        )
        b-form-input(
          id="input-keyword"
          v-model="form.keyword"
          placeholder="キーワードを入力"
          required
          )
      b-button.btn.btn-primary(
        type="submit"
        ) 検索
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
  data() {
    return {
      form: {
        keyword: "",
      },
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      const keyword = encodeURI(this.form.keyword);
      this.$router.push(`/search/${keyword}`);
    },
  },
};
</script>

<style lang="scss"></style>
