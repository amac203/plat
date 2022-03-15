

export default {
  name: 'SelectedTagBox',
  props: {
    selectedTags: Array
  },
  data: function () {
    return {

    }
  },
  computed: {

  },
  methods: {
    removeTag: function (tag) {
      tag.inUse = false
      this.$emit('removeTag', tag)
  },
},
  created() {

  }
}
