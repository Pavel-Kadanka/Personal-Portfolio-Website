<template>
    <Loading v-if="isLoading" />
  
    <!-- Main content when loading is complete -->
    <div v-else>
        <v-row class="align-center mt-5">
            <v-col align="center" align-self="center">
                <v-img
                    class="mx-auto"
                    src="/me-just-face.png"
                    :width="300"
                    aspect-ratio="16/9"
                ></v-img>
            </v-col>
            <v-col>
                <p 
                    class="text-subtitle-1 mt-2 pd-10"
                    :class="{'text-center' : isMobile}"
                >
                    <span class="text-h4 font-weight-black">My name is Pavel</span><br><br>
                    young and eager web developer, who loves to learn new stuff and overcome new challanges.
                </p>
                <v-spacer></v-spacer>
            </v-col>
        </v-row>

        <SkillsComponent class="mt-5"/>

        <Bio class="mt-10"/>
    </div>
</template>
<script>
import { useDisplay } from "vuetify";

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
            isLoading: true, // State to control loading animation
        };
    },
    methods: {
        updateLayout() {
            // Use reactive display properties for layout updates
            this.isMobile = this.display.smAndDown;
        },
        finishLoading() {
            // Simulate some loading delay and finish
            setTimeout(() => {
                this.isLoading = false; // Stop loading
            }, 1500); // Simulated delay
        },
    },
    mounted() {
        this.updateLayout(); // Check layout on mount
        window.addEventListener("resize", this.updateLayout); // Update on resize

        this.finishLoading(); // Simulate loading process on mount
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.updateLayout); // Clean up event listener
    },
};
</script>
<style>
@import url(assets/css/styles.css);
</style>