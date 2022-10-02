<template>
  <div>
    <div class="tag-main-box" v-bind:class="{editMode : mode == 'edit' }">
      <div class="tag-box" v-bind:class="{editMode : mode == 'edit' }">
        <div class="tag tag-a"
          v-bind:class="{disabled : tag.inUse === true }"
          v-for="tag in tagListA"
          v-bind:key="tag.id"
          v-on:click="toggleTag(tag)"
          >
          {{ tag.text }}
        </div>
      </div>
      <div class="tag-box" v-bind:class="{editMode : mode == 'edit' }">
        <div class="tag tag-b"
          v-bind:class="{disabled : tag.inUse === true }"
          v-for="tag in tagListB"
          v-bind:key="tag.id"
          v-on:click="toggleTag(tag)">
          {{ tag.text }}
        </div>
      </div>
      <div class="tag-box" v-bind:class="{editMode : mode == 'edit' }">
        <div class="tag tag-c"
          v-bind:class="{disabled : tag.inUse === true }"
          v-for="tag in tagListC"
          v-bind:key="tag.id"
          v-on:click="toggleTag(tag)">
          {{ tag.text }}
        </div>
      </div>
      <div class="tag-box" v-bind:class="{editMode : mode == 'edit' }">
        <div class="tag tag-d"
          v-bind:class="{disabled : tag.inUse === true }"
          v-for="tag in tagListD"
          v-bind:key="tag.id"
          v-on:click="toggleTag(tag)">
          {{ tag.text }}
        </div>
      </div>
      <div class="tag-box" v-bind:class="{editMode : mode == 'edit' }">
        <div class="tag tag-e"
          v-bind:class="{disabled : tag.inUse === true }"
          v-for="tag in tagListE"
          v-bind:key="tag.id"
          v-on:click="toggleTag(tag)">
          {{ tag.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./tag-box.js"></script>

<style scoped="true" src="./tag-box.css"></style>
