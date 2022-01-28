<template>
  <div>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Create Application</p>
      </header>
      <div class="card-content">
        <div class="box">
          <h3 class="title is-4">Select Master</h3>
        <br />
        <b-message v-if="masters.length === 0" type="is-danger">
          No masters found !
        </b-message>
        <b-table v-if="masters.length > 0" :data="masters">
          <b-table-column label="ID">
            <template v-slot="props">
              {{ props.row.id }}
            </template>
          </b-table-column>
          <b-table-column label="Name">
            <template v-slot="props">
              {{ props.row.name }}
            </template>
          </b-table-column>
          <b-table-column label="Actions">
            <template v-slot="props">
              <div class="buttons">
                <button
                  class="button is-primary"
                  @click="openApplicationModal(props.row)"
                >
                  Select
                </button>
              </div>
            </template>
          </b-table-column>
        </b-table>
                </div>

      </div>
    </div>

    <b-modal has-modal-card trap-focus v-model="createApplicationModal">
      <form @submit.prevent="createApplication">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">Create Application</p>
            <button
              type="button"
              class="delete"
              @click="createApplicationModal = false"
            />
          </header>
          <section class="modal-card-body">
            <b-field label="Thesis Title">
              <b-input v-model="application.thesisTitle" type="text" required>
              </b-input>
            </b-field>
            <b-field label="Degree Grade">
              <b-numberinput class="is-black" v-model="application.degree" required :min="1"></b-numberinput>
            </b-field>
            <b-field label="Referral 1">
              <b-select
                placeholder="Select referral"
                v-model="application.referralId1"
              >
                <option v-for="ref in referrals" :value="ref.id" :key="ref.id">
                  {{ ref.text }}
                </option>
              </b-select>
            </b-field>
            <b-field label="Referral 2" :type="{ 'is-danger': hasError }"
            :message="[{ 'Referrals must not be the same !': hasError }]">
              <b-select
                placeholder="Select referral"
                v-model="application.referralId2"
                required
              >
                <option v-for="ref in referrals" :value="ref.id" :key="ref.id">
                  {{ ref.text }}
                </option>
              </b-select>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <b-button label="Close" @click="createApplicationModal = false" />
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
  name: "CreateApplication",
  data: () => ({
    loggedUser: " ",
    masters: [],
    master: {},
    referrals: [],
    application: {},
    editMaster: {},
    hasError: false,
    createApplicationModal: false,
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
        .get("http://localhost:8081/masters", {
          headers: authHeader(),
        })
        .then((response) => (this.masters = response.data));
      axios
        .get("http://localhost:8081/referrals/", {
          headers: authHeader(),
        })
        .then((response) => (this.referrals = response.data.filter((tr) => tr.student_id === this.loggedUser.id)));
    },
    openApplicationModal(master) {
      this.master = master;
      this.createApplicationModal = true;
    },
    createApplication() {
      if (this.application.referralId1 === this.application.referralId2) {
        this.hasError = true;
        return false;
      }
      this.application.studentId = this.loggedUser.id;
      this.application.masterId = this.master.id;
      axios
        .post("http://localhost:8081/applications/", this.application, {
          headers: authHeader(),
        })
        .then(() => this.$router.go(0));
    },
  },
};
</script>
