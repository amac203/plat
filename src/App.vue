<template style="background-color: #636363">
  <div id="app" v-bind:style="{backgroundImage: 'url(' + woody + ' )' }">
    <div class="headerBar">
      <div class="nice-button" v-if="anonymousUser" v-on:click="anonymousSplash()">
        sign up to keep using plat
      </div>
      <img class="headerLogo" />
      <div class="recipe-options" v-if="searchDisplay">
        <div class="nice-button" v-if="displayMode == 'recipe'" v-on:click="displayChange('dashboard')">back</div>
        <input id="headerSearch" @focus="$event.target.select()" v-model="searchTerm" v-on:keyup="searchRecipes()">
      </div>
      <div class="alertMessage">{{alertMessage}}</div>
    </div>
    <div class="splash" v-if="displayMode == 'splash'">
      <img class="bgElement" :src="greenBGElement" />
      <div class="splash-background" v-bind:style="{backgroundImage: 'url(' + splashImage + ' )' }">
        <img class="logo" :src="fullLogo" />
        <div id="splashTiles" style="z-index: 1">
          <div class="splash-tile">
            <div class="tagline">create your own recipe collection</div>
            <div class="tagline-subtitle">easy to follow step-by-step cooking flow</div>
          </div>
          <div class="splash-tile">
            <div class="tagline">share your created recipes quickly and easily</div>
            <div class="tagline-subtitle">get ideas and suggestions for each step </div>
          </div>
          <div class="splash-tile">
            <div class="tagline">get fresh ideas for cooking tonight</div>
            <div class="tagline-subtitle">quick recipes for what you feel like</div>
          </div>
          <img class="bgElement2" :src="wheatBGElement" />
          <div class="log-in-options">
            <div class="splash-tile small-sign-in">
              <div class="help-text">Sign in:</div>
              <img class="google-button" v-on:click="googleSignIn()">
            </div>
            <div class="splash-tile sign-in">
              <div class="help-text">or sign in with email:</div>
              <div class="help-text-small">If you have not signed up before, entering your email and a password will create your log-in details. </div>
              <div style="display:flex; flex-wrap:wrap; margin-bottom:0.5em">
                <input style="height: 2em" placeholder="email" v-model="userName" @focus="$event.target.select()">
                <input style="height: 2em" type="text" placeholder="password" v-model="password" @focus="$event.target.type ='password'; $event.target.value = ''">
              </div>
              <div class="error-text" v-if="error">
                {{ error }}
              </div>
              <div style="display: flex;align-items: flex-end;justify-content: space-between;">
                <div class="nice-button" v-on:click="signInUser()">
                  go
                </div>
                <div class="small-button" v-on:click="sendPassword()">
                  reset password
                </div>
              </div>
            </div>
          </div>
      </div>
      <img class="bgElement2" :src="wheatBGElement" />
    </div>

  </div>

    <dashboard-tab
      v-if="dash"
      v-bind:displayMode="displayMode"
      v-bind:recipes="recipes"
      v-bind:savedRecipes="savedRecipes"
      v-bind:allRecipes="allRecipes"
      v-bind:currentUser="currentUser"
      v-bind:selectedTab="selectedTab"
      v-bind:isNewRecipe="isNewRecipe"
      v-on:getRecipes="getRecipes()"
      v-on:getAllRecipes="getAllRecipes()"
      v-on:searchRecipes="searchByTerm($event)"
      v-on:sortRecipes="getSortedRecipes($event)"
      v-on:saveThis="saveThis($event)"
      v-on:getSavedRecipes="getSavedRecipes()"
      v-on:displayChange="displayChange($event)"
      v-on:alertChange="alertChange($event)">
    </dashboard-tab>
    <recipe-display
      v-if="displayMode == 'singleRecipe'"
      v-bind:title="displayRecipeTitle"
      v-on:update:title="displayRecipeTitle = $event"
      v-bind:subtitle="displayRecipeSubtitle"
      v-on:update:subtitle="displayRecipeSubtitle = $event"
      v-bind:recipeId="displayRecipeId"
      v-bind:author="displayRecipeAuthor"
      v-bind:steps="steps"
      v-bind:ingredients="ingredients"
      v-bind:tags="displayTags"
      v-bind:linkCode="linkCode"
      v-on:saveUpdates="saveUpdates()"
      v-on:saveStep="saveStep($event)"
      v-on:saveThis="saveThisToNew($event)"
      v-on:newStepClicked="newStepClicked()"
      v-on:addNewIngredient="newIngredient($event)"
      v-on:saveIngredient="saveIngredient($event)"
      v-on:deleteIngredient="deleteIngredient($event)"
      v-on:alertChange="alertChange($event)"
      v-on:displayChange="displayChange($event)">
    </recipe-display>
    <div v-if="currentUser.displayName" class="small-button" style="margin:0.3em 0.3em 0.3em 0.3em" v-on:click="signOut()">
      sign out
    </div>
  </div>

</template>

<script>

import DashboardTab from './components/Dashboard-Tab.vue'
import RecipeDisplay from './components/Recipe-Display.vue'
import woody from "./assets/woody.jpeg"

import { initializeApp } from "firebase/app";
import { getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    sendPasswordResetEmail,
    signOut,

   } from "firebase/auth";

import splashImage from "./assets/friends2.jpeg"
import fullLogo from "./assets/fullLogo.svg"
import spicy from "./assets/spicy.svg"
import greenBGElement from "./assets/greenBGElement.svg"
import wheatBGElement from "./assets/wheatBGElement.svg"

const firebaseConfig = {
  apiKey: "AIzaSyAyhHr6HkYF7_1ABk_fL3yTlBhy8gU8sKc",
  authDomain: "plat-342902.firebaseapp.com",
  projectId: "plat-342902",
  storageBucket: "plat-342902.appspot.com",
  messagingSenderId: "1031239292004",
  appId: "1:1031239292004:web:2a8adb458bdc24c338fb71",
  measurementId: "G-6Q0GPX3J28"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export default {
  name: 'App',
  data: function (){
    return {
      displayMode: '',
      alertMessage: "Welcome to Plat. Share your food!",
      woody: woody,
      searchDisplay: false,
      searchTerm: "find another recipe",
      recipes: [],
      savedRecipes: [],
      allRecipes: [],
      splash: true,
      dash: false,
      urlString: 'https://plat-342902.ts.r.appspot.com/',
      //urlString: 'http://localhost:3000/',
      selectedRecipe: Object,
      displayRecipeId: "",
      displayRecipeTitle: "",
      displayRecipeSubtitle: "",
      displayRecipeAuthor: "",
      displayTags: [],
      steps: [],
      ingredients: [],
      selectedTab: "my",

      splashImage: splashImage,
      fullLogo: fullLogo,
      spicy: spicy,
      greenBGElement: greenBGElement,
      wheatBGElement: wheatBGElement,
      tagline: "Cultivate Creativity",

      userName: "email",
      password: "password",

      currentUser: Object,
      anonymousUser: false,
      toBeSavedId: "",
      error: "",
      isNewRecipe: false
    }
  },
  computed: {
    pathName: function(){
      return window.location.pathname
    },
  },
  watch: {

  },
  components: {
    DashboardTab,
    RecipeDisplay,
  },
  methods: {
    async recipePath() {
        if (this.pathName.length > 1){
          var url = this.urlString + 'recipes' + this.pathName
          var requestOptions = {
         'content-type': 'application/json',
          method: 'GET',
          redirect: 'follow'
        };
          fetch(url, requestOptions
          ).then(response => response.json()).then(data => {
            this.displayChange('singleRecipe');
            if(!this.currentUser) {
              this.anonymousUser = true;
              this.alertChange('anon');}
            this.selectedRecipe = data;
            this.getSteps(this.selectedRecipe._id);
            this.getIngredients(this.selectedRecipe._id);
            this.displayRecipeId = this.selectedRecipe.id;
            this.displayRecipeTitle = this.selectedRecipe.title;
            this.displayRecipeSubtitle = this.selectedRecipe.subtitle;
            this.displayRecipeAuthor = this.selectedRecipe.author;
            this.displayTags = this.selectedRecipe.tags;
            this.linkCode = this.selectedRecipe.link;
            }
          );
        }

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
    alertChange: function(message) {
      switch(message){
      case 'home':
        this.alertMessage = "Welcome to Plat."
      break
      case 'dash':
        this.alertMessage = "Hi " + this.currentUser.displayName + ". Choose up to 5 tags to find a recipe for you."
      break
      case 'edit':
        this.alertMessage = "Now editing. Use up to 3 tags, 5 steps, & 10 ingredients."
      break
      case 'filter':
        this.alertMessage = 'Displaying filtered recipes. Click an active tag to remove it from the filter criteria (Up to 5 tags).'
      break
      case 'recipe':
        this.alertMessage = 'You can leave a suggestion on any step of a recipe. Get creative.'
      break
      case 'copied':
        this.alertMessage = "Copied the link to the clipboard. Share it with a friend."
      break
      case 'noTags':
        this.alertMessage = "Add 3 tags to your recipe. This will help it be sorted."
      break
      case 'noIngredients':
        this.alertMessage = "Click 'edit' just below to add some ingredients."
      break
      case 'anon':
        this.alertMessage = "Click 'save it' to keep it to check any time, on any device."
      break
      case 'user':
        this.alertMessage = "Welcome to your recipe collection, " + this.currentUser.displayName + "."
      break
      case 'saved':
        this.alertMessage = "Saved it to your recipe collection."
      break
      case 'newSignUp':
        this.alertMessage = "Sign in below to start your recipe collection."
      break
      case 'signOut':
        this.alertMessage = "You have been signed out, come again soon please."
      break
      default:
        this.alertMessage = "Plat."
      }
    },
    displayChange: function(mode) {
      if(mode == "splash"){
        this.displayMode = "splash"
      }
      if(mode == "recipe"){
        this.splash = false
        this.displayMode = "recipe"
        this.searchTerm = "search other recipes",
        this.searchDisplay = true
      }
      if(mode == "newRecipe"){
        this.splash = false
        this.displayMode = "recipe"
        this.alertMessage = "Fill out your new recipe please."
        this.searchDisplay = false
      }
      if(mode == "singleRecipe"){
        this.splash = false
        this.displayMode = "singleRecipe"
        this.searchDisplay = false
      }
      if(mode == "edit"){
        this.searchDisplay = false
      }
      if(mode == "dashboard"){
        this.splash = false
        this.dash = true
        this.alertChange('dash')
        this.getRecipes()
        if (this.toBeSavedId){
          this.selectedTab = "saved"
          this.toBeSavedid = ""
        }
        else {
          this.selectedTab = "my"
        }
        this.displayMode = "dashboard"
        this.searchDisplay = false
      }
      window.scrollTo(0,0)
    },
    getRecipes: function(){
      var url = this.urlString + 'user/' + this.currentUser.uid
      var requestOptions = {
     'content-type': 'application/json',
      method: 'GET',
      redirect: 'follow'
    };
      fetch(url, requestOptions
      ).then(response => response.json()).then(data => this.recipes = data);
    },
    getAllRecipes: function(){
      var url = this.urlString + 'recipes'
      var requestOptions = {
     'content-type': 'application/json',
      method: 'GET',
      redirect: 'follow'
    };
      fetch(url, requestOptions
      ).then(response => response.json()).then(data => this.allRecipes = data);
    },
    async saveThis(id){
      var url = this.urlString + 'save/' + this.currentUser.uid
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(
          {recipe: id}),
        }).then(
          this.alertChange("Change saved."),
          this.getSavedRecipes()
      );
    },
    getSavedRecipes: function(){
      var url = this.urlString + 'saved/' + this.currentUser.uid
      var requestOptions = {
     'content-type': 'application/json',
      method: 'GET',
      redirect: 'follow'
    };
      fetch(url, requestOptions
      ).then(response => response.json()).then(data => this.savedRecipes = data);
    },
    getSortedRecipes: function(tags){
      var url = this.urlString + 'sort/Kstew55'
      const tagList = []
      tags.forEach((tag) => {tagList.push(tag.text)})
      console.log(tagList)
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(tagList),
        }
      ).then(response => response.json()).then(data => this.recipes = data);
    },
    searchByTerm: function(term){
      this.searchTerm = term
      this.searchRecipes()
    },
    searchRecipes: function(){
      this.displayMode = "dashboard"
      this.alertChange('dash')
      if (!this.searchTerm) {
        this.getRecipes()
        this.searchTerm = "search recipes"
      } else {
      this.emptyMessage = "No recipes found yet. Keep searching."
      var url = this.urlString + 'search/' + this.searchTerm
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        },
        }
      ).then(response => response.json()).then(data => this.recipes = data);
      }
    },
    saveThisToNew: function(id){
      if(this.anonymousUser == true){
        this.toBeSavedId = id
        this.alertChange('newSignUp')
        this.displayChange('splash')
      } else {
        this.saveThis(id)
      }

    },
    newUser: function(){
      createUserWithEmailAndPassword(auth, this.userName, this.password)
      .then((userCredential) => {
        const newEmail = userCredential.user.email
        updateProfile(userCredential.user, {
          displayName: newEmail.substring(0, newEmail.lastIndexOf("@"))
        }).then(() => {this.currentUser = userCredential.user;
                this.alertChange('user')
              })
        if (this.toBeSavedId){
          this.saveThis(this.toBeSavedId)
        }
        this.displayChange('dashboard')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode)
        alert(errorMessage)
      });
    },
    signInUser: function(){
      signInWithEmailAndPassword(auth, this.userName, this.password)
      .then((userCredential) => {
        this.currentUser = userCredential.user
        this.alertChange('user')
        this.displayChange('dashboard')
      })
      .catch((error) => {
        const errorCode = error.code;
        if(errorCode == "auth/user-not-found"){
          this.newUser()
        } else {
          this.error = error.message
        }
      });
    },

    googleSignIn: function(){
      const auth = getAuth(firebaseApp);
      var provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      signInWithPopup(auth, provider)
        .then((result) => {
          //const credential = GoogleAuthProvider.credentialFromResult(result);
          //const token = credential.accessToken;
          this.currentUser = result.user
          if (this.toBeSavedId){
            this.saveThis(this.toBeSavedId)
          }
          this.displayChange("dashboard")
          this.alertChange("user")
        }).catch((error) => {
          // Handle Errors here.
          //const errorCode = error.code;
          const errorMessage = error.message
          alert(errorMessage)
          // The email of the user's account used.
          //const email = error.email
          // The AuthCredential type that was used.
          //const credential = GoogleAuthProvider.credentialFromError(error)
          // ...
        });
    },
    signOut: function(){
      signOut(auth).then(() => {
        this.currentUser.displayName = ''
        this.alertChange('signOut')
        this.displayChange('splash')
      }).catch((error) => {
        alert(error + ' error occured. sorry.')
      });
    },
    sendPassword: function(){
      sendPasswordResetEmail(auth, this.userName)
        .then(() => {
          this.error = "Password reset email sent"
        })
        .catch((error) => {

          this.error = error.message;

        });
    }
  },
  created(){
    this.displayChange('splash')
    auth.onAuthStateChanged(user => { if(user){
      this.currentUser = user;
      if(this.displayMode !=='singleRecipe') {
        this.displayChange("dashboard")
        this.getRecipes()
        this.getSavedRecipes()
        this.getAllRecipes()
      }
    }})
    this.recipePath()
  },

}

</script>

<style src="./app.css"></style>
