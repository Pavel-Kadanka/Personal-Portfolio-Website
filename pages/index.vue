<template>
    <!-- Show Loading Component if loading -->
    <Loading v-if="isLoading" />

    <!-- Main content when loading is complete -->
    <div v-else>
        <LandingComponent />
        <Cooperate id="cooperate"/>
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
        }
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

.main-color {
    color: white;
}

.fade-in-section {
    opacity: 0;
    transform: translateY(20vh);
    visibility: hidden;
    transition: opacity 0.6s ease-out, transform 1.2s ease-out;
    will-change: opacity, visibility;
}

.fade-in-section.is-visible {
    opacity: 1;
    transform: none;
    visibility: visible;
}
</style>