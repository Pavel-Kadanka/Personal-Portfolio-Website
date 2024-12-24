<template>
    <Loading v-if="isLoading" />
  
    <!-- Main content when loading is complete -->
    <div v-else class="myWork">
        <ProjectsComponent />
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

.myWork {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 80vh;
}
</style>