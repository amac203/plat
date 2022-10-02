import SelectedTagBox from './Selected-Tag-Box.vue';

export default {
  name: 'TagBox',

  props: {
    mode: String,
    selectedTags: Array,
  },

  components: {
    SelectedTagBox,
  },

  data() {
    return {
      tagListA: [{ text: 'spicy', inUse: '' }, { text: 'sweet', inUse: '' }, { text: 'fresh', inUse: '' }, { text: 'rich', inUse: '' }],
      tagListB: [{ text: 'vegan', inUse: '' }, { text: 'meat', inUse: '' }, { text: 'seafood', inUse: '' }, { text: 'grains', inUse: '' }, { text: 'dairy', inUse: '' }],
      tagListC: [{ text: 'soup', inUse: '' }, { text: 'salad', inUse: '' }, { text: 'bake', inUse: '' }, { text: 'light', inUse: '' }],
      tagListD: [{ text: 'quick', inUse: '' }, { text: 'fancy', inUse: '' }, { text: 'slow', inUse: '' }],
      tagListE: [{ text: 'healthy', inUse: '' }, { text: 'indulgent', inUse: '' }],
      count: 0,
    };
  },

  computed: {
    maxCount() {
      if (this.mode === 'edit') {
        return 2;
      } return 4;
    },
  },

  methods: {
    toggleTag(tag) {
      if (tag.inUse) {
        tag.inUse = '';
        this.$emit('removeTag', tag);
        this.count -= 1;
      } else if (!tag.inUse) {
        if (this.count <= this.maxCount) {
          tag.inUse = true;
          this.count += 1;
        }
        this.$emit('addTag', tag);
      }
    },
  },

  mounted() {
    if (this.selectedTags) {
      this.tagListA.forEach((element) => {
        this.selectedTags.forEach((tag) => {
          if (tag.text === element.text) {
            element.inUse = true;
            this.count++;
          }
        });
      });
      this.tagListB.forEach((element) => {
        this.selectedTags.forEach((tag) => {
          if (tag.text === element.text) {
            element.inUse = true;
            this.count++;
          }
        });
      });
      this.tagListC.forEach((element) => {
        this.selectedTags.forEach((tag) => {
          if (tag.text === element.text) {
            element.inUse = true;
            this.count++;
          }
        });
      });
      this.tagListD.forEach((element) => {
        this.selectedTags.forEach((tag) => {
          if (tag.text === element.text) {
            element.inUse = true;
            this.count++;
          }
        });
      });
      this.tagListE.forEach((element) => {
        this.selectedTags.forEach((tag) => {
          if (tag.text === element.text) {
            element.inUse = true;
            this.count++;
          }
        });
      });
    }
  },
};
