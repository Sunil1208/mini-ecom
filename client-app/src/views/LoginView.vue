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
                              <form @submit.prevent="handleLogin">
                                  <div class="form-group">
                                      <label for="username">Username</label>
                                      <input type="text" v-model="form.username" id="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && v$.form.username.$error }" />
                                      <!-- error -->

                                      <!-- <div v-for="(error, index) of v$.form.username.$errors" :key="index" v-if="submitted && !v$.form.username.required" class="invalid-feedback">First Name is required</div> -->
                                      <div v-for="(error, index) of v$.form.username.$errors" :key="index" class="invalid-feedback">
                                        <span>{{ error.$message }}</span>
                                      </div>
                                  </div>
                                  <div class="form-group">
                                      <label for="password">Password</label>
                                      <input type="password" v-model="form.password" id="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && v$.form.password.$error }" />
                                      <!-- <div v-if="submitted && v$.form.password.$error" class="invalid-feedback">
                                          <span v-if="!v$.form.password.required">Password is required</span>
                                          <span v-if="!v$.form.password.minLength">Password must be at least 6 characters</span>
                                      </div> -->
                                      <div v-for="(error, index) of v$.form.password.$errors" :key="index" class="invalid-feedback">
                                        <span>{{ error.$message }}</span>
                                      </div>
                                  </div>
                                  <div class="form-group">
                                      <button class="btn btn-primary" :disabled="v$.form.$invalid" type="submit">Login</button>
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
// import User from '@/models/user.model';
import useVuelidate from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'

export default {
    setup() {
        return {
            v$: useVuelidate()
        }
    },
  name: "LoginView",
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      loading: false,
    //   message: "",
      submitted: false,
    };
  },
  validations() {
        return {
            form: {
                username: { 
                    required: helpers.withMessage("Username is required!", required), 
                    $autoDirty: true
                },
                password: { 
                    required: helpers.withMessage("Password must be atleast 6 characters!", required), $autoDirty: true, 
                    minLength: minLength(6) 
                }
            }
        }
    },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      console.log("this.validator22 is ", this.v$.form)
      if(this.v$.form.$invalid){
        this.loading = false;
        return;
      } else {
        if (this.form.username && this.form.password) {
          this.$store.dispatch("auth/login", this.form).then(
            () => {
              this.$router.push("/profile").catch(e => { console.log("ERROR REDIRECTING TO PROFILE IS ", e)});
            },
            (error) => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
      }
    },
  },
};
</script>