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
      <h3>カテゴリ／タグ設定</h3>
      <p>カンマ（ &#44; ）区切りで入力してください。</p>
      <!-- 収入カテゴリ -->
      <v-text-field
        label="収入カテゴリ"
        v-model="settings.strIncomeItems"
        :counter="150"
        :rules="[stringRule, ...categoryRules]"
      />
      <!-- 支出カテゴリ -->
      <v-text-field
        label="支出カテゴリ"
        v-model="settings.strOutgoItems"
        :counter="150"
        :rules="[stringRule, ...categoryRules]"
      />
      <!-- タグ -->
      <v-text-field
        label="タグ"
        v-model="settings.strTagItems"
        :counter="150"
        :rules="[stringRule, tagRule]"
      />
      <!-- API URL -->
      <v-text-field
        label="API URL"
        v-model="settings.apiUrl"
        :counter="150"
        :rules="[stringRule]"
      />
      <!-- Auth Token -->
      <v-text-field
        label="Auth Token"
        v-model="settings.authToken"
        :counter="150"
        :rules="[stringRule]"
      />
      <v-row class="mt-4">
        <v-spacer />
        <v-btn color="primary" :disabled="!valid" @click="onClickSave"
          >保存</v-btn
        >
      </v-row>
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
