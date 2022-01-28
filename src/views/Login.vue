<template>
  <div>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Login</p>
      </header>
      <form @submit.prevent="handleLogin">
        <div class="card-content">
          <b-field label="Username" horizontal>
            <b-input v-model="user.username" required maxlength="30"></b-input>
          </b-field>
          <b-field label="Password" horizontal>
            <b-input
              type="password"
              v-model="user.password"
              required
              password-reveal
            >
            </b-input>
          </b-field>
        </div>
        <footer class="card-footer is-justify-content-center">
          <button
            class="button is-white card-footer-item"
            type="submit"
            :disabled="loading"
          >
            Login
          </button>
        </footer>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {},
      loading: false,
      loggedUser: " ",
      indefinteToast: null,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.loggedUser = this.$store.state.auth.user;
      this.$router.push("/home");
    }
  },
  methods: {
    handleLogin() {
      console.log(this.user);
      this.loading = true;
      this.$store.dispatch("auth/login", this.user).then(
        () => {
          this.loggedUser = this.$store.state.auth.user;
          this.$router.push("/home");
        },
        (error) => {
          console.log(error);
          this.loading = false;
          this.$buefy.toast.open({
            duration: 3000,
            message: `Invalid usename or password`,
            position: "is-bottom",
            type: "is-danger",
          });
        }
      );
    },
  },
};
</script>
