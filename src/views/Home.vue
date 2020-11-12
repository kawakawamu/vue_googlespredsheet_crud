<template>
  <div>
    <v-card>
      <v-card-title>
        <v-col cols="8">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            offset-y
          >
            <template>
              <v-text-field readonly hide-details />
            </template>
            <v-date-picker color="red" locale="ja-jp" no-title scrollable>
            </v-date-picker>
          </v-menu>
        </v-col>
      </v-card-title>
      <v-card-tabel
        class="text-no-wrap"
        :headers="tableHeaders"
        :serach="search"
        :footer-props="footerProps"
        :loading="loading"
      >
      </v-card-tabel>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      loading: false,
      menu: false,
      search: "",
    };
  },
};
</script>
