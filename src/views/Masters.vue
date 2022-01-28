<template>
  <div>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Masters</p>
        <b-button class="card-header-icon" @click="openMasterModal">
          Create
        </b-button>
      </header>
      <div class="card-content">
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
                  @click="openEditMasterModal(props.row)"
                >
                  Edit
                </button>
                <button
                  class="button is-primary"
                  @click="deleteMaster(props.row.id)"
                >
                  Delete
                </button>
              </div>
            </template>
          </b-table-column>
        </b-table>
      </div>
    </div>

    <b-modal has-modal-card trap-focus v-model="createMasterModal">
      <form @submit.prevent="createMaster">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">Create Master</p>
            <button
              type="button"
              class="delete"
              @click="createMasterModal = false"
            />
          </header>
          <section class="modal-card-body">
            <b-field label="Name">
              <b-input v-model="newMaster.name" type="text" required> </b-input>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <b-button label="Close" @click="createMasterModal = false" />
            <button class="button is-primary" type="submit">Create</button>
          </footer>
        </div>
      </form>
    </b-modal>
    <b-modal has-modal-card trap-focus v-model="editMasterModal">
      <form @submit.prevent="updateMaster">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">Edit Master</p>
            <button
              type="button"
              class="delete"
              @click="editMasterModal = false"
            />
          </header>
          <section class="modal-card-body">
            <b-field label="Name">
              <b-input v-model="editMaster.name" type="text" required>
              </b-input>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <b-button label="Close" @click="editMasterModal = false" />
            <button class="button is-primary" type="submit">Update</button>
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
    masters: [],
    newMaster: {},
    editMaster: {},
    createMasterModal: false,
    editMasterModal: false,
    columns: [
      {
        field: "id",
        label: "ID",
      },
      {
        field: "name",
        label: "Name",
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
        .get("http://localhost:8081/masters", {
          headers: authHeader(),
        })
        .then((response) => (this.masters = response.data));
    },
    openMasterModal() {
      this.createMasterModal = true;
    },
    openEditMasterModal(master) {
      this.editMaster = master;
      this.editMasterModal = true;
    },
    createMaster() {
      axios
        .post("http://localhost:8081/masters/", this.newMaster, {
          headers: authHeader(),
        })
        .then(() => this.$router.go(0));
    },
    updateMaster() {
      axios
        .put(
          "http://localhost:8081/masters/" + this.editMaster.id,
          this.editMaster,
          {
            headers: authHeader(),
          }
        )
        .then(() => this.$router.go(0));
    },
    deleteMaster(id) {
      axios
        .delete("http://localhost:8081/masters/" + id, {
          headers: authHeader(),
        })
        .then(() => this.$router.go(0));
    },
  },
};
</script>
