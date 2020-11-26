<template>
  <v-dialog v-model="show" scrollable persistent max-width="500px" eager>
    <v-card>
      <v-card-title>テスト</v-card-title>
      <v-divider />
      <v-card-text>
        <v-form ref="form" v-model="vailid">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
                hide-details
              />
            </template>
            <v-date-picker v-model="date"> </v-date-picker>
          </v-menu>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "ItemDialog",

  data() {
    return {
      /** ダイアログの表示状態 */
      show: false,
      /** 入力したデータが有効かどうか */
      valid: false,
      /** 日付選択メニューの表示状態 */
      menu: false,
      /** ローディング状態 */
      loading: false,

      /** 操作タイプ 'add' or 'edit' */
      actionType: "add",
      /** id */
      id: "",
      /** 日付 */
      date: "",
      /** タイトル */
      title: "",
      /** 収支 'income' or 'outgo' */
      inout: "",
      /** カテゴリ */
      category: "",
      /** タグ */
      tags: [],
      /** 金額 */
      amount: 0,
      /** メモ */
      memo: "",

      /** 選択カテゴリ一覧 */
      categoryItems: [],
      /** 編集前の年月（編集時に使う） */
      beforeYM: "",

      /** タグリスト */
      tagItems: ["タグ1", "タグ2"],
      /** バリデーションルール */
      titleRules: [
        (v) => v.trim().length > 0 || "タイトルは必須項目です",
        (v) => v.length() <= 20 || "20字以内で入力して下さい",
      ],
      tagRule: (v) => v.length <= 5 || "タグは５種類以内で選択して下さい",
      amountRules: [
        (v) => v >= 0 || "金額は0以上で入力して下さい",
        (v) => Number.isInteger(v) || "整数で入力して下さい",
      ],
      memoRule: (v) => v.length <= 50 || "メモは50字以内で入力して下さい",
    };
  },

  computed: {
    titleText() {
      return this.actionType === "add" ? "データ追加" : "データ編集";
    },
    actionText() {
      return this.actionType === "add" ? "追加" : "更新";
    },
  },

  methods: {
    open(actionType, item) {
      this.show = true;
      this.actionType = actionType;
      // this.resetForm(item)

      if (actionType === "edit") {
        this.beforeYM = item.date.slice(0, 7);
      }
    },
    onClickClose() {
      this.show = false;
    },
    // 追加
    onClickAction() {},
    // 収支が切り替わった時
    onChangeInout() {
      if (this.inout === "income") {
        this.categoryItems = this.incomeItems;
      } else {
        this.categoryItems = this.outgoItems;
      }
      this.category = this.categoryItems[0];
    },
    // フォームの内容を初期化
    resetForm(item = {}) {
      const today = new date();
      const year = today.getFullYear();
      const month = ("0" + (today.getMonth() + 1)).slice(-2);
      const date = ("0" + today.getDate()).slice(-2);

      this.id = item.id || "";
      this.date = item.date || `${year}-${month}-${date}`;
      this.title = item.title || "";
      this.inout = item.income != null ? "income" : "outgo";

      if (this.inout === "income") {
        this.categoryItems = this.incomeItems;
        this.amount = item.income || 0;
      } else {
        this.categoryItems = this.outgoItems;
        this.amount = item.outgo || 0;
      }

      this.category = item.category || this.categoryItems[0];
      this.tags = item.tags ? item.tags.split(",") : [];
      this.memo = item.memo || "";

      this.$refs.form.resetValidation();
    },
  },
};
</script>
