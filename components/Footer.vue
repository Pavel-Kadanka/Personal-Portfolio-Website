<template>
    <v-container>
        <Contact />
        <div class="text-center text-subtitle-1">
            © {{ new Date().getFullYear() }} — <strong>Pavel Kadaňka</strong>
        </div>
    </v-container>
</template>

<style>

</style>


<script>
import { useDisplay } from 'vuetify';    //footer update
import Contact from './Contact.vue';

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
    mounted() {
        this.updateLayout(); // Check layout on mount
        window.addEventListener("resize", this.updateLayout); // Update on resize
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.updateLayout); // Clean up event listener
    },
}
};
</script>
