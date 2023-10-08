<template class="ma-0 pa-0" grid-list-sm>
  <v-container>
    <div class="d-flex justify-space-between">
      <p>Here's Some Brilliant Idea Just For You</p>
      <v-btn dark small color="#0067B3" to="/blogs" class="mb-2">
        All Idea <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
    <v-divider></v-divider>
    <v-layout wrap class="my-5">
      <blog-item-component
        v-for="blog in blogs"
        :key="'blog-' + blog.id"
        :blog="blog"
      ></blog-item-component>
    </v-layout>
  </v-container>
</template>
//oleeee
<script>
import BlogItemComponent from '../components/BlogItemComponent.vue';
import { mapMutations, mapGetters } from 'vuex';
import axios from 'axios';
export default {
  data: () => ({
    apiDomain: 'https://demo-api-vue.sanbercloud.com',
    blogs: [],
  }),
  components: {
    'blog-item-component': BlogItemComponent,
  },
  computed: {
    count() {
      return this.$store.getters.count;
    },
    ...mapGetters({
      count: 'counter/count',
    }),
  },
  methods: {
    go() {
      const config = {
        method: 'get',
        url: this.apiDomain + '/api/v2/blog/random/4',
      };
      axios(config)
        .then((r) => {
          let { blogs } = r.data;
          this.blogs = blogs;
          console.log(this.blogs);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    increment(payload) {
      this.$store.commit('increment', payload);
    },
    ...mapMutations({
      increment: 'counter/increment',
    }),
  },
  created() {
    this.go();
  },
};
</script>
