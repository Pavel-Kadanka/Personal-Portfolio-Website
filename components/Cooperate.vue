<template>
    <v-container id="contact1" class="scaled-content" >
        <v-row>
            <v-col :class="{'text-center': isMobile, 'text-center': !isMobile}" class="block-2">
                <h2 class="font-weight-bold text-center text-h3">I want <span class="main-color">YOU</span><br>to work with me.</h2>
                <p class="text-subtitle-1 text-center mt-2 pd-10">If you are interested, you can see more<br>of my work if you scroll down. </p>
            </v-col>
            <v-col align-self="end" :class="{'pl-16': !isMobile, 'text-end': true}" class="box">
                <v-img
                  class="mb-4"
                  src="/me-pointing.png"
                  max-width="300"
                  :width="300"
                  aspect-ratio="16/9"
                ></v-img>
              </v-col>
              
        </v-row>
        <v-row>
            <v-col  class="fly-right mt-16" align-self="end">
                <h2 class="text-h4 font-weight-bold special-color02 text-center">If you are <span class="special-color">already interested</span><br>you can contact me here<br></h2>
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
.box {
    display: flex;
    flex-direction: row;
    justify-content: end;
}
.block-2 {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>