<template>
  <div>
  <div class="dashboard" v-bind:style="{backgroundImage: 'url(' + herbs + ' )' }" v-if="displayMode == 'dashboard'">
    <div class="filter-box">
        <input class="search-input" v-model="searchTerm" v-on:keyup="searchRecipes()"
          @focus="$event.target.select()">
        <div class="help-text">Filter recipes by tag:</div>
        <tag-box style="z-index: 1"
          v-on:addTag="addTag($event)"
          v-on:removeTag="removeTag($event)"
          >
        </tag-box>
        <div v-if="selectedTags.length" class="dash-active-filters">
            <div class="help-text">Currently filtering by:</div>
            <selected-tag-box
              v-bind:selectedTags="selectedTags"
              v-on:removeTag="removeTag($event)">
            </selected-tag-box>
        </div>
    </div>
    <div class="dash-img" v-bind:style="{backgroundImage: 'url(' + food + ' )' }">
    </div>
    <div id="newRecipe" >
      <div class="nice-button" v-on:click="newRecipe()">
        New Recipe
      </div>
    </div>
    <div class="tab-container" >
      <div class="tab-button"
        v-bind:class="{selectedTab : this.displayRecipes == 'my' }"
        v-on:click="selectTab('my')">
        My Recipes
      </div>
      <div class="tab-button"
        v-bind:class="{selectedTab : this.displayRecipes == 'saved' }"
        v-on:click="selectTab('saved')">
        Saved List
      </div>
      <div class="tab-button"
        v-bind:class="{selectedTab : this.displayRecipes == 'all' }"
        v-on:click="selectTab('explore')">
        Explore
      </div>
    </div>
    <div class="body-shadow tile-box-shadow"></div>
    <div class="recipe-tile-box" v-if="displayRecipes == 'my'">
        <recipe-tile
          v-for="recipe in recipes"
          v-bind:key="recipe._id"
          v-bind:name="recipe.title"
          v-bind:author="recipe.author"
          v-bind:subtitle="recipe.subtitle"
          v-bind:id="recipe._id"
          v-bind:authorUID="recipe.authorUID"
          v-on:recipeClicked="recipeClicked(
            recipe._id,
            recipe.title,
            recipe.subtitle,
            recipe.author,
            recipe.tags,
            recipe.authorUID,
            recipe.link,
            )"
        ></recipe-tile>
        <div class="empty-message" v-if="recipes.length == 0">

            Create your first recipe and it will be saved in here.
            <img v-bind:src="pieGone" style="width:10em; padding-top:1em">

        </div>
    </div>
    <div class="recipe-tile-box" v-if="displayRecipes == 'saved'">
        <recipe-tile
          v-for="savedRecipe in savedRecipes"
          v-bind:key="savedRecipe._id"
          v-bind:name="savedRecipe.title"
          v-bind:author="savedRecipe.author"
          v-bind:subtitle="savedRecipe.subtitle"
          v-bind:id="savedRecipe._id"
          v-bind:authorUID="savedRecipe.authorUID"
          v-on:recipeClicked="recipeClicked(
            savedRecipe._id,
            savedRecipe.title,
            savedRecipe.subtitle,
            savedRecipe.author,
            savedRecipe.tags,
            savedRecipe.authorUID,
            savedRecipe.link,
            )"
        ></recipe-tile>
        <div class="empty-message" v-if="savedRecipes.length == 0">
          {{ emptyMessage }}
          <img v-bind:src="pieGone" style="width:10em; padding-top:1em">
        </div>
    </div>
    <div class="recipe-tile-box" v-if="displayRecipes == 'all'">
        <recipe-tile
          v-for="recipe in allRecipes"
          v-bind:key="recipe._id"
          v-bind:name="recipe.title"
          v-bind:author="recipe.author"
          v-bind:subtitle="recipe.subtitle"
          v-bind:id="recipe._id"
          v-bind:authorUID="recipe.authorUID"
          v-on:recipeClicked="recipeClicked(
            recipe._id,
            recipe.title,
            recipe.subtitle,
            recipe.author,
            recipe.tags,
            recipe.authorUID,
            recipe.link,
            )"
        ></recipe-tile>

    </div>
    <div class="body-shadow filter-box-shadow"></div>


  </div>
    <recipe-display v-if="displayMode == 'recipe'"
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
      v-bind:ownRecipe="ownRecipe"
      v-bind:savedRecipe="savedRecipe"
      v-bind:editing="editing"
      v-bind:recipeBG="recipeBG"
      v-bind:userName="userName"
      v-on:saveUpdates="saveUpdates()"
      v-on:saveStep="saveStep($event)"
      v-on:saveThis="saveThis($event)"
      v-on:newStepClicked="newStepClicked()"
      v-on:addNewIngredient="newIngredient($event)"
      v-on:saveIngredient="saveIngredient($event)"
      v-on:deleteIngredient="deleteIngredient($event)"
      v-on:alertChange="alertChange($event)"
      v-on:displayChange="displayChange($event)">
    </recipe-display>
  </div>
</template>

<script src="./dashboard-tab.js"></script>

<style src="./dashboard.css"></style>
