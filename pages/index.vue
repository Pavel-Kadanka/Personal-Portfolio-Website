<template>
    <v-app>
        <!-- Show Loading Component if loading -->
    <Loading v-if="isLoading" />

    <!-- Main content when loading is complete -->
    <div v-else class="landing-container">
        <!-- Navigation -->
        <nav class="navigation" :class="{ 'nav-scrolled': hasScrolled }">
            <div class="nav-content">
                <a href="/"><span class="logo gradient-text">Pavel</span></a>
                <!-- Desktop Navigation -->
                <div class="nav-links" v-if="!isMobile">
                    <a v-for="(section, index) in sections" 
                       :key="index" 
                       @click="scrollToSection(section.id)"
                       :class="{ 'active': activeSection === section.id }"
                    >
                        {{ section.name }}
                    </a>
                </div>

                <!-- Mobile Menu Icon -->
                <v-app-bar-nav-icon class="drawer" v-else @click="drawer = !drawer"></v-app-bar-nav-icon>
            </div>
        </nav>

        <!-- Mobile Navigation Drawer -->
        <v-navigation-drawer v-model="drawer" location="right" temporary>
            <v-list class="drawer-list">
                <!-- Add close button header -->
                <v-list-item class="drawer-header">
                    <div class="d-flex justify-space-between align-center w-100">
                        <span class="gradient-text text-h6">Menu</span>
                        <v-btn icon="mdi-close" variant="text" @click="drawer = false" color="#f08bedfa"></v-btn>
                    </div>
                </v-list-item>
                
                <v-divider class="my-2"></v-divider>

                <v-list-item v-for="(section, index) in sections" 
                            :key="index"
                            @click="scrollToSection(section.id)"
                            class="drawer-items">
                    <span>
                        {{ section.name }}
                    </span>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <!-- Hero Section -->
        <section id="home" class="hero-section">
            <div class="hero-content-wrapper">
                <!-- Left side - Text content -->
                <div class="hero-content" :class="{ 'mobile-hero': isMobile }">
                    <h1 class="text-h2 animate-text">
                        <span class="gradient-text">Hello, I'm Pavel</span>
                    </h1>
                    <h2 class="text-h4 mt-4 animate-text-delay">
                        Web Developer & Programmer
                    </h2>
                    <p class="text-subtitle-1 mt-6 animate-text-delay-2">
                        Crafting digital experiences with passion and precision
                    </p>
                    <v-btn
                        class="mt-6 animate-button"
                        color="#f08bedfa"
                        size="large"
                        @click="scrollToSection('projects')"
                    >
                        View My Work
                        <v-icon class="ml-2">mdi-arrow-right</v-icon>
                    </v-btn>
                </div>
                
                <!-- Right side - Image -->
                <div class="hero-image animate-image">
                    <img src="/me-hands-crossed.png" alt="Pavel" />
                </div>
            </div>
        </section>

        <!-- About Section -->
        <section id="about" class="section fade-in-section">
            <Bio />
        </section>
        <section>
            <Skills />
        </section>

        <section id="testimonials" class="section fade-in-section">
            <Testemonials />
        </section>

        <!-- Projects Section -->
        <section id="projects" class="section fade-in-section">
            <ProjectsComponent />
        </section>

        <!-- Contact Section -->
        <section id="contact" class="section fade-in-section">
            <Cooperate />
        </section>
    </div>
    </v-app>
</template>

<script>
import { useDisplay } from "vuetify";

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
            isLoading: true,
            assetsLoaded: false,
            componentsLoaded: false,
            drawer: false,
            hasScrolled: false,
            activeSection: 'home',
            sections: [
                { id: 'home', name: 'Home' },
                { id: 'about', name: 'About' },
                { id: 'testimonials', name: 'Testimonials' },
                { id: 'projects', name: 'Projects' },
                { id: 'contact', name: 'Contact' }
            ]
        };
    },
    methods: {
        updateLayout() {
            this.isMobile = this.display.smAndDown;
        },
        scrollToSection(id) {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
            if (this.isMobile) {
                this.drawer = false;
            }
        },
        handleScroll() {
            const sections = document.querySelectorAll('.fade-in-section');
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                if (sectionTop < windowHeight * 0.75) {
                    section.classList.add('is-visible');
                }
            });

            this.hasScrolled = window.scrollY > 50;

            this.sections.forEach(({ id }) => {
                const element = document.getElementById(id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        this.activeSection = id;
                    }
                }
            });
        },
        checkLoadingStatus() {
            this.isLoading = !(this.assetsLoaded && this.componentsLoaded);
        },
        async loadAssets() {
            const imagePromises = [
                this.preloadImage('/me-hands-crossed.png'),
            ];

            try {
                await Promise.all(imagePromises);
                this.assetsLoaded = true;
                this.checkLoadingStatus();
            } catch (error) {
                console.error('Error loading assets:', error);
            }
        },
        preloadImage(src) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve();
                img.onerror = () => reject();
                img.src = src;
            });
        }
    },
    async mounted() {
        this.updateLayout();
        window.addEventListener("resize", this.updateLayout);
        window.addEventListener("scroll", this.handleScroll);
        this.loadAssets();

        this.$nextTick(() => {
            this.componentsLoaded = true;
            this.checkLoadingStatus();
        });

        this.handleScroll();

        let address = window.location.hash;
        if (address) {
            let sectionId = address.substring(1); // Remove the "#" symbol
            console.log(`Hash detected: ${sectionId}`);

            // Wait for Vue to fully render components before trying to scroll
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                console.log('Element found:', element);
                
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                } else {
                    console.warn("Element not found, retrying...");
                    setTimeout(() => {
                        const retryElement = document.getElementById(sectionId);
                        if (retryElement) {
                            retryElement.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 1000); // Second attempt after 1 second
                }
            }, 500); // Delay ensures components have rendered
        }
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.updateLayout);
        window.removeEventListener("resize", this.updateLayout); // Clean up event listener
        window.removeEventListener('scroll', this.handleScroll);
    },
};
</script>

<style>
@import url(assets/css/styles.css);

</style>