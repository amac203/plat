<template>
  <div class="tag-box tag-box-row" >
    <div class="tag tag-s"
      v-for="tag in selectedTags"
      v-bind:key="tag.id"
      v-on:click="removeTag(tag)">
      {{ tag.text }}
    </div>
  </div>
</template>

<script src="./selected-tag-box.js"></script>

<style src="./tag-box.css"></style>
