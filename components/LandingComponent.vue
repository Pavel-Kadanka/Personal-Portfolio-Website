<template>
    <v-container class="d-flex align-center container">
        <v-row align-self="center" justify="center" class="d-flex align-center">
            <v-col align-self="center" align="center">
                <v-img 
                    src="/me-hands-crossed.png"
                    :max-width="300"
                    width="auto"
                    aspect-ratio="16/9"
                    class="align-left image-layer"
                ></v-img>
            </v-col>
            <v-col align-self="center" :class="{'text-center': isMobile, 'text-left': !isMobile}">
                <p class="text-subtitle-1 opacity-60">Greetings, my name is</p>
                <h1 :class="{'text-center': isMobile}" class="text-h2 font-weight-black">Pavel Kadaňka</h1>
                <h2 class="text-h3 font-weight-bold">I love to code stuff <3</h2>
                <p class="text-subtitle-1 opacity-30 special-view">I am web developer, but I just really enjoy coding.</p>
                <a href="#cooperate" class="text-subtitle-1 font-weight-bold text-decoration-underline opacity-100">Scroll down</a>
                <span class="text-subtitle-1 opacity-30 text-left"> if you want to know more</span>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { useDisplay } from 'vuetify';

export default {
    setup() {
        const display = useDisplay(); // Access reactive display values
        return {
            display, // Make the display object available in the template or logic
        };
    },
    data() {
        return {
            isMobile: false, // Initialize `isMobile`
        };
    },
    methods: {
        updateLayout() {
            // Use reactive display properties for layout updates
            this.isMobile = this.display.smAndDown;
        },
    },
    mounted() {
        this.updateLayout(); // Check layout on mount
        window.addEventListener("resize", this.updateLayout); // Update on resize
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.updateLayout); // Clean up event listener
    },
};
</script>
<style>
@import url(assets/css/styles.css);

.image-layer {
  z-index: 0; /* or any negative value like -1 if needed */
  position: relative; /* z-index only works with positioned elements */
}
</style>