<template>
    <v-app>
        <!-- Show Loading Component if loading -->
    <Loading v-if="isLoading" />

    <!-- Main content when loading is complete -->
    <div v-else class="landing-container">
        <!-- Navigation -->
        <nav class="navigation" :class="{ 'nav-scrolled': hasScrolled }">
            <div class="nav-content">
                <span class="logo gradient-text">Pavel</span>

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
import Bio from '@/components/Bio.vue';
import ProjectsComponent from '@/components/ProjectsComponent.vue';
import Cooperate from '@/components/Cooperate.vue';

export default {
    components: {
        Bio,
        ProjectsComponent,
        Cooperate
    },
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
        window.addEventListener('scroll', this.handleScroll);

        this.loadAssets();

        this.$nextTick(() => {
            this.componentsLoaded = true;
            this.checkLoadingStatus();
        });

        this.handleScroll();
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

.drawer {
    color: #f08bedfa;
}

.drawer-items span {
    color: white;
}

.landing-container {
    background-color: rgb(15, 15, 17);
    min-height: 100vh;
}

.navigation {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 1rem 17vw;
    transition: all 0.3s ease;
}

.nav-scrolled {
    background-color: rgba(15, 15, 17, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-family: 'Joti One', sans-serif;
    font-size: 1.5rem;
}

.nav-links {
    display: flex;
    gap: 2rem;
}

.nav-links a {
    color: white;
    text-decoration: none;
    cursor: pointer;
    padding: 0.5rem 1rem;
    transition: all 0.3s ease;
}

.nav-links a:hover, .nav-links a.active {
    color: #f08bedfa;
}

.section {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

@media (max-width: 1440px) {
    .navigation {
        padding: 1rem 10vw;
    }
}

@media (max-width: 960px) {
    .navigation {
        padding: 1rem 5vw;
    }
}

.hero-section {
    height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
}

.hero-content-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 4rem;
}

.hero-content {
    flex: 1;
    max-width: 600px;
}

.hero-image {
    flex: 1;
    max-width: 500px;
    opacity: 0;
    transform: translateX(50px);
}

.hero-image img {
    width: 100%;
    height: auto;
    border-radius: 20px;
    box-shadow: 0 0 30px rgba(240, 139, 237, 0.2);
}

.animate-image {
    animation: fadeInRight 0.8s ease forwards 1.2s;
}

@keyframes fadeInRight {
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.mobile-hero {
    text-align: center;
    padding: 0 20px;
}

.gradient-text {
    background: linear-gradient(45deg, #f08bedfa, #ffffff);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.animate-text {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s ease forwards;
}

.animate-text-delay {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s ease forwards 0.3s;
}

.animate-text-delay-2 {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s ease forwards 0.6s;
}

.animate-button {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s ease forwards 0.9s;
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Keep your existing fade-in-section styles */
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

@media (max-width: 1440px) {
    .hero-section {
        padding: 0 5vw;
    }
    
    .hero-image {
        max-width: 450px;
    }
}

@media (max-width: 960px) {
    .hero-section {
        padding: 0 5vw;
        height: auto;
        min-height: 100vh;
    }

    .hero-content-wrapper {
        flex-direction: column;
        text-align: center;
        gap: 2rem;
        padding: 100px 0;
    }

    .hero-content {
        max-width: 100%;
    }

    .hero-image {
        max-width: 300px;
        margin: 0 auto;
    }
}

@media (max-width: 600px) {
    .hero-content h1 {
        font-size: 2rem !important;
    }

    .hero-content h2 {
        font-size: 1.5rem !important;
    }

    .hero-content p {
        font-size: 1rem !important;
    }

    .hero-image {
        max-width: 250px;
    }
}

@media (max-width: 360px) {
    .hero-content h1 {
        font-size: 1.75rem !important;
    }

    .hero-content h2 {
        font-size: 1.25rem !important;
    }

    .hero-image {
        max-width: 200px;
    }
}

/* Navigation Drawer Styles */
.v-navigation-drawer {
    background-color: rgb(15, 15, 17) !important;
}

.drawer-list {
    background-color: rgb(15, 15, 17) !important;
    color: white !important;
}

.drawer-items {
    color: white !important;
    transition: all 0.3s ease;
}

.drawer-items:hover {
    background-color: rgba(240, 139, 237, 0.1) !important;
}

.drawer-items span {
    color: white !important;
}

/* Optional: Style the scrim (overlay) when drawer is open */
.v-overlay__scrim {
    background-color: rgba(0, 0, 0, 0.5) !important;
}

/* Navigation Drawer Styles */
.drawer-header {
    padding: 16px !important;
}

.drawer-header .v-btn {
    margin-right: -8px;
}

.v-divider {
    border-color: rgba(255, 255, 255, 0.12) !important;
}
</style>