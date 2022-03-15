export default {
  name: 'RecipeTile',
  props: {
      id: String,
      name: String,
      subtitle: String,
      author: String
  },
  computed: {

  },
  methods: {
    chooseRecipe: function() {
      this.$emit('recipeClicked')
    }
  },

}
