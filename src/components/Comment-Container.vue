<template>
  <div class="comment-container-parent">
    <div class="comment-container">
      <div class="comment-box">
        <div class="comment"
          v-for="(comment, index) in comments"
          v-bind:key="comment._id"
          v-bind:class="{even : index % 2 == 1 }"
          >
          <div class="comment-text">{{ comment.text }}</div>
          <div class="comment-user">{{ comment.author }}
            <div class="small-button" v-if="comment.author == userName" v-on:click="deleteComment(comment._id)">x</div>
          </div>
        </div>
      </div>
    </div>
    <div class="comment-box" style="width:70%">
      <input style="width:90%" maxlength='150' @focus="$event.target.select()" v-model="newComment">
      <div class="nice-button" v-on:click="addComment()">
        save
      </div>
    </div>
  </div>
</template>

<script src="./comment-container.js"></script>

<style src="./comment-container.css"></style>
