<template>
  <div>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Users</p>
        <b-button class="card-header-icon" @click="openUserModal">
          Create
        </b-button>
      </header>
      <div class="card-content">
        <br />
        <b-message v-if="users.length === 0" type="is-danger">
          No users found !
        </b-message>
        <b-table v-if="users.length > 0" :data="users" :columns="columns">
        </b-table>
      </div>
    </div>

    <b-modal has-modal-card trap-focus v-model="createUserModal">
      <form @submit.prevent="createUser">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">Create User</p>
            <button
              type="button"
              class="delete"
              @click="createUserModal = false"
            />
          </header>
          <section class="modal-card-body">
            <b-field label="Username">
              <b-input
                v-model="user.username"
                required
                maxlength="30"
              ></b-input>
            </b-field>
            <b-field label="Email">
              <b-input
                type="email"
                v-model="user.email"
                required
                maxlength="30"
              >
              </b-input>
            </b-field>
            <b-field label="Password">
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
            <b-field label="First Name">
              <b-input
                v-model="user.firstName"
                required
                maxlength="30"
              ></b-input>
            </b-field>
            <b-field label="LastName">
              <b-input
                v-model="user.lastName"
                required
                maxlength="30"
              ></b-input>
            </b-field>
            <b-field label="Type">
              <b-select v-model="user.type" placeholder="Select a type" required>
                <option v-for="option in types" :value="option" :key="option">
                  {{ option }}
                </option>
              </b-select>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <b-button label="Close" @click="createUserModal = false" />
            <button class="button is-primary" type="submit">Create</button>
          </footer>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import authHeader from "../service/auth-header";
export default {
  name: "Users",
  data: () => ({
    loggedUser: " ",
    users: [],
    user: {},
    hasError: false,
    createUserModal: false,
    types: ["Student", "Teacher"],
    columns: [
      {
        field: "id",
        label: "ID",
      },
      {
        field: "username",
        label: "Username",
      },
      {
        field: "email",
        label: "Email",
      },
      {
        field: "firstName",
        label: "First Name",
      },
      {
        field: "lastName",
        label: "Last Name",
      },
      {
        field: "type",
        label: "Type",
      },
    ],
  }),
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.loggedUser = this.$store.state.auth.user;
      this.get();
    }
  },
  methods: {
    get() {
      axios
        .get("http://localhost:8081/users/", {
          headers: authHeader(),
        })
        .then((response) => (this.users = response.data));
    },
    openUserModal() {
      this.createUserModal = true;
    },
    createUser() {
      if (this.user.password != this.user.confirmPassword) {
        this.hasError = true;
        return false;
      }
      this.user.role = "ROLE_USER";
      axios
        .post("http://localhost:8081/users/register/", this.user, {
          headers: authHeader(),
        })
        .then(() => this.$router.go(0));
    },
  },
};
</script>
