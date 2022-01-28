<template>
  <div>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Register</p>
      </header>
      <form @submit.prevent="register">
        <div class="card-content">
          <b-field label="Username" horizontal>
            <b-input v-model="user.username" required maxlength="30"></b-input>
          </b-field>
          <b-field label="Email" horizontal>
            <b-input type="email" v-model="user.email" required maxlength="30">
            </b-input>
          </b-field>
          <b-field label="Password" horizontal>
            <b-input
              type="password"
              v-model="user.password"
              required
              password-reveal
              minlength="5"
            >
            </b-input>
          </b-field>
          <b-field
            label="Confirm Password"
            :type="{ 'is-danger': hasError }"
            :message="[{ 'Passwords must match': hasError }]"
            horizontal
          >
            <b-input
              type="password"
              v-model="user.confirmPassword"
              required
              minlength="5"
              password-reveal
            >
            </b-input>
          </b-field>
          <b-field label="First Name" horizontal>
            <b-input v-model="user.firstName" required maxlength="30"></b-input>
          </b-field>
          <b-field label="LastName" horizontal>
            <b-input v-model="user.lastName" required maxlength="30"></b-input>
          </b-field>
        </div>
        <footer class="card-footer is-justify-content-center">
          <button class="button is-white card-footer-item" type="submit">
            Register
          </button>
        </footer>
      </form>
    </div>
  </div>
</template>

<script>
import AuthService from "@/service/auth.service";
export default {
  name: "Register",
  data() {
    return {
      user: {},
      loggedUser: " ",
      indefinteToast: null,
      hasError: false,
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
    register() {
      if (this.user.password != this.user.confirmPassword) {
        this.hasError = true;
        return false;
      }
      this.user.role="ROLE_USER";
      this.user.type="Student";
      AuthService.register(this.user).then(
        () => {
          this.$buefy.toast.open({
            duration: 3000,
            message: `You have successfully registered !`,
            position: "is-bottom",
            type: "is-success",
          });
        },
        (error) => {
          console.log(error);
          this.$buefy.toast.open({
            duration: 3000,
            message: error.response.data.message,
            position: "is-bottom",
            type: "is-danger",
          });
        }
      );
    },
  },
};
</script>
