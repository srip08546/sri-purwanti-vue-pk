<template>
  <div>
    <div class="d-flex justify-end">
      <v-btn dark small color="#FFd53D" class="mb-2 ml-2">
        <v-icon>mdi-image</v-icon>
        Upload</v-btn
      >
      <v-btn dark small color="#0067B3" class="mb-2 ml-2">
        <v-icon>mdi-pencil</v-icon>
        Edit</v-btn
      >
      <v-btn dark small color="error" class="mb-2 ml-2" @click.native="close" @click="deleteBlog(blog.id)">
        <v-icon>mdi-delete</v-icon>
        Delete</v-btn
      >
    </div>
    <v-divider></v-divider>
    <v-card v-if="blog.id">
      <v-img :src="blog.photo ? apiDomain + blog.photo : 'https://picsum.photos/200/300'" class="white--text" height="400px">
        <v-card-title class="fill-height align-end" v-text="blog.title"></v-card-title>
      </v-img>

      <v-card-text>
        <v-simple-table dense>
          <tbody>
            <tr>
              <td><v-icon>mdi-format-title</v-icon> Title</td>
              <td class="blue-text">{{ blog.title }}</td>
            </tr>
            <tr>
              <td><v-icon>mdi-note</v-icon> Description</td>
              <td>
                {{ blog.description }}
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    blog: {},
    apiDomain: "https://demo-api-vue.sanbercloud.com",
  }),
  computed: {
    ...mapGetters({
      token: "auth/token",
    }),
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
    }),
    delete() {
      this.$emit("closed", false);
    },
    go() {
      let { id } = this.$route.params;

      const config = {
        method: "get",
        url: `${this.apiDomain}/api/v2/blog/${id}`,
      };
      axios(config)
        .then((r) => {
          let { blog } = r.data;
          //   console.log(blog.photo);
          this.blog = blog;
        })
        .catch((e) => console.log(e));
    },
    deleteBlog(id) {
      const config = {
        method: "post",
        url: `${this.apiDomain}/api/member/${id}`,
        headers: { Authorization: "Bearer" + this.token },
        params: { _method: "DELETE" },
      };
      axios(config)
        .then((r) => {
          console.log(r.data);
          this.setAlert({
            status: true,
            color: "success",
            text: r.data.message,
          });
        })
        .catch((e) => console.log(e));
    },
  },
  created() {
    this.go();
  },
};
</script>
