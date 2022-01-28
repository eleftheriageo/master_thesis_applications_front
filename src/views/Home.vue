<template>
  <div class="box content has-text-centered">
    <br><br>
    <h2 class="title-is-2">Welcome {{loggedUser.username}}</h2>
    <br><br>
  </div>
</template>

<script>
export default {
  name: "Home",

  data: () => ({
    loggedUser: " ",
    user:""
  }),
  computed: {
    loggedIn() {
      console.log(this.$store.state.auth.status.loggedIn);
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.loggedUser = this.$store.state.auth.user;
    }
  },
};
</script>