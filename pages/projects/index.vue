<template>
    <v-app>
      <v-app-bar app color="primary" dark>
        <v-container class="d-flex align-center justify-space-between">
          <v-btn icon @click="drawer = !drawer">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
  
          <div id="logo" class="d-flex align-center">
            <h1 class="ml-2 text-h5">GrantPneu</h1>
          </div>
  
          <v-btn icon @click="toggleTheme">
            <v-icon>{{ isDark ? 'mdi-weather-night' : 'mdi-weather-sunny' }}</v-icon>
          </v-btn>
        </v-container>
      </v-app-bar>
  
      <v-navigation-drawer v-model="drawer" app temporary>
        <v-list>
          <v-list-item v-for="(item, i) in menuItems" :key="i" :href="item.href">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <v-main>
        <slot />
      </v-main>
    </v-app>
  </template>
  
  <script>
  export default {
    data() {
      return {
        drawer: false,
        isDark: false,
        menuItems: [
          { text: "Služby", href: "#sluzby", icon: "mdi-hammer-wrench" },
          { text: "O nás", href: "#o-nas", icon: "mdi-information" },
          { text: "Ceník", href: "#cenik", icon: "mdi-cash" },
          { text: "Recenze", href: "#testimonials", icon: "mdi-star" },
          { text: "Kontakt", href: "#kontakt", icon: "mdi-phone" },
        ],
      };
    },
    methods: {
      toggleTheme() {
        this.isDark = !this.isDark;
        this.$vuetify.theme.global.name = this.isDark ? "dark" : "light";
      },
    },
  };
  </script>
  
  <style scoped>
  #logo h1 {
    font-family: "Teko", sans-serif;
    color: white;
    text-decoration: none;
  }
  </style>
  