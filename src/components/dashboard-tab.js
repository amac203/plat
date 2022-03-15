import RecipeTile from './Recipe-Tile.vue'
import RecipeDisplay from './Recipe-Display.vue'
import TagBox from './Tag-Box.vue'
import SelectedTagBox from './Selected-Tag-Box.vue'

import peppers from "../assets/peppers.svg"
import food from "../assets/food.png"

import spices from "../assets/spices.jpeg"

import herbs from "../assets/herbs.jpeg"

import pieGone from "../assets/pieGone.svg"

export default {
  name: 'DashboardTab',
  components: {
    RecipeTile,
    RecipeDisplay,
    TagBox,
    SelectedTagBox
  },
  props: {
    displayMode: String,
    recipes: [],
    savedRecipes: [],
    allRecipes: [],
    currentUser: Object,
    selectedTab: String,
  },
  data: function () {
    return {
      selectedRecipe: Object,
      displayRecipeId: "",
      displayRecipeTitle: "",
      displayRecipeSubtitle: "",
      displayRecipeAuthor: "",
      displayTags: [],
      linkCode: "",
      steps: [],
      ingredients: [],
      selectedTags: [],

      displayRecipes: 'my',

      pieGone: pieGone,
      peppers: peppers,
      food: food,

      spices: spices,
      herbs: herbs,

      searchTerm: "search recipe keyword",
      emptyMessage: "No recipes yet. Make a new recipe to get started.",

      urlString: 'https://plat-342902.ts.r.appspot.com/',
      //urlString: 'http://localhost:3000/',
      ownRecipe: false,
      savedRecipe: false,
      editing: Boolean,
      recipeBG: "plate",
      userName: ""
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {
    async recipeClicked(id, title, subtitle, author, tags, uid, code) {
        this.editing = false
        this.$emit('displayChange', 'recipe')
        this.$emit('alertChange', 'recipe')
        this.getSteps(id)
        this.displayRecipeId = id
        this.displayRecipeTitle = title
        this.displayRecipeSubtitle = subtitle
        this.displayRecipeAuthor = author
        this.displayTags = tags
        this.userName = this.currentUser.displayName
        this.setBG(tags)
        this.linkCode = code
        if (uid == this.currentUser.uid){ this.ownRecipe = true }
        if (this.savedRecipes.find(recipe => recipe._id == id)) { this.savedRecipe = true}
        this.getIngredients(id)

    },
    setBG: function(tags){
      this.recipeBG = 'plate'
      for(const tag of tags){
        if(tag.text === "sweet"){
          this.recipeBG = 'pies'
          break
        }
        else if (tag.text === "soup"){
          this.recipeBG = 'soup'
          break
        }
        else if(tag.text === "grains" || tag.text === "bake"){
          this.recipeBG = 'sourdough'
          break
        }
        else if(tag.text === "spicy"){
          this.recipeBG = 'chilli'
          break
        }
        else if(tag.text === "healthy" || tag.text === "salad" || tag.text === "fresh"){
          this.recipeBG = 'kale'
          break
        }
      }
    },
    async newStepClicked(){
        var url = this.urlString + 'steps/' + this.displayRecipeId
        var requestOptions = {
       'content-type': 'application/json',
        method: 'POST',
        redirect: 'follow'
      };
        fetch(url, requestOptions
        ).then(response => response.json()).then(data => this.steps.push(
          {'name': 'new step', 'text': 'this is a new step', '_id': data.insertedId, 'recipe_id': this.displayRecipeId}
        ));
    },
    getSteps: async function (id){
      var url = this.urlString + 'steps/' + id
      var requestOptions = {
     'content-type': 'application/json',
      method: 'GET',
      redirect: 'follow'
    };
      fetch(url, requestOptions
      ).then(response => response.json()).then(data => {this.steps = data; this.steps[0].selected = true});
    },
    getIngredients: async function (id){
      var url = this.urlString + 'ingredients/' + id
      var requestOptions = {
     'content-type': 'application/json',
      method: 'GET',
      redirect: 'follow'
    };
      fetch(url, requestOptions
      ).then(response => response.json()).then(data => {this.ingredients = data});
    },
    async saveUpdates() {
      var url = this.urlString + 'recipe/' + this.displayRecipeId
      //this.alertChange("saving")
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(
          {title: this.displayRecipeTitle,
          subtitle: this.displayRecipeSubtitle,
          tags: this.displayTags}),
        }).then(
          this.alertChange("Change saved.")
      );
    },
    async saveStep(step) {
      this.editing = true
      var url = this.urlString + 'steps/' + step._id
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(step),
        }).then(function(response){
          console.log(response)
      });
    },
    async saveIngredient(ingredient) {
      this.editing = true
      var url = this.urlString + 'ingredients/' + ingredient._id
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(ingredient),
        }).then(function(response){
          console.log(response)
      });
    },
    async newIngredient(ingredient) {
      this.editing = true
      this.ingredients.push(ingredient)
      const newIndex = this.ingredients.findIndex(element => element.name === ingredient.name)
      var url = this.urlString + 'ingredients/' + this.displayRecipeId
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(ingredient),
      }).then(response => response.json()).then(data => {
          this.ingredients[newIndex]._id = data.insertedId;
          })
    },
    async deleteIngredient(id) {
      this.editing = true
      const deleteIndex = this.ingredients.findIndex(element => element._id === id)
      this.ingredients.splice(deleteIndex, 1)
      var url = this.urlString + 'ingredients/' + id
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        },
        }).then(function(response){
          console.log(response)
      });
    },
    addTag: function (tag) {
      this.editing = true
      if (this.selectedTags.length < 5){
        this.selectedTags.push(tag)
      }
      this.$emit('alertChange', 'filter')
      this.getSortedRecipes(this.selectedTags)
    },
    removeTag: function (tag) {
      this.editing = true
      const removeTag = this.selectedTags.findIndex(element => element.text === tag.text)
      this.selectedTags.splice(removeTag, 1)
      if (this.selectedTags.length == 0) {
        this.getRecipes()
        this.$emit('alertChange', 'Click up to 5 tags on the filter panel to find a recipe to suit you.')
      } else {
        this.getSortedRecipes(this.selectedTags)
      }
    },
    selectTab: function (selected) {
      if(selected == 'saved'){
        this.displayRecipes = 'saved'
      }
      if(selected == 'my'){
        this.displayRecipes = 'my'
      }
      if(selected == 'explore'){
        this.displayRecipes = 'all'
      }
    },
    newRecipe: function() {
      this.editing = true
      this.ingredients = []
      this.displayChange('edit')
      const uidBody = JSON.stringify({uid: this.currentUser.uid})
      var url = this.urlString + 'recipe/' + this.currentUser.displayName
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: uidBody
      }).then(response => response.json()).then(data => {this.linkCode = data.link; this.newStep(data.insertedId)});
    },
    newStep: function(id) {
      var url = this.urlString + 'steps/' + id
      var requestOptions = {
     'content-type': 'application/json',
      method: 'POST',
      redirect: 'follow'
    };
      fetch(url, requestOptions
      ).then(response => response.json()).then(this.getNewRecipe(id));
    },
    getNewRecipe: function(id){
      this.ownRecipe = true
      this.editing = true
      this.$emit('displayChange', 'newRecipe')
      this.$emit('alertChange', 'recipe')
      this.displayRecipeId = id
      this.displayRecipeTitle = "recipe name"
      this.displayRecipeSubtitle = "describe your recipe briefly here"
      this.displayRecipeAuthor = this.currentUser.displayName
      this.displayTags = []
      this.userName = this.currentUser.displayName
      this.ownRecipe = true
      this.getIngredients(id)
    },
    getRecipes: function(){
      this.$emit('getRecipes')
    },
    getAllRecipes: function(){
      this.$emit('getAllRecipes')
    },
    getSortedRecipes: function(tags){
      this.emptyMessage = "No recipes found. Try some other tags."
      this.$emit('sortRecipes', tags)
    },
    getSavedRecipes: function(){
      this.emptyMessage = "No recipes found. Try exploring and save some recipes to keep them here."
      this.$emit('getSavedRecipes')
    },
    searchRecipes: function(){
      this.emptyMessage = "Nothing found, keep searching."
      if (!this.searchTerm) {
        this.getRecipes()
        this.searchTerm = "search recipes by keyword"
      } else {
      this.$emit('searchRecipes', this.searchTerm)
      }
    },
    saveThis: function (id) {
      this.$emit('saveThis', id)
    },
    alertChange: function(message){
      this.$emit('alertChange', message)
    },
    displayChange: function(message){
      this.$emit('displayChange', message)
    },
  },
  mounted() {
    this.getRecipes()
    this.getSavedRecipes()
    this.getAllRecipes()
  },
  updated() {

  }
}
