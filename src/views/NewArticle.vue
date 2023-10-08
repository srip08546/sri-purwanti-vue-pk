<template>
    <div class="NewArticle">
        <v-card>
            <v-toolbar dark color="#0067B3">
                <v-toolbar-title>Create New Idea</v-toolbar-title>
            </v-toolbar>
            <v-divider></v-divider>
            <v-container fluid>
                <v-form ref="form">
                    <v-text-field
                        v-model="title"
                        label="Title"
                        required
                        append-icon="mdi-format-title"
                    ></v-text-field>
                    <v-text-field
                        v-model="description"
                        label="Description"
                        required
                        append-icon="mdi-note"
                    >
                    </v-text-field>
                    <div class="text-xs-center">
                        <v-btn dark color="#40B0DF" @click="newArticle()">
                            Create
                            <v-icon right dark>mdi-plus</v-icon></v-btn
                        >
                    </div>
                </v-form>
            </v-container>
        </v-card>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
    data() {
        return {
            title: "",
            description: "",
            apiDomain: "https://demo-api-vue.sanbercloud.com",
        };
    },
    computed: {
        ...mapGetters({
            token : "auth/token"
        })
    },
    methods: {
        ...mapActions({
            setAlert: "alert/set",
            setToken: "auth/setToken",
        }),

        clearForm() {
            this.title = "";
            this.description = "";
        },
        newArticle() {
            let formData = new FormData();
            formData.append("title", this.title);
            formData.append("description", this.description);

            const config = {
                method: "post",
                url: this.apiDomain + "/api/v2/blog",
                data: formData,
                headers: {
                    Authorization: "Bearer" + this.token,
                },
            };

            axios(config)
                .then((response) => {
                    console.log(response.data);
                    this.setAlert({
                        status: true,
                        color: "success",
                        text: "New Idea Created",
                    });
                    this.clearForm();
                })
                .catch((response) => {
                    console.log(response);
                    this.setAlert({
                        status: true,
                        color: "error",
                        text: "Failed to Create New Idea",
                    });
                });
        },
    },
};
</script>
