<template>
    <v-container>
        <v-row>
            <v-col v-for="project in projects" :key="project.id" cols="12" md="6">
                <a :href="'/projects/' + project.id">
                    <v-card variant="outlined" color="#FF81C1">
                        <v-card-title class="text-h4 font-weight-bold">{{ project.title }}</v-card-title>
    
                        <!-- Carousel for Images -->
                        <v-carousel v-if="projectImages[project.id] && projectImages[project.id].length" height="250" class="pa-4">
                            <v-carousel-item
                                v-for="(img, index) in projectImages[project.id]"
                                :key="index"
                                :src="img"
                                cover
                            ></v-carousel-item>
                        </v-carousel>
    
                        <v-card-text class="truncate-text text-subtitle-1">{{ project.name }}</v-card-text>
                        <v-card-actions class="pa-4">
                            <v-btn variant="outlined" :to="'/projects/' + project.id">More Info</v-btn>
                        </v-card-actions>
                    </v-card>
                </a>
            </v-col>
        </v-row>
    </v-container>
</template>


<script setup>
import { ref, onMounted } from 'vue';

const projects = ref([]); // Holds the project data
const projectImages = ref({}); // Holds images for each project folder

// Fetch projects and their images
const fetchProjects = async () => {
    try {
        // Fetch the list of projects
        const fetchedProjects = await $fetch('/api/projects');
        projects.value = fetchedProjects;

        // Fetch images for each project folder
        for (const project of fetchedProjects) {
            const folderName = project.image; // Assuming project.image contains the folder name for images
            if (!folderName) {
                console.error(`Project ${project.id} has no valid image folder name.`);
                projectImages.value[project.id] = [];
                continue;
            }

            try {
                const images = await $fetch(`/server/api/images/${folderName.replace(/^\/?/, '')}`);
                projectImages.value[project.id] = images;
            } catch (error) {
                console.error(`Error fetching images for folder "${folderName}":`, error.message);
                projectImages.value[project.id] = [];
            }
        }
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
};

onMounted(() => {
    fetchProjects();
});
</script>


<style>
@import url(assets/css/styles.css);
.truncate-text {
    max-height: 5.5em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}
a {
    text-decoration: none;
}
</style>
