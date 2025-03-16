<template>
    <v-app>
        <v-container v-if="isLoading" class="project-detail">
            <Loading />
        </v-container>
        <v-container v-else class="project-detail">
            <!-- Navigation Row -->
    
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
    
            <v-row class="header-section">
                <!-- Title -->
                <v-col cols="10" md="8">
                    <h1 class="text-h2 font-weight-bold gradient-text animate-title text-md-h2 text-sm-h3 text-xs-h5">
                        {{ post !== null ? projects[post].title : 'Loading...' }}
                    </h1>
                </v-col>
            
                <!-- Skills -->
                <v-col cols="12" md="8" class="d-flex justify-start">
                    <v-chip-group class="mt-4 animate-chips">
                        <v-chip
                            v-for="skill in project_skills"
                            :key="skill.name"
                            size="large"
                            class="skill-chip"
                        >
                            <v-icon start icon="mdi-file" class="mr-2"></v-icon>
                            {{ skill.name }}
                        </v-chip>
                    </v-chip-group>
                </v-col>
            
                <!-- Navigation Buttons -->
                <v-col cols="12" md="4" class="d-flex justify-md-end align-end justify-center gap-2 flex-column flex-md-row mb-2">
                    <v-btn
                        :disabled="!hasPreviousProject"
                        @click="navigateProject('prev')"
                        variant="tonal"
                        class="navigation-btn prev-btn w-100 w-md-auto"
                        :class="{ 'btn-hover': isHoveringPrev }"
                        @mouseenter="isHoveringPrev = true"
                        @mouseleave="isHoveringPrev = false"
                    >
                        <v-icon start>mdi-chevron-left</v-icon>
                        <span>Previous</span>
                    </v-btn>
            
                    <v-btn
                        :disabled="!hasNextProject"
                        @click="navigateProject('next')"
                        variant="tonal"
                        class="navigation-btn next-btn w-100 w-md-auto"
                        :class="{ 'btn-hover': isHoveringNext }"
                        @mouseenter="isHoveringNext = true"
                        @mouseleave="isHoveringNext = false"
                    >
                        <span>Next</span>
                        <v-icon end>mdi-chevron-right</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            
    
            <!-- Project Content -->
            <v-row class="content-section">
                <!-- Images Section -->
                <v-col cols="12" lg="8" class="image-section">
                    <v-carousel
                        v-if="images.length"
                        v-model="currentImage"
                        height="500"
                        hide-delimiters
                        class="project-carousel animate-carousel"
                        show-arrows="hover"
                    >
                        <v-carousel-item
                            v-for="(image, index) in images"
                            :key="index"
                            :src="image"
                            cover
                        >
                            <div class="image-overlay">
                                <v-btn
                                    icon="mdi-magnify"
                                    variant="text"
                                    color="white"
                                    size="large"
                                    class="zoom-btn"
                                    @click.stop="openDialog(image)"
                                ></v-btn>
                            </div>
                        </v-carousel-item>
                    </v-carousel>
    
                    <!-- Image Preview Strip -->
                    <div class="image-preview-strip mt-4 animate-preview">
                        <div
                            v-for="(image, index) in images"
                            :key="index"
                            class="preview-wrapper"
                            :class="{ 'active': currentImage === index }"
                            @click="currentImage = index"
                        >
                            <v-img
                                :src="image"
                                width="100"
                                height="60"
                                cover
                                class="preview-image"
                            ></v-img>
                        </div>
                    </div>
                </v-col>
    
                <!-- Project Description -->
                <v-col cols="12" lg="4" class="description-section">
                    <v-card class="description-card animate-description" variant="outlined">
                        <v-card-title class="text-h5 font-weight-medium">
                            About Project
                        </v-card-title>
                        <v-card-text class="text-body-1">
                            {{ projects[post].name }}
                        </v-card-text>
                        
                        <v-divider class="my-4"></v-divider>
                        
                        <v-card-text>
                            <h3 class="text-h6 mb-4">Technologies Used</h3>
                            <div class="tech-grid">
                                <v-chip
                                    v-for="skill in project_skills"
                                    :key="skill.name"
                                    size="small"
                                    color="white"
                                    variant="outlined"
                                    class="tech-chip"
                                >
                                    {{ skill.name }}
                                </v-chip>
                            </div>
                        </v-card-text>
    
                        <!-- Add this new section for links -->
                        <v-card-text v-if="projects[post]?.website_url || projects[post]?.github_url">
                            <h3 class="text-h6 mb-4">Project Links</h3>
                            <div class="links-container">
                                <v-btn
                                    v-if="projects[post]?.website_url"
                                    :href="projects[post].website_url"
                                    target="_blank"
                                    prepend-icon="mdi-web"
                                    color="#FF81C1"
                                    variant="outlined"
                                    class="mb-2 project-link-btn"
                                >
                                    Visit Website
                                </v-btn>
                                <v-btn
                                    v-if="projects[post]?.github_url"
                                    :href="projects[post].github_url"
                                    target="_blank"
                                    prepend-icon="mdi-github"
                                    color="#FF81C1"
                                    variant="outlined"
                                    class="project-link-btn"
                                >
                                    View on GitHub
                                </v-btn>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
    
            <!-- Fullscreen Image Dialog -->
            <v-dialog
                v-model="x"
                class="image-dialog"
                max-width="1200"
                scrim="#000000"
            >
                <v-card class="image-dialog-card">
                    <v-btn
                        icon="mdi-close"
                        variant="text"
                        color="white"
                        class="close-btn"
                        @click="closeDialog"
                    ></v-btn>
                    <v-img
                        :src="selectedImage"
                        max-height="90vh"
                        contain
                        class="dialog-image"
                    >
                        <template v-slot:placeholder>
                            <v-row align="center" justify="center">
                                <v-progress-circular indeterminate color="#FF81C1"></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                </v-card>
            </v-dialog>
        </v-container>
    </v-app>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useDisplay } from "vuetify";

