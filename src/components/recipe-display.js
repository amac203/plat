import StepTile from './Step-Tile.vue'
import TagBox from './Tag-Box.vue'
import SelectedTagBox from './Selected-Tag-Box.vue'
import CommentContainer from './Comment-Container.vue'

import kale from "../assets/kale.jpeg"
import paper from "../assets/paper.jpeg"
import chilli from "../assets/chilli.jpeg"
import sourdough from "../assets/sourdough.jpeg"
import pies from "../assets/pies.jpeg"
import soup from "../assets/soup.jpeg"
import plate from "../assets/plate.jpeg"
import wheatBGElement from "../assets/wheatBGElement.svg"
import spicy from "../assets/spicy.png"


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
    CommentContainer
  },
  data: function() {
    return {
      kale: kale,
      paper: paper,
      chilli: chilli,
      sourdough: sourdough,
      pies: pies,
      wheatBGElement: wheatBGElement,
      spicy: spicy,
      soup: soup,
      plate: plate,

      comments : [],

      newIngredient: { name: "add new", qty: "quantity"},
      newComment: { text: "add comment", author: this.userName},

      selectedStepIndex: 0,
      selectedId: Object,

      tagBox: 0,
      saveMessage: "",
      urlString: 'https://plat-342902.ts.r.appspot.com/',
    }
  },
  computed: {
    recipeBGImage: function() {
      if (this.recipeBG == 'pies'){
        return pies
      } else if (this.recipeBG == 'soup'){
          return soup
      } else if (this.recipeBG == 'sourdough'){
          return sourdough
      } else if (this.recipeBG == 'chilli'){
          return chilli
      } else if (this.recipeBG == 'kale'){
          return kale
      } else {
        return plate
      }
    },
    displayTitle: {
      get: function() {
        return this.title
      },
      set: function(newValue) {
        this.$emit('update:title', newValue)
        return newValue
      }
    },
    displaySubtitle: {
      get: function() {
        return this.subtitle
      },
      set: function(newValue) {
        this.$emit('update:subtitle', newValue)
        return newValue
      }
    },
    editedTags: {
      get: function() {
        return this.tags
      },
      set: function(newValue) {
        this.$emit('update:tags', newValue)
        return newValue
      }
    },
    visibleStep: function () {
      return this.steps[this.selectedStepIndex]
    },
    initialID: function(){
      return this.steps[0]._id
    },

  },
  watch: {
    initialID(newID){
      this.selectStep(newID)
      this.getComments(newID)
    },
    ingredients(){
      if (this.ingredients.length == 0 && !this.editing) {
        this.$emit('alertChange', 'noIngredients')
      }
    },


  },
  methods: {
    editToggle: function () {
      if (this.editing) {
        this.$emit('displayChange', 'recipe')
        this.$emit('alertChange', 'home')
        this.saveIngredients()
        this.saveSteps()
        this.editing = !this.editing
      } else {
        this.tags.forEach(tag => tag.inUse = true)
        this.$emit('displayChange', 'edit')
        this.$emit('alertChange', 'edit')
        this.editing = !this.editing
      }
    },
    saveThis: function () {
      this.$emit('saveThis', this.recipeId)
      this.savedRecipe = 1
      this.$emit('alertChange', 'saved')
    },
    addTag: function (tag) {
      if (this.tags.length < 3){
        this.tags.push(tag)
      }
      this.$emit('saveUpdates')
    },
    removeTag: function (tag) {
      const removeTag = this.tags.findIndex(element => element.text === tag.text)
      this.tags.splice(removeTag, 1)
      if (this.tags.length == 0) {
        this.$emit('alertChange', 'noTags')
      } else {
        this.$emit('saveUpdates')
      }
    },
    keyDown: function () {
      this.alertChange("edit")
    },
    alertChange: function(message){
      this.$emit('alertChange', message)
    },
    saveUpdates: function () {
      this.$emit('saveUpdates')
    },
    saveIngredients:function (){
      this.ingredients.forEach((ingredient) => {this.saveIngredient(ingredient)})
    },
    saveIngredient: function (ingredient) {
      if (ingredient._id) {
        this.$emit('saveIngredient', ingredient)
      }
    },
    addNewIngredient: function () {
      this.$emit('addNewIngredient', this.newIngredient)
      this.newIngredient = { name: "add new", qty: "quantity"}
    },
    deleteIngredient: function (id){
      this.$emit('deleteIngredient', id)
    },
    newStep: function() {
      this.$emit('newStepClicked')
    },
    selectStep: function(id) {
      this.getComments(id)
      this.steps[this.selectedStepIndex].selected = false
      const selectedIndex = this.steps.findIndex(element => element._id === id)
      this.steps[selectedIndex].selected = true
      this.selectedStepIndex = selectedIndex
    },
    saveSteps: function (){
      this.steps.forEach((step) => {this.saveStep(step)})
    },
    saveStep: function(step) {
      this.$emit('saveStep', step)
    },
    getComments: function(stepID){
      var url = this.urlString + 'comments/' + stepID
      var requestOptions = {
     'content-type': 'application/json',
      method: 'GET',
      redirect: 'follow'
    };
      fetch(url, requestOptions
      ).then(response => response.json()).then(data => this.comments = data);
    },
    addComment: function(text){
      this.newComment.text = text
      var url = this.urlString + 'comments/' + this.steps[this.selectedStepIndex]._id
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(this.newComment),
        }).then(
        );
    },
    copyLink: function(){
      navigator.clipboard.writeText('plat.kitchen/' + this.linkCode);
      this.alertChange('')
    }
  },

}
