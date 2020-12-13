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
    };
  },
};
</script>
