export default {
  name: 'SelectedTagBox',
  props: {
    selectedTags: Array,
  },
  data() {
    return {};
  },
  computed: {
  },
  methods: {
    removeTag(tag) {
      tag.inUse = false;
      this.$emit('removeTag', tag);
    },
  },
  created() {
  },
};
