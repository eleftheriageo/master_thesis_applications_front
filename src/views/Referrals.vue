<template>
  <div>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">My Referrals</p>
        <b-button class="card-header-icon" @click="openReferralModal">
          Create
        </b-button>
      </header>
      <div class="card-content">
        <br />
        <b-message v-if="referrals.length === 0" type="is-danger">
          No referrals found !
        </b-message>
        <b-table v-if="referrals.length > 0" :data="referrals">
          <b-table-column label="ID">
            <template v-slot="props">
              {{ props.row.id }}
            </template>
          </b-table-column>
          <b-table-column label="Text">
            <template v-slot="props">
              {{ props.row.text }}
            </template>
          </b-table-column>
          <b-table-column label="Actions">
            <template v-slot="props">
              <div class="buttons">
                <button
                  class="button is-primary"
                  @click="deleteRef(props.row.id)"
                >
                  Delete
                </button>
              </div>
            </template>
          </b-table-column>
        </b-table>
      </div>
    </div>

    <b-modal has-modal-card trap-focus v-model="createRefModal">
      <form @submit.prevent="createReferral">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">Create Referral</p>
            <button
              type="button"
              class="delete"
              @click="createRefModal = false"
            />
          </header>
          <section class="modal-card-body">
            <b-field label="Text">
              <b-input v-model="newReferral.text" type="text" required>
              </b-input>
            </b-field>
            <b-field label="Student">
              <b-select
                placeholder="Select a student"
                v-model="newReferral.student_id"
                required
              >
                <option
                  v-for="student in students"
                  :value="student.id"
                  :key="student.id"
                >
                  {{ student.firstName }} {{ student.lastName }}
                </option>
              </b-select>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <b-button label="Close" @click="createRefModal = false" />
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
  name: "Referrals",
  data: () => ({
    loggedUser: " ",
    referrals: [],
    students: [],
    newReferral: {},
    createRefModal: false,
    columns: [
      {
        field: "id",
        label: "ID",
      },
      {
        field: "text",
        label: "Text",
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
        .get("http://localhost:8081/referrals/" , {
          headers: authHeader(),
        })
        .then((response) => (this.referrals = response.data.filter((tr) => tr.professor_id === this.loggedUser.id)));
    },
    openReferralModal() {
      axios
        .get("http://localhost:8081/users/", {
          headers: authHeader(),
        })
        .then((response) => (this.students = response.data.filter((tr) => tr.type === "Student")));
      this.createRefModal = true;
    },
    createReferral() {
      this.newReferral.professor_id = this.loggedUser.id;
      axios
        .post("http://localhost:8081/referrals/", this.newReferral, {
          headers: authHeader(),
        })
        .then(() => this.$router.go(0));
    },
    deleteRef(id) {
      axios
        .delete("http://localhost:8081/referrals/" + id, {
          headers: authHeader(),
        })
        .then(() => this.$router.go(0));
    },
  },
};
</script>
