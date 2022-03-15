<template>
<div class="tile-container" v-on:click="chooseRecipe()">
  <div class="name" >
    {{ name }}
  </div>
  <div class="subtitle" v-if="subtitle">
    {{ subtitle }}
  </div>
  <div class="author-name" v-if="author">
    by {{ author }}
  </div>
</div>
</template>

<script src="./recipe-tile.js"></script>

<style src="./recipe-tile.css"></style>
