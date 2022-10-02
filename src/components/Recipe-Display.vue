<template>
  <div class="recipe-body" v-bind:class="{editGrid : editing}">
    <div class="recipe-header" v-if="!editing">
      <div class="name-box">
        <div class="display-name">
          {{ title }}
        </div>
        <div class="author-name">
          by {{ author }}
        </div>
      </div>
      <div class="display-subtitle">
        {{ subtitle }}
      </div>
      <div class="share-buttons">
        <div class="help-text">share it:</div>
        <div class="help-text" id="link">plat.kitchen/{{linkCode}}</div>
        <div class="small-button" v-on:click="copyLink()">
          copy link
        </div>
      </div>
      <div class="tag-container">
        <div class="tag-d"
          v-for="tag in tags"
          v-bind:key="tag.id">
          {{ tag.text }}
        </div>
        <div v-if="ownRecipe" class="nice-button" id="editButton" v-on:click="editToggle()">
          EDIT
        </div>
        <div v-if="!savedRecipe && !ownRecipe" class="nice-button" id="saveButton" v-on:click="saveThis()">
          save it
        </div>
        <div v-if="savedRecipe && !ownRecipe" class="nice-button" id="unSaveButton" v-on:click="removeThis()">
          un-save
        </div>
      </div>
    </div>
    <div class="recipe-header" style="align-items: flex-end;" v-if="editing" v-bind:class="{editHeader : editing}">
      <div class="name-box">
        <div class="nice-button" style="margin:0.3em" v-on:click="editToggle()">
          save
        </div>
        <input maxlength='25' @focus="$event.target.select()" v-model="displayTitle"
        class="display-name small-input" v-on:keyup="saveUpdates()">
      </div>
      <input maxlength='75' @focus="$event.target.select()" v-model="displaySubtitle"
      class="display-subtitle smaller-input" v-on:keyup="saveUpdates()">
      <div class="edit-tags" v-if="editing">
        <div class="tag-container-edit">
          <div class="help-text">Selected tags:</div>
          <selected-tag-box
          v-bind:selectedTags="tags"
          v-on:removeTag="removeTag($event)">
          </selected-tag-box>
        </div>
        <tag-box
          v-bind:mode="'edit'"
          v-on:addTag="addTag($event)"
          v-on:removeTag="removeTag($event)"
          v-bind:selectedTags="tags"
          style= "align-self: center">
        </tag-box>
      </div>
    </div>

    <div v-if="!editing" class="ingredient-container">
      <div class="ingredient-item"
        v-for="ingredient in ingredients"
        v-bind:key="ingredient._id"
        v-bind:name="ingredient.name"
        v-bind:quantity="ingredient.qty">
        <div class="ingredient-name">
          {{ ingredient.name }}
        </div>
        <div class="ingredient-quantity" v-if="ingredient.qty">
          {{ ingredient.qty }}
        </div>
      </div>
    </d
    iv>

    <div v-if="editing" class="ingredient-container">
      <div class="ingredient-item"
        v-for="ingredient in ingredients"
        v-bind:key="ingredient._id"
        v-bind:name="ingredient.name"
        v-bind:quantity="ingredient.qty">
        <input maxlength='30' @focus="$event.target.select()" class="ingredient-name ingredient-input-big"
        v-model="ingredient.name" v-on:keydown="keyDown()">
        <input maxlength='15' @focus="$event.target.select()" class="ingredient-quantity ingredient-input"
        v-model="ingredient.qty" v-on:keydown="keyDown()">
        <div class="small-button" v-on:click="deleteIngredient(ingredient._id)">x</div>
      </div>
      <div class="ingredient-item" v-if="ingredients.length <= 11">
        <input maxlength='30' @focus="$event.target.select()" class="ingredient-name ingredient-input-big" v-model="newIngredient.name">
        <input maxlength='15' @focus="$event.target.select()" class="ingredient-quantity ingredient-input" v-model="newIngredient.qty">
        <div class="small-button" v-on:click="addNewIngredient()">add</div>
      </div>
    </div>

    <div class="step-number-container" >
      <div class="step-number"
        v-bind:class="{selected : step.selected }"
        v-for="(step, index) in steps"
        v-bind:key="step._id"
        :id="index"
        v-on:click="selectStep(step._id)">
        {{ index + 1 }}
      </div>
    </div>
    <div id="wheatBG" v-bind:style="{backgroundImage: 'url(' + wheatBGElement + ' )' }"></div>

    <div v-if="!editing" class="step-container" v-bind:style="{backgroundImage: 'url(' + paper + ' )' }">
      <step-tile v-if="visibleStep"
        :name="visibleStep.name"
        :text="visibleStep.text"
        :editing='0'
      >
      </step-tile>
      <comment-container v-if="userName"
        v-on:addComment="addComment($event)"
        :comments="comments"
        :userName="userName">
      </comment-container>
    </div>

    <div v-if="editing" class="step-container edit-step" v-bind:style="{backgroundImage: 'url(' + paper + ' )' }">
      <step-tile v-if="visibleStep"
        :name="visibleStep.name"
        v-on:update:name="visibleStep.name = $event"
        :text="visibleStep.text"
        v-on:update:text="visibleStep.text = $event"
        :editing='1'
        >
      </step-tile>
      <div class="nice-button" v-if="steps.length < 5" style="margin-top:0.6em" v-on:click="newStep()">
        new step
      </div>
    </div>
    <div id="spicy" v-bind:style="{backgroundImage: 'url(' + spicy + ' )' }" v-if="!editing"></div>
    <div class="img-container" v-bind:style="{backgroundImage: 'url(' + recipeBGImage + ' )' }" >
    </div>
  </div>
</template>

<script src="./recipe-display.js"></script>

<style scoped="true" src="./recipe-display.css"></style>
