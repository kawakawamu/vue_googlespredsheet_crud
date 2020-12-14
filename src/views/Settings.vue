<template>
  <div class="form-wrapper">
    <v-form v-model="vaild">
      <h5>Settingsページ</h5>
      <v-text-field
        label="アプリ名"
        v-model="settings.appName"
        :counter="30"
        :rules="[appNameRule]"
      />
    </v-form>
  </div>
</template>

<script>
export default {
  name: "Settings",

  data() {
    const createItems = (v) =>
      v
        .split(",")
        .map((v) => v.trim())
        .filter((v) => v.length !== 0);
    const itemMaxLength = (v) =>
      createItems(v).reduce((a, c) => Math.max(a, c.length), 0);

    return {
      valid: false,
      settings: { ...this.$store.state.settings },

      appNameRule: (v) => v.length <= 30 || "30文字以内で入力してください",
      stringRule: (v) => v.length <= 150 || "150文字以内で入力してください",
      categoryRules: [],
      tagRule: (v) =>
        itemMaxLength(v) <= 4 || "各タグは四文字以内で入力してください",
    };
  },

  methods: {
    onClickSave() {
      this.$store.dispatch("saveSettings", { settings: this.settings });
    },
  },
};
</script>
<style>
.form-wrapper {
  max-width: 500px;
  margin: auto;
}
</style>