export default {
    setup() {
        const display = useDisplay();
        const { sm, xs, lg, xl } = useDisplay();
        const route = useRoute();
        const projects = ref([]); // Holds the project data
        const images = ref([]); // Holds images for the selected project
        const project_skills = ref([]); // Holds the skills for the selected project
        const x = ref(false); // Ref for controlling dialog visibility
        const selectedImage = ref(null); // Ref to store the selected image
        const currentImage = ref(0); // Move this to setup
        const isHovering = ref(false);
        const isHoveringBack = ref(false);
        const isHoveringPrev = ref(false);
        const isHoveringNext = ref(false);

        // Fetch projects and their images
        onMounted(async () => {
            try {
                projects.value = await $fetch('/api/projects');
            } catch (error) {
                console.error('Error fetching projects:', error);
            }

            const project = projects.value[post.value]; // Get the selected project

            if (project && project.image && post.value !== null) {
                try {
                    const folderName = project.image; // Assuming 'image' is a property on the project object
                    const { data } = await useFetch('/api/images', {
                        query: {
                            folder: folderName.replace(/^\/+|\/+$/g, '') // Clean the folder path
                        }
                    });
                    images.value = data.value || []; // Update the project with images
                } catch (error) {
                    console.error('Error fetching images:', error);
                }

                try {
                    project_skills.value = await $fetch(`/api/project_skills?project_id=${post.value + 1}`);
                } catch (error) {
                    console.error('Error fetching project_skills:', error);
                }
            } else {
                console.error('Invalid project or image not found');
            }
        });

        // Compute post index based on route param
        const post = computed(() => {
            const id = parseInt(route.params.id) - 1; // Ensure the ID is parsed correctly
            return (projects.value.length > id && id >= 0) ? id : null; // Return null if out of bounds
        });

        // Function to open the dialog with the selected image
        const openDialog = (image) => {
            selectedImage.value = image; // Set the clicked image as the selected image
            x.value = true; // Open the dialog
        };

        // Function to close the dialog
        const closeDialog = () => {
            x.value = false; // Close the dialog
        };

        // Function to go back
        const goBack = () => {
            window.history.back();
        };

        const hasNextProject = computed(() => {
            return post.value !== null && post.value < projects.value.length - 1;
        });

        const hasPreviousProject = computed(() => {
            return post.value !== null && post.value > 0;
        });

        const navigateProject = (direction) => {
            if (post.value === null) return;
            
            const newIndex = direction === 'next' 
                ? post.value + 1 
                : post.value - 1;
            
            if (newIndex >= 0 && newIndex < projects.value.length) {
                navigateTo(`/projects/${newIndex + 1}`);
            }
        };

        return {
            display,
            post,
            x,
            selectedImage,
            projects,
            images,
            project_skills,
            openDialog,
            closeDialog,
            goBack,
            sm,
            xs,
            lg,
            xl,
            currentImage,
            isHovering,
            isHoveringBack,
            isHoveringPrev,
            isHoveringNext,
            hasNextProject,
            hasPreviousProject,
            navigateProject,
        };
    },
    data() {
        return {
            isMobile: false,
            isLoading: true,
            isHovering: false,
            assetsLoaded: false,
            componentsLoaded: false,
            drawer: false,
            hasScrolled: false,
            sections: [
                { id: 'home', name: 'Home' },
                { id: 'about', name: 'About' },
                { id: 'projects', name: 'Projects' },
                { id: 'contact', name: 'Contact' }
            ]
        };
    },
    methods: {
        finishLoading() {
            // Simulate some loading delay and finish
            setTimeout(() => {
                this.isLoading = false; // Stop loading
            }, 1500); // Simulated delay
        },
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

            window.location.replace("/#" + id);

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
        finishLoading() {
            // Simulate some loading delay and finish
            setTimeout(() => {
                this.isLoading = false; // Stop loading
            }, 1500); // Simulated delay
        },
    },
    async mounted() {
        this.updateLayout();
        window.addEventListener("resize", this.updateLayout);
        window.addEventListener('scroll', this.handleScroll);

        this.$nextTick(() => {
            this.componentsLoaded = true;
        });

        this.finishLoading();

        this.handleScroll();
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.updateLayout);
        window.removeEventListener("resize", this.updateLayout); // Clean up event listener
        window.removeEventListener('scroll', this.handleScroll);
    },
};
</script>

