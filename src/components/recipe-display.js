import StepTile from './Step-Tile.vue';
import TagBox from './Tag-Box.vue';
import SelectedTagBox from './Selected-Tag-Box.vue';
import CommentContainer from './Comment-Container.vue';

import kale from '../assets/kale.jpeg';
import paper from '../assets/paper.jpeg';
import chilli from '../assets/chilli.jpeg';
import sourdough from '../assets/sourdough.jpeg';
import pies from '../assets/pies.jpeg';
import soup from '../assets/soup.jpeg';
import plate from '../assets/plate.jpeg';
import wheatBGElement from '../assets/wheatBGElement.svg';
import spicy from '../assets/spicy.png';

export default {
  name: 'RecipeDisplay',

  props: {
    recipeId: String,
    title: String,
    subtitle: String,
    steps: Array,
    author: String,
    ingredients: Array,
    tags: Array,
    linkCode: String,
    anonymousUser: 0,
    savedRecipe: Boolean,
    ownRecipe: Boolean,
    editing: Boolean,
    recipeBG: String,
    userName: String,
  },

  components: {
    StepTile,
    TagBox,
    SelectedTagBox,
    CommentContainer,
  },

  data() {
    return {
      kale,
      paper,
      chilli,
      sourdough,
      pies,
      wheatBGElement,
      spicy,
      soup,
      plate,

      comments: [],
      newIngredient: { name: 'add new', qty: 'quantity' },
      newComment: { text: 'add comment', author: this.userName },

      selectedStepIndex: 0,
      selectedId: Object,
      tagBox: 0,
      saveMessage: '',
      urlString: 'https://plat-342902.ts.r.appspot.com/',
    };
  },

  computed: {
    recipeBGImage() {
      if (this.recipeBG === 'pies') {
        return pies;
      } if (this.recipeBG === 'soup') {
        return soup;
      } if (this.recipeBG === 'sourdough') {
        return sourdough;
      } if (this.recipeBG === 'chilli') {
        return chilli;
      } if (this.recipeBG === 'kale') {
        return kale;
      }
      return plate;
    },
    displayTitle: {
      get() {
        return this.title;
      },
      set(newValue) {
        this.$emit('update:title', newValue);
        return newValue;
      },
    },
    displaySubtitle: {
      get() {
        return this.subtitle;
      },
      set(newValue) {
        this.$emit('update:subtitle', newValue);
        return newValue;
      },
    },
    editedTags: {
      get() {
        return this.tags;
      },
      set(newValue) {
        this.$emit('update:tags', newValue);
        return newValue;
      },
    },
    visibleStep() {
      return this.steps[this.selectedStepIndex];
    },
    visibleStepID() {
      return this.steps[this.selectedStepIndex]._id;
    },
    initialID() {
      return this.steps[0]._id;
    },
  },

  watch: {
    initialID(newID) {
      this.selectStep(newID);
    },
    ingredients() {
      if (this.ingredients.length === 0 && !this.editing) {
        this.$emit('alertChange', 'noIngredients');
      }
    },
    visibleStep() {
      this.getComments(this.visibleStepID);
    },
  },

  methods: {
    editToggle() {
      if (this.editing === true) {
        this.$emit('displayChange', 'recipe');
        this.$emit('alertChange', 'recipe');
        this.saveIngredients();
        this.saveSteps();
        this.editing = false;
      } else if (this.editing === false) {
        this.tags.forEach((tag) => tag.inUse = true);
        this.$emit('displayChange', 'edit');
        this.$emit('alertChange', 'edit');
      }
    },
    saveThis() {
      this.$emit('saveThis', this.recipeId);
    },
    removeThis() {
      this.$emit('removeThis', this.recipeId);
    },
    addTag(tag) {
      if (this.tags.length < 3) {
        this.tags.push(tag);
      }
      this.$emit('saveUpdates');
    },
    removeTag(tag) {
      const removeTag = this.tags.findIndex((element) => element.text === tag.text);
      this.tags.splice(removeTag, 1);
      if (this.tags.length === 0) {
        this.$emit('alertChange', 'noTags');
      } else {
        this.$emit('saveUpdates');
      }
    },
    keyDown() {
      // TODO
    },
    alertChange(message) {
      this.$emit('alertChange', message);
    },
    saveUpdates() {
      this.$emit('saveUpdates');
    },
    saveIngredients() {
      this.ingredients.forEach((ingredient) => { this.saveIngredient(ingredient); });
    },
    saveIngredient(ingredient) {
      if (ingredient._id) {
        this.$emit('saveIngredient', ingredient);
      }
    },
    addNewIngredient() {
      this.$emit('addNewIngredient', this.newIngredient);
      this.newIngredient = { name: 'add new', qty: 'quantity' };
    },
    deleteIngredient(id) {
      this.$emit('deleteIngredient', id);
    },
    newStep() {
      this.$emit('newStepClicked');
    },
    selectStep(id) {
      this.steps[this.selectedStepIndex].selected = false;
      const selectedIndex = this.steps.findIndex((element) => element._id === id);
      this.steps[selectedIndex].selected = true;
      this.selectedStepIndex = selectedIndex;
    },
    saveSteps() {
      this.steps.forEach((step) => { this.saveStep(step); });
    },
    saveStep(step) {
      this.$emit('saveStep', step);
    },
    getComments(stepID) {
      const url = this.urlString + 'comments/' + stepID;
      const requestOptions = {
        'content-type': 'application/json',
        method: 'GET',
        redirect: 'follow',
      };
      fetch(url, requestOptions).then((response) => response.json())
        .then((data) => this.comments = data);
    },
    addComment(text) {
      this.newComment.text = text;
      const url = this.urlString + 'comments/' + this.steps[this.selectedStepIndex]._id;
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(this.newComment),
      }).then();
    },
    copyLink() {
      navigator.clipboard.writeText('plat.kitchen/' + this.linkCode);
      this.alertChange('');
    },
  },

};
