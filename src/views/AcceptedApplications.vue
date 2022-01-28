<template>
  <div>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Accepted Applications</p>
      </header>
      <div class="card-content">
        <br />
        <b-message v-if="filtered_apps2.length === 0" type="is-danger">
          No applications found !
        </b-message>
        <b-table v-if="filtered_apps2.length > 0" :data="filtered_apps2">
          <b-table-column label="ID">
            <template v-slot="props">
              {{ props.row.id }}
            </template>
          </b-table-column>
          <b-table-column label="Degree">
            <template v-slot="props">
              {{ props.row.degree }}
            </template>
          </b-table-column>
          <b-table-column label="Thesis Title">
            <template v-slot="props">
              {{ props.row.thesisTitle }}
            </template>
          </b-table-column>
          <b-table-column label="Actions">
            <template v-slot="props">
              <div class="buttons">
                <button
                  class="button is-primary"
                  @click="viewApplication(props.row)"
                >
                  View
                </button>
              </div>
            </template>
          </b-table-column>
        </b-table>
      </div>
    </div>

    <b-modal has-modal-card trap-focus v-model="viewApplicationModal">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">View Application</p>
          <button
            type="button"
            class="delete"
            @click="viewApplicationModal = false"
          />
        </header>
        <section class="modal-card-body">
          <p>
            <strong class="is-size-5">Thesis Title : </strong
            ><span class="is-size-6">{{ this.application.thesisTitle }}</span>
          </p>
          <p>
            <strong class="is-size-5">Degree : </strong
            ><span class="is-size-6">{{ this.application.degree }}</span>
          </p>
          <p>
            <strong class="is-size-5"> Referral 1 : </strong
            ><span class="is-size-6">{{ this.ref1.text }}</span>
          </p>
          <p>
            <strong class="is-size-5"> Referral 2 : </strong
            ><span class="is-size-6">{{ this.ref2.text }}</span>
          </p>
          <p>
            <strong class="is-size-5"> Student : </strong
            ><span class="is-size-6"
              >{{ this.student.firstName }} {{ this.student.lastName }}</span
            >
          </p>
          <b-field label="Rank">
            <b-numberinput
              class="is-black"
              v-model="app_rank.rank"
              required
              :min="1"
            ></b-numberinput>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <b-button label="Close" @click="viewApplicationModal = false" />
          <button class="button is-primary" @click="rankApplication">
            Rank
          </button>
        </footer>
      </div>
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
    applications: [],
    applications_reviewed: [],
    applications_ranking:[],
    application: {},
    app_rank: {},
    ref1: {},
    ref2: {},
    master: {},
    student: {},
    viewApplicationModal: false,
  }),
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    filtered_apps: function () {
      return this.applications.filter((o1) =>
        this.applications_reviewed.some(
          (o2) => o1.id === o2.application_id && o2.accepted === true
        )
      );
    },
    filtered_apps2: function () {
      return this.filtered_apps.filter((o1) =>
        !this.applications_ranking.some(
          (o2) => o1.id === o2.application_id
        )
      );
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
        .get("http://localhost:8081/applications/", {
          headers: authHeader(),
        })
        .then((response) => (this.applications = response.data));
      axios
        .get("http://localhost:8081/applicationreviews/", {
          headers: authHeader(),
        })
        .then((response) => (this.applications_reviewed = response.data));
      axios
        .get("http://localhost:8081/applicationraking/", {
          headers: authHeader(),
        })
        .then((response) => (this.applications_ranking = response.data));
    },

    viewApplication(app) {
      this.application = app;
      axios
        .get("http://localhost:8081/referrals/" + app.referralId1, {
          headers: authHeader(),
        })
        .then((response) => (this.ref1 = response.data));
      axios
        .get("http://localhost:8081/referrals/" + app.referralId2, {
          headers: authHeader(),
        })
        .then((response) => (this.ref2 = response.data));
      axios
        .get("http://localhost:8081/masters/" + app.masterId, {
          headers: authHeader(),
        })
        .then((response) => (this.master = response.data));
      axios
        .get("http://localhost:8081/users/" + app.studentId, {
          headers: authHeader(),
        })
        .then((response) => (this.student = response.data));
      this.viewApplicationModal = true;
    },
    rankApplication() {
      this.app_rank.application_id = this.application.id;
      this.app_rank.professors_id = [this.loggedUser.id];
      axios
        .post("http://localhost:8081/applicationraking/", this.app_rank, {
          headers: authHeader(),
        })
        .then(() => this.$router.go(0));
    },
  },
};
</script>
