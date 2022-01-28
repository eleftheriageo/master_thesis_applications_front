<template>
  <div>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">My Applications</p>
      </header>
      <div class="card-content">
        <br />
        <b-message v-if="applications.length === 0" type="is-danger">
          No applications found !
        </b-message>
        <b-table v-if="applications.length > 0" :data="applications">
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
            <strong class="is-size-5"> Accepted  : </strong
            ><span class="is-size-6" v-for="rev in applications_reviewed" :key="rev.id">{{ rev.accepted }}</span>
          </p>
          <p v-if="applications_ranking.length > 0">
            <strong class="is-size-5"> Rank : </strong
            ><span class="is-size-6" v-for="rank in applications_ranking" :key="rank.id">{{ rank.rank }}</span>
          </p>
        </section>
        <footer class="modal-card-foot">
          <b-button label="Close" @click="viewApplicationModal = false" />
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
    master: {},
    viewApplicationModal: false,
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
        .get("http://localhost:8081/applications/", {
          headers: authHeader(),
        })
        .then((response) => (this.applications = response.data.filter((tr) => tr.studentId === this.loggedUser.id)));
    },

    viewApplication(app) {
        this.application=app;
      axios
        .get("http://localhost:8081/applicationreviews/", {
          headers: authHeader(),
        })
        .then((response) => (this.applications_reviewed = response.data.filter((tr) => tr.application_id === app.id)));
      axios
        .get("http://localhost:8081/applicationraking/", {
          headers: authHeader(),
        })
        .then((response) => (this.applications_ranking = response.data.filter((tr) => tr.application_id === app.id)));
      axios
        .get("http://localhost:8081/masters/" + app.masterId, {
          headers: authHeader(),
        })
        .then((response) => (this.master = response.data));
      this.viewApplicationModal = true;
    },
  },
};
</script>