<style scoped>

.drawer {
    color: #f08bedfa;
}
.header-section {
    padding: 100px 0;
}

.project-detail {
    padding-top: 2rem;
    background-color: rgb(15, 15, 17);
    min-height: 100vh;
}

.back-button {
    opacity: 0;
    animation: fadeInLeft 0.6s ease forwards;
}

.animate-title {
    opacity: 0;
    animation: fadeInUp 0.8s ease forwards;
}

.skill-chip {
    color: #FF81C1;
}

.animate-chips {
    opacity: 0;
    animation: fadeInUp 0.8s ease forwards 0.2s;
}

.animate-carousel {
    opacity: 0;
    animation: fadeInUp 0.8s ease forwards 0.4s;
}

.animate-preview {
    opacity: 0;
    animation: fadeInUp 0.8s ease forwards 0.6s;
}

.animate-description {
    opacity: 0;
    animation: fadeInLeft 0.8s ease forwards 0.8s;
}

.gradient-text {
    background: linear-gradient(45deg, #FF81C1, #ffffff);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.project-carousel {
    border-radius: 12px;
    overflow: hidden;
    position: relative;
}

.project-carousel :deep(.v-carousel__controls) {
    opacity: 0;
    transition: opacity 0.3s ease;
}

.project-carousel:hover :deep(.v-carousel__controls) {
    opacity: 1;
}

.image-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
}

.project-carousel:hover .image-overlay {
    opacity: 1;
    pointer-events: auto;
    background: rgba(0, 0, 0, 0.3);
}

.zoom-btn {
    transform: scale(0.8);
    transition: all 0.3s ease;
    opacity: 0;
}

.project-carousel:hover .zoom-btn {
    transform: scale(1);
    opacity: 1;
}

.image-preview-strip {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding: 4px;
    scrollbar-width: thin;
    scrollbar-color: #FF81C1 transparent;
}

.image-preview-strip::-webkit-scrollbar {
    height: 4px;
}

.image-preview-strip::-webkit-scrollbar-thumb {
    background-color: #FF81C1;
    border-radius: 2px;
}

.image-preview-strip::-webkit-scrollbar-track {
    background: transparent;
}

.preview-wrapper {
    position: relative;
    cursor: pointer;
    border: 2px solid transparent;
    border-radius: 6px;
    transition: all 0.3s ease;
}

.preview-wrapper.active {
    border-color: #FF81C1;
}

.preview-image {
    border-radius: 4px;
    transition: all 0.3s ease;
    opacity: 0.6;
}

.preview-wrapper:hover .preview-image,
.preview-wrapper.active .preview-image {
    opacity: 1;
}

.preview-wrapper:hover {
    transform: translateY(-2px);
}

.description-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 129, 193, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    height: 100%;
}

.tech-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.tech-chip {
    background: rgba(255, 129, 193, 0.1) !important;
    border-color: rgba(255, 129, 193, 0.3) !important;
    transition: all 0.3s ease;
}

.tech-chip:hover {
    background: rgba(255, 129, 193, 0.2) !important;
    border-color: rgba(255, 129, 193, 0.5) !important;
    transform: translateY(-2px);
}

.image-dialog {
    background: rgba(0, 0, 0, 0.9);
}

.image-dialog-card {
    background: transparent;
    border: none;
    position: relative;
    overflow: hidden;
}

.close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 1;
    background: rgba(0, 0, 0, 0.5);
}

.dialog-image {
    width: 100%;
    height: 100%;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInLeft {
    from {
        opacity: 0;
        transform: translateX(-30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* Responsive adjustments */
@media (max-width: 960px) {
    .project-detail {
        padding-top: 1rem;
    }

    .image-preview-strip {
        justify-content: center;
    }

    .navigation-controls {
        margin-bottom: 1rem;
    }
    
    .navigation-btn {
        font-size: 0.875rem;
    }
}

.links-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.project-link-btn {
    width: 100%;
    transition: all 0.3s ease;
}

.project-link-btn:hover {
    transform: translateY(-2px);
    background: rgba(255, 129, 193, 0.1);
}

.navigation-controls {
    margin-bottom: 2rem;
    padding: 0.5rem;
}

.navigation-btn {
    position: relative;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 129, 193, 0.2);
    color: #FF81C1;
    background: transparent;
}

.navigation-btn.btn-hover {
    background: #FF81C1;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 129, 193, 0.2);
}

.navigation-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
}
</style>
