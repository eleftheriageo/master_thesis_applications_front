<template>
  <div id="app">
      <b-navbar type="is-black">
        <template #brand>
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
            <h6 class="title is-4 has-text-white">Master Thesis App</h6>
          </b-navbar-item>
        </template>
        <template v-if="loggedIn" #start>
          <b-navbar-dropdown v-if="loggedIn.type == 'Student'" label="Actions">
            <b-navbar-item
              v-for="item in studentItems"
              :key="item.link"
              :href="item.link"
            >
              {{ item.text }}
            </b-navbar-item>
          </b-navbar-dropdown>
          <b-navbar-dropdown
            v-if="loggedIn.type == 'Secretary'"
            label="Actions"
          >
            <b-navbar-item
              v-for="item in secretaryItems"
              :key="item.link"
              :href="item.link"
            >
              {{ item.text }}
            </b-navbar-item>
          </b-navbar-dropdown>
          <b-navbar-dropdown v-if="loggedIn.type == 'Teacher'" label="Actions">
            <b-navbar-item
              v-for="item in teacherItems"
              :key="item.link"
              :href="item.link"
            >
              {{ item.text }}
            </b-navbar-item>
          </b-navbar-dropdown>
        </template>

        <template #end>
          <b-navbar-item tag="div">
            <div class="buttons">
              <a v-if="!loggedIn" href="/register" class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a v-if="!loggedIn" href="/" class="button is-light"> Log in </a>
              <a @click="logOut" v-if="loggedIn" class="button is-light">
                Logout
              </a>
            </div>
          </b-navbar-item>
        </template>
      </b-navbar>
      <br />
      <div class="container" style="padding-top:30px; padding-bottom:30px;">
        <router-view />
      </div>
      <br />
      <div class="flex-wrapper">
        <div class="container">
        </div>
      <footer
        class="footer has-background-black has-text-white"
        type="is-black"
      >
        <div class="content has-text-centered">
          <p>
            <strong class="has-text-primary">Copyright 2022 :</strong> Master
            Thesis Application
          </p>
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  name: "App",

  data: () => ({
    loggedUser: " ",
    drawer: false,
    group: null,
    studentItems: [
      { link: "/applications-student", text: "My applications" },
      { link: "/create-application", text: "Create Application" },
    ],
    secretaryItems: [
      { link: "/users", text: "View Users" },
      { link: "/masters", text: "View Masters" },
      { link: "/applications", text: "View Applications" },
    ],
    teacherItems: [
      { link: "/referrals", text: "My Referrals" },
      { link: "/applications-accepted", text: "Rank Accepted Applications" },
    ],
  }),
  computed: {
    loggedIn() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    if (this.loggedIn) {
      this.loggedUser = this.$store.state.auth.user;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    },
  },
};
</script>

<style >
.container{
  padding-top: 50px;
  padding-bottom: 50px;
}
</style>