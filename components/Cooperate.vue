<template>
    <v-container id="contact1" class="contact-section">
        <!-- Main Content -->
        <div class="contact-wrapper">
            <!-- Left Side Content -->
            <div class="content-side" :class="{ 'mobile': isMobile }">
                <div class="text-content animate-text">
                    <h2 class="text-h2 font-weight-bold">
                        I want <span class="gradient-text">YOU</span>
                        <br>to work with me
                    </h2>
                    <div class="text-card">
                        <p class="text-subtitle-1">
                            Let's create something amazing together.
                            <br>Your vision, my expertise.
                        </p>
                    </div>
                    
                    <!-- Contact Links -->
                    <div class="contact-links animate-links">
                        <v-btn
                            prepend-icon="mdi-email"
                            color="#FF81C1"
                            size="large"
                            class="contact-btn mr-4"
                            href="mailto:pavel.kadanka@outlook.cz"
                        >
                            Email Me
                        </v-btn>
                        <v-btn
                            prepend-icon="mdi-linkedin"
                            variant="outlined"
                            color="#FF81C1"
                            size="large"
                            class="contact-btn"
                            href="https://linkedin.com/in/yourprofile"
                            target="_blank"
                        >
                            LinkedIn
                        </v-btn>
                    </div>
                </div>
            </div>

            <!-- Right Side Image -->
            <div class="image-side" :class="{ 'mobile': isMobile }">
                <div class="image-container animate-image">
                    <div class="image-background"></div>
                    <v-img
                        src="/me-pointing.png"
                        width="400"
                        class="pointing-image"
                        :class="{ 'hover-effect': !isMobile }"
                    ></v-img>
                </div>
            </div>
        </div>

        <!-- Bottom Section -->
        <div class="bottom-section animate-bottom mt-4">
            <h3 class="text-h4 font-weight-bold text-center">
                Ready to <span class="gradient-text">collaborate?</span>
            </h3>
            <p class="text-subtitle-1 text-center mt-4">
                Let's turn your ideas into reality
            </p>
        </div>
    </v-container>
</template>

<script>
import { useDisplay } from 'vuetify';

export default {
    setup() {
        const display = useDisplay();
        return {
            display,
        };
    },
    data() {
        return {
            isMobile: false,
        };
    },
    methods: {
        updateLayout() {
            this.isMobile = this.display.smAndDown;
        },
    },
    mounted() {
        this.updateLayout();
        window.addEventListener("resize", this.updateLayout);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.updateLayout);
    },
};
</script>

<style>
@import '@/assets/css/components/cooperate.css';
</style>