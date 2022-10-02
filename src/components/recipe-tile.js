export default {
  name: 'RecipeTile',
  props: {
    id: String,
    name: String,
    subtitle: String,
    author: String,
  },
  computed: {

  },
  methods: {
    chooseRecipe() {
      this.$emit('recipeClicked');
    },
  },

};
