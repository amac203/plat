<template>
  <div style="margin-bottom: 0.3em">
  <div class="comment-container">
    <div class="comment-box">
      <div class="comment"
        v-for="(comment, index) in comments"
        v-bind:key="comment.id"
        v-bind:class="{even : index % 2 == 1 }"
        >
        <div class="comment-text">{{ comment.text }}</div>
        <div class="comment-user">{{ comment.author }}</div>
      </div>
    </div>
  </div>
  <div class="comment-box">
    <input @focus="$event.target.select()" v-model="newComment">
    <div class="nice-button" v-on:click="addComment()">
      save
    </div>
  </div>
</div>
</template>

<script src="./comment-container.js"></script>

<style src="./comment-container.css"></style>
