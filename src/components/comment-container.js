
export default {
  name: 'CommentContainer',
  props: {
    comments: Array
  },
  data: function () {
    return {
      newComment: "add new note",
    }
  },
  computed: {
    newText: {
      get: function() {
        return this.newComment
      },
      set: function(newValue) {
        this.$emit('update:newComment', newValue)
        return newValue
      }
    },
  },
  methods: {
    addComment: function () {
      const addedComment = {text: this.newText, author: "added"}
      this.comments.push(addedComment)
      this.$emit('addComment', this.newComment)
      this.newComment = "add new note"
  },
},
  created() {

  }
}
