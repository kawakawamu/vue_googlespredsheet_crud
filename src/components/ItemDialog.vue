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
      /** 収支カテゴリ一覧 */
      incomeItems: ["カテ1", "カテ2"],
      outgoItems: ["カテ3", "カテ4"],
      /** 選択カテゴリ一覧 */
      categoryItems: [],
      /** タグリスト */
      tagItems: ["タグ1", "タグ2"],
      /** 編集前の年月（編集時に使う） */
      beforeYM: "",
      /** バリデーションルール */
      titleRules: [
        (v) => v.trim().length > 0 || "タイトルは必須項目です",
        (v) => v.length() <= 20 || "20字以内で入力して下さい",
      ],
    };
  },
};
</script>
