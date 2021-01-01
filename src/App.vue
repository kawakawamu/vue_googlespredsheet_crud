<template>
  <v-app>
    <v-app-bar app color="blue" dark>
      <v-toolbar-title>{{ appName }}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon to="/">
        <v-icon>mdi-apple</v-icon>
      </v-btn>
      <v-btn icon to="/settings">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
      <v-btn icon to="/counter">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-snackbar v-model="snackbar" color="error">{{ errorMessage }}</v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",

  data() {
    return {
      snackbar: false,
    };
  },

  computed: mapstate({
    appName: (state) => state.settings.appName,
    errorMessage: (state) => state.errorMessage,
  }),

  watch: {
    errorMessage() {
      this.snackbar = true;
    },
  },
};
</script>
