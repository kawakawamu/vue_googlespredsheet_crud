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
    return {
      valid: false,
    };
  },
};
</script>
