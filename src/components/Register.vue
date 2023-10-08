<template>
    <v-card>
        <v-toolbar dark color="#FFD53D">
            <v-btn icon dark @click.native="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-container fluid>
            <v-form ref="form">
                <v-text-field
                    v-model="email"
                    label="E-Mail"
                    required
                    append-icon="mdi-email"
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    label="Password"
                    counter
                    @click:append="showPassword = !showPassword"
                >
                </v-text-field>
                <v-text-field
                    v-model="name"
                    label="User Name"
                    required
                    append-icon="mdi-account"
                ></v-text-field>
                <input type="file" name="photo" ref="photo" />
                <div class="text-xs-center mt-5">
                    <v-btn dark color="#40B0DF" @click="register">
                        Register
                        <v-icon right dark>mdi-account</v-icon></v-btn
                    >
                </div>
            </v-form>
        </v-container>
    </v-card>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
export default {
    data() {
        return {
            email: "",
            showPassword: false,
            password: "",
            name: "",
            apiDomain: "https://demo-api-vue.sanbercloud.com",
        };
    },
    methods: {
        ...mapActions({
            setAlert: "alert/set",
            setToken: "auth/setToken",
        }),

        close() {
            this.$emit("closed", false);
        },
        clearForm() {
            this.email = "";
            this.password = "";
            this.name = "";
        },
        register() {
            let file = this.$refs.photo.files[0];
            let formData = new FormData();
            formData.append("email", this.email);
            formData.append("password", this.password);
            formData.append("name", this.name);
            formData.append("photo_profile", file);

            const config = {
                method: "post",
                url: this.apiDomain + "/api/v2/auth/register",
                data: formData,
            };

            axios(config)
                .then((response) => {
                    console.log(response.data);
                    this.setToken(response.data.access_token);
                    this.setAlert({
                        status: true,
                        color: "success",
                        text: "Register Success",
                    });
                    this.close();
                    this.clearForm();
                })
                .catch((response) => {
                    console.log(response);
                    this.setAlert({
                        status: true,
                        color: "error",
                        text: "Register Failed",
                    });
                });
        },
    },
};
</script>
