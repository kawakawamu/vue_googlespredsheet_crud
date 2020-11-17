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
    };
  },
};
</script>
