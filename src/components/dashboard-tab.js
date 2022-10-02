import RecipeTile from './Recipe-Tile.vue';
import RecipeDisplay from './Recipe-Display.vue';
import TagBox from './Tag-Box.vue';
import SelectedTagBox from './Selected-Tag-Box.vue';

import peppers from '../assets/peppers.svg';
import food from '../assets/food.png';
import spices from '../assets/spices.jpeg';
import herbs from '../assets/herbs.jpeg';
import pieGone from '../assets/pieGone.svg';

export default {
  name: 'DashboardTab',

  components: {
    RecipeTile,
    RecipeDisplay,
    TagBox,
    SelectedTagBox,
  },

  props: {
    displayMode: String,
    recipes: [],
    savedRecipes: [],
    allRecipes: [],
    searchedRecipes: [],
    currentUser: Object,
    selectedTab: String,
  },

  data() {
    return {
      selectedRecipe: Object,
      displayRecipeId: '',
      displayRecipeTitle: '',
      displayRecipeSubtitle: '',
      displayRecipeAuthor: '',
      displayTags: [],
      linkCode: '',
      steps: [],
      ingredients: [],
      selectedTags: [],

      pieGone,
      peppers,
      food,
      spices,
      herbs,

      searchTerm: '',
      emptyMessage: 'No recipes yet. Make a new recipe to get started.',

      urlString: 'https://plat-342902.ts.r.appspot.com/',
      ownRecipe: false,
      savedRecipe: false,
      editing: Boolean,
      recipeBG: 'plate',
      userName: '',
      searchActive: false,
      activeTab: 'all',
      newActive: false,
    };
  },

  computed: {
    displayRecipes: {
      get() {
        return this.activeTab;
      },
      set(newValue) {
        this.$emit('update:activeTab', newValue);
        return newValue;
      },
    },
  },

  watch: {
    searchedRecipes() {
      if (this.searchedRecipes.length > 0) {
        this.searchActive = true;
      } else {
        this.searchActive = false;
      }
    },
    searchTerm() {
      if (this.searchTerm.length === 0) {
        this.searchActive = false;
      }
    },
    selectedTab() {
      this.activeTab = this.selectedTab;
    },
  },

  methods: {
    async recipeClicked(id, title, subtitle, author, tags, uid, code) {
      this.editing = false;
      this.savedRecipe = false;
      this.ownRecipe = false;
      this.$emit('displayChange', 'recipe');
      this.getSteps(id);
      this.displayRecipeId = id;
      this.displayRecipeTitle = title;
      this.displayRecipeSubtitle = subtitle;
      this.displayRecipeAuthor = author;
      this.displayTags = tags;
      this.userName = this.currentUser.displayName;
      this.setBG(tags);
      this.linkCode = code;
      if (uid === this.currentUser.uid) { this.ownRecipe = true; }
      if (this.savedRecipes.find((recipe) => recipe._id === id)) { this.savedRecipe = true; }
      this.getIngredients(id);
    },
    setBG(tags) {
      this.recipeBG = 'plate';
      for (const tag of tags) {
        if (tag.text === 'sweet') {
          this.recipeBG = 'pies';
          break;
        } else if (tag.text === 'soup') {
          this.recipeBG = 'soup';
          break;
        } else if (tag.text === 'grains' || tag.text === 'bake') {
          this.recipeBG = 'sourdough';
          break;
        } else if (tag.text === 'spicy') {
          this.recipeBG = 'chilli';
          break;
        } else if (tag.text === 'healthy' || tag.text === 'salad' || tag.text === 'fresh') {
          this.recipeBG = 'kale';
          break;
        }
      }
    },
    async newStepClicked() {
      const url = this.urlString + 'steps/' + this.displayRecipeId;
      const requestOptions = {
        'content-type': 'application/json',
        method: 'POST',
        redirect: 'follow',
      };
      fetch(url, requestOptions).then((response) => response.json()).then((data) => this.steps.push(
        {
          name: 'new step', text: 'this is a new step', _id: data.insertedId, recipe_id: this.displayRecipeId,
        },
      ));
    },
    async getSteps(id) {
      const url = this.urlString + 'steps/' + id;
      const requestOptions = {
        'content-type': 'application/json',
        method: 'GET',
        redirect: 'follow',
      };
      fetch(url, requestOptions).then((response) => response.json())
        .then((data) => { this.steps = data; this.steps[0].selected = true; });
    },
    async getIngredients(id) {
      const url = this.urlString + 'ingredients/' + id;
      const requestOptions = {
        'content-type': 'application/json',
        method: 'GET',
        redirect: 'follow',
      };
      fetch(url, requestOptions).then((response) => response.json())
        .then((data) => { this.ingredients = data; });
    },
    async saveUpdates() {
      const url = this.urlString + 'recipe/' + this.displayRecipeId;
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(
          {
            title: this.displayRecipeTitle,
            subtitle: this.displayRecipeSubtitle,
            tags: this.displayTags,
          },
        ),
      }).then();
    },
    async saveStep(step) {
      const url = this.urlString + 'steps/' + step._id;
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(step),
      }).then();
    },
    async saveIngredient(ingredient) {
      const url = this.urlString + 'ingredients/' + ingredient._id;
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(ingredient),
      }).then();
    },
    async newIngredient(ingredient) {
      this.editing = true;
      this.ingredients.push(ingredient);
      const newIndex = this.ingredients.findIndex((element) => element.name === ingredient.name);
      const url = this.urlString + 'ingredients/' + this.displayRecipeId;
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(ingredient),
      }).then((response) => response.json()).then((data) => {
        this.ingredients[newIndex]._id = data.insertedId;
      });
    },
    async deleteIngredient(id) {
      this.editing = true;
      const deleteIndex = this.ingredients.findIndex((element) => element._id === id);
      this.ingredients.splice(deleteIndex, 1);
      const url = this.urlString + 'ingredients/' + id;
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      }).then((response) => {
        console.log(response);
      });
    },
    addTag(tag) {
      this.editing = true;
      if (this.selectedTags.length < 5) {
        this.selectedTags.push(tag);
      }
      this.$emit('alertChange', 'filter');
      this.getSortedRecipes(this.selectedTags);
    },
    removeTag(tag) {
      this.editing = true;
      const removeTag = this.selectedTags.findIndex((element) => element.text === tag.text);
      this.selectedTags.splice(removeTag, 1);
      if (this.selectedTags.length === 0) {
        this.getAllRecipes();
        this.$emit('alertChange', 'filterCleared');
      } else {
        this.getSortedRecipes(this.selectedTags);
      }
    },
    selectTab(selected) {
      if (selected === 'saved') {
        this.activeTab = 'saved';
      }
      if (selected === 'my') {
        this.activeTab = 'my';
      }
      if (selected === 'all') {
        this.activeTab = 'all';
      }
    },
    newRecipe() {
      this.newActive = true;
      this.editing = true;
      this.ingredients = [];
      this.steps = [];
      this.displayChange('edit');
      const uidBody = JSON.stringify({ uid: this.currentUser.uid });
      const url = this.urlString + 'recipe/' + this.currentUser.displayName;
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: uidBody,
      }).then((response) => response.json())
        .then((data) => { this.linkCode = data.link; this.newStep(data.insertedId); });
    },
    newStep(id) {
      const url = this.urlString + 'steps/' + id;
      const requestOptions = {
        'content-type': 'application/json',
        method: 'POST',
        redirect: 'follow',
      };
      fetch(url, requestOptions).then((response) => response.json()).then(this.getNewRecipe(id));
    },
    getNewRecipe(id) {
      this.ownRecipe = true;
      this.editing = true;
      this.$emit('displayChange', 'newRecipe');
      this.$emit('alertChange', 'recipe');
      this.displayRecipeId = id;
      this.displayRecipeTitle = 'recipe name';
      this.displayRecipeSubtitle = 'describe your recipe briefly here';
      this.displayRecipeAuthor = this.currentUser.displayName;
      this.displayTags = [];
      this.userName = this.currentUser.displayName;
      this.ownRecipe = true;
      this.getIngredients(id);
    },
    getRecipes() {
      this.$emit('getRecipes');
    },
    getAllRecipes() {
      this.$emit('getAllRecipes');
    },
    getSortedRecipes(tags) {
      this.displayRecipes = 'all';
      this.emptyMessage = 'No recipes found. Try some other tags.';
      this.$emit('sortRecipes', tags);
    },
    getSavedRecipes() {
      this.emptyMessage = 'No recipes found. Try exploring and save some recipes to keep them here.';
      this.$emit('getSavedRecipes');
    },
    searchRecipes() {
      this.emptyMessage = 'Nothing found, keep searching.';
      if (!this.searchTerm) {
        this.getRecipes();
        this.searchTerm = '';
      } else {
        this.$emit('searchRecipes', this.searchTerm);
      }
    },
    saveThis(id) {
      this.$emit('saveThis', id);
      this.savedRecipe = true;
    },
    removeThis() {
      this.$emit('removeThis', this.recipeId);
      this.savedRecipe = false;
    },
    alertChange(message) {
      this.$emit('alertChange', message);
    },
    displayChange(message) {
      if (this.newActive === true) {
        this.getRecipes();
        this.newActive = false;
      }
      if (message === 'recipe') {
        this.editing = false;
      } else if (message === 'edit') {
        this.editing = true;
      }
      this.$emit('displayChange', message);
    },
  },

  mounted() {
    this.getRecipes();
    this.getSavedRecipes();
    this.getAllRecipes();
  },

};
