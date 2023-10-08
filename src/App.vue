<template>
    <v-app>
        <Alert />
        <Dialog />

        <v-navigation-drawer app v-model="drawer">
            <v-list>
                <v-list-item v-if="!guest">
                    <v-list-item-avatar>
                        <v-img
                            :src="
                                user.photo_profile
                                    ? apiDomain + user.photo_profile
                                    : 'https://randomuser.me/api/portraits/men/11.jpg'
                            "
                        ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>{{ user.name }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <div class="pa-2" v-if="guest">
                    <v-btn
                        block
                        dark
                        color="#0067B3"
                        class="mb-1"
                        @click="login"
                    >
                        <v-icon left>mdi-lock</v-icon>
                        Login
                    </v-btn>
                    <v-btn block dark color="#FFD53D" @click="register">
                        <v-icon left>mdi-account</v-icon>
                        Register
                    </v-btn>
                </div>

                <v-divider></v-divider>

                <v-list-item
                    v-for="(item, index) in menus"
                    :key="`menu - ${index} `"
                    :to="item.route"
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <template v-slot:append v-if="!guest">
                <div class="pa-2">
                    <v-btn block color="red" dark @click="logout"
                        ><v-icon left>mdi-lock</v-icon>Logout</v-btn
                    >
                </div>
            </template>
        </v-navigation-drawer>

        <v-app-bar app dense color="#40B0DF" dark>
            <v-app-bar-nav-icon
                @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>
            <v-btn class="ml-7" color="transparent" icon to="/">
                <v-img
                    src="/4F-Logo.png"
                    max-width="100px"
                    class="ml-1"
                ></v-img>
            </v-btn>
        </v-app-bar>

        <v-main>
            <v-container fluid>
                <v-slide-y-transition>
                    <router-view></router-view>
                </v-slide-y-transition>
            </v-container>
        </v-main>
        <v-footer padless dark color="#40B0DF">
            <v-col class="text-center" cols="12">FOUR FUTURE<br> Copyright &copy;2022 Jabar Coding Camp | VueJS
            </v-col>
        </v-footer>
    </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
export default {
    name: "App",
    components: {
        Alert: () => import("./components/Alert.vue"),
        Dialog: () => import("./components/Dialog.vue"),
    },
    data: () => ({
        drawer: false,
        menus: [
            { title: "Home", icon: "mdi-home", route: "/" },
            { title: "All Idea", icon: "mdi-file-star", route: "/blogs" },
            { title: "Create New Idea", icon: "mdi-pencil", route: "/New" },
            {
                title: "About Us",
                icon: "mdi-card-account-details",
                route: "/About",
            },
        ],
        apiDomain: "https://demo-api-vue.sanbercloud.com",
    }),
    computed: {
        ...mapGetters({
            guest: "auth/guest",
            user: "auth/user",
            token: "auth/token",
        }),
    },
    methods: {
        logout() {
            let config = {
                method: "post",
                url: this.apiDomain + "/api/v2/auth/logout",
                headers: {
                    Authorization: "Bearer" + this.token,
                },
            };
            axios(config)
                .then((r) => {
                    console.log(r);
                    this.setToken("");
                    this.setUser({});

                    this.setAlert({
                        status: true,
                        color: "success",
                        text: "Logout Success",
                    });
                })
                .catch((e) => {
                    console.log(e);
                    this.setAlert({
                        status: true,
                        color: "error",
                        text: "Logout Failed",
                    });
                });
        },
        login() {
            this.setDialogComponent({ component: "login" });
        },
        register() {
            this.setDialogComponent({ component: "register" });
        },
        ...mapActions({
            setAlert: "alert/set",
            setDialogComponent: "dialog/setComponent",
            setToken: "auth/setToken",
            setUser: "auth/setUser",
            checkToken: "auth/checkToken",
        }),
    },
    mounted() {
        if (this.token) {
            this.checkToken(this.token);
        }
    },
};
</script>
