<template>
  <div>
    <div class="step-tile" v-if="editing==1">
      <input maxlength='50' @focus="$event.target.select()" v-model="displayName" class="step-name">

      <textarea maxlength='350' @focus="$event.target.select()" rows="6" v-model="displayText" class="step-text">
      </textarea>

    </div>
    <div class="step-tile" v-if="editing==0">
      <div class="step-name">
        {{ displayName }}
      </div>
      <div class="step-text">
        {{ displayText }}
      </div>
    </div>
  </div>
</template>

<script src="./step-tile.js"></script>

<style src="./recipe-display.css"></style>
