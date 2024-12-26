<template>
    <v-container v-if="isLoading">
        <Loading />
    </v-container>
    <v-container v-else>
        <v-row>
            <v-col>
                <h1 class="text-h2 font-weight-bold special-color02 text-left">
                    {{ post !== null ? projects[post].title : 'Loading...' }}
                </h1>
            </v-col>
        </v-row>
        <v-row>
            <!-- First column with images and progress circular -->
            <v-col cols="12">
                <!-- Dialog for the image -->
                <v-dialog v-model="x" @click="closeDialog" class="blurred-background">
                    <v-img :src="selectedImage?.src" max-height="500px" class="image"></v-img>
                </v-dialog>

                <!-- Carousel to display images -->
                <v-carousel v-if="images.length" height="350px" class="mt-8">
                    <v-carousel-item v-for="(image, index) in images" :key="index" :src="image" cover
                        @click="openDialog({ src: image })">
                    </v-carousel-item>
                </v-carousel>

                <h2 class="text-h5 font-weight-bold special-color pt-4">
                    Used languages
                </h2>

                <span v-for="skill in project_skills" class="text-subtitle-1 font-weight-bold pr-8">
                    <v-icon icon="mdi-file" color="#FF81C1"></v-icon>{{ skill.name }}
                </span>
            </v-col>

            <!-- Second column with project name -->
            <v-col>
                <p class="text-subtitle-1">{{ projects[post].name }}</p>
            </v-col>
        </v-row>
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
            xl
        };
    },
    data() {
        return {
            isMobile: false, // Initialize `isMobile`
            isLoading: true, // State to control loading animation
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
@import url(assets/css/styles.css);

.blurred-background {
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(10px);
    padding: 10px;
}

.image {
    position: block;
    z-index: 1;
    filter: none;
}

.custom-width {
    width: 100%;
}
</style>
