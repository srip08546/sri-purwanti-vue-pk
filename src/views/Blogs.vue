<template class="ma-0 pa-0" grid-list-sm>
    <v-container>
        <div class="d-flex justify-space-between">
            <p>All Idea</p>
            <v-btn dark small color="#0067B3" to="/New" class="mb-2">
                <v-icon>mdi-plus</v-icon>
                Add New Idea</v-btn
            >
        </div>
        <v-divider></v-divider>
        <v-layout wrap class="my-5">
            <blog-item-component
                v-for="blog in blogs"
                :key="'blog-' + blog.id"
                :blog="blog"
            ></blog-item-component>
        </v-layout>
        <v-pagination
            v-model="page"
            @input="go"
            :length="lengthPage"
            :total-visible="perPage"
        >
        </v-pagination>
    </v-container>
</template>

<script>
import BlogItemComponent from "../components/BlogItemComponent.vue";
import axios from "axios";
export default {
    data: () => ({
        apiDomain: "https://demo-api-vue.sanbercloud.com",
        blogs: [],
        page: 0,
        lengthPage: 0,
        perPage: 0,
    }),
    components: {
        "blog-item-component": BlogItemComponent,
    },
    methods: {
        go() {
            const config = {
                method: "get",
                url: this.apiDomain + "/api/v2/blog",
                params: { page: this.page },
            };
            axios(config)
                .then((response) => {
                    let { blogs } = response.data;
                    this.blogs = blogs.data;
                    this.page = blogs.current_page;
                    this.lengthPage = blogs.last_page;
                    this.perPage = blogs.per_page;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        login() {
            this.setDialogComponent({ component: "login" });
        },
    },
    created() {
        this.go();
    },
};
</script>
