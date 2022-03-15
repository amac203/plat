<template>
  <div class="splash">
  <img class="bgElement" :src="greenBGElement" />
  <div class="splash-background" v-bind:style="{backgroundImage: 'url(' + splashImage + ' )' }">
    <img class="logo" :src="fullLogo" />
    <div style="z-index: 1">
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
      <div class="nice-button" v-on:click="getStarted()">get started</div>
    </div>
    <img class="bgElement2" :src="wheatBGElement" />
  </div>

</div>
</template>

<script src="./splash.js"></script>

<style src="./splash.css"></style>
