export default {
  name: 'CommentContainer',

  props: {
    comments: Array,
    userName: String,
  },

  data() {
    return {
      newComment: 'add new note',
    };
  },

  computed: {
    newText: {
      get() {
        return this.newComment;
      },
      set(newValue) {
        this.$emit('update:newComment', newValue);
        return newValue;
      },
    },
  },

  methods: {
    addComment() {
      const addedComment = { text: this.newText, author: 'added' };
      this.comments.push(addedComment);
      this.$emit('addComment', this.newComment);
      this.newComment = 'add new note';
    },
    async deleteComment(id) {
      const deleteIndex = this.comments.findIndex((element) => element._id === id);
      this.comments.splice(deleteIndex, 1);
      const url = 'https://plat-342902.ts.r.appspot.com/comments/' + id;
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      }).then();
    },
  },

  created() {
  },
};
