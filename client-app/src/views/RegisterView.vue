<template>
    <div class="jumbotron">
        <div class="container">
            <div class="card">
              <div class="card-content">
                <div class="content">
                  <div class="row">
                      <div class="col-sm-8 offset-sm-2">
                          <div>
                              <h2>Login</h2>
                              <form @submit.prevent="handleRegister">
                                  <div class="form-group">
                                      <label for="username">Username</label>
                                      <input type="text" v-model="user.username" id="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && $v.form.username.$error }" />
                                      <div v-if="submitted && !$v.user.username.required" class="invalid-feedback">First Name is required</div>
                                  </div>
                                  <div class="form-group">
                                      <label for="password">Password</label>
                                      <input type="password" v-model="user.password" id="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && $v.user.password.$error }" />
                                      <div v-if="submitted && $v.user.password.$error" class="invalid-feedback">
                                          <span v-if="!$v.user.password.required">Password is required</span>
                                          <span v-if="!$v.user.password.minLength">Password must be at least 6 characters</span>
                                      </div>
                                  </div>
                                  <div class="form-group">
                                      <button class="btn btn-primary">Login</button>
                                  </div>
                              </form>
                          </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  </template>

<script>
import User from '@/models/user.model';

export default {
  name: "RegisterView",
  data() {
    return {
      user: new User("", "", "", "", ""),
      submitted: false,
      successful: false,
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted: {
    handleRegister() {
      this.message = "";
      this.submitted = true;
      this.$validator.validate().then((isValid) => {
        if (isValid) {
          this.$store.dispatch("auth/register", this.user).then(
            (data) => {
              (this.message = data.message), (this.successful = true);
            },
            (error) => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    },
  },
};
</script>