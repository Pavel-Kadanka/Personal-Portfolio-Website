<template>
    <v-container v-if="isLoading">
        <Loading />
    </v-container>
    <v-container v-else class="project-detail">
        <!-- Navigation Row -->


        <v-row class="header-section">
            <!-- Title -->
            <v-col cols="10" md="8">
                <h1 class="text-h2 font-weight-bold gradient-text animate-title text-md-h2 text-sm-h3 text-xs-h5">
                    {{ post !== null ? projects[post].title : 'Loading...' }}
                </h1>
            </v-col>
        
            <!-- Back Button -->
            <v-col cols="2" md="4" class="d-flex justify-end">
                <v-btn
                    v-if="$vuetify.display.xs"
                    href="/"
                    variant="tonal"
                    class="navigation-btn back-btn fab-back"
                    icon
                >
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>

                <!-- Standard Button on MD+ -->
                <v-btn
                    v-else
                    href="/"
                    variant="tonal"
                    class="navigation-btn"
                    :class="{ 'btn-hover': isHoveringBack }"
                    @mouseenter="isHoveringBack = true"
                    @mouseleave="isHoveringBack = false"
                >
                    <v-icon start>mdi-arrow-left</v-icon>
                    <span>Back</span>
                </v-btn>
            
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
            <v-col cols="12" md="4" class="d-flex justify-md-end justify-center gap-2 flex-column flex-md-row">
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
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useDisplay } from "vuetify";

export default {
    setup() {
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
        };
    },
    methods: {
        finishLoading() {
            // Simulate some loading delay and finish
            setTimeout(() => {
                this.isLoading = false; // Stop loading
            }, 1500); // Simulated delay
        },
    },
    mounted() {
        this.finishLoading(); // Simulate loading process on mount
    }
};
</script>

<style scoped>
.project-detail {
    padding-top: 2rem;
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
