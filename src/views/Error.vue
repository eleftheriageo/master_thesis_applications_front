<template>
<div class="box content has-text-centered">
  <h2 class="title is-2">404</h2>
  <h4 class="subtitle is-4">The page you are looking for doesnt exist !</h4>
  <hr>
    <p><b-button @click="$router.go(-1)" class="is-primary">Go back</b-button></p>
</div>
</template>
<script>

export default {
  name: "Error",
}
</script>
