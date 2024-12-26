<template>
    <v-container>
        <v-row>
            <v-col v-for="project in projects" :key="project.id" cols="12" md="6">
                    <v-card variant="outlined" color="#FF81C1">
                        <a :href="'/projects/' + project.id"><v-card-title class="text-h4 font-weight-bold">{{ project.title }}</v-card-title></a>

                        <!-- Carousel for Images -->
                        <v-carousel v-if="projectImages[project.id]?.length" height="250" class="pa-4">
                            <a :href="'/projects/' + project.id">
                                <v-carousel-item
                                v-for="(img, index) in projectImages[project.id]"
                                :key="index"
                                :src="img"
                                cover
                            ></v-carousel-item>
                            </a>
                        </v-carousel>

                        <v-card-text class="truncate-text text-subtitle-1">{{ project.name }}</v-card-text>
                        <v-card-actions class="pa-4">
                            <v-btn variant="outlined" :to="'/projects/' + project.id">More Info</v-btn>
                        </v-card-actions>
                    </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const projects = ref([]);
const projectImages = ref({});

const fetchProjects = async () => {
    try {
        const { data: fetchedProjects } = await useFetch('/api/projects');
        projects.value = fetchedProjects.value;

        // Fetch images for each project folder
        for (const project of fetchedProjects.value) {
            const folderName = project.image;
            if (!folderName) {
                console.error(`Project ${project.id} has no valid image folder name.`);
                projectImages.value[project.id] = [];
                continue;
            }

            try {
                const { data } = await useFetch('/api/images', {
                    query: {
                        folder: folderName.replace(/^\/+|\/+$/g, '')
                    }
                });
                projectImages.value[project.id] = data.value || [];
            } catch (error) {
                console.error(`Error fetching images for folder "${folderName}":`, error.message);
                projectImages.value[project.id] = [];
            }
        }
    } catch (error) {
        console.error('Error fetching projects:', error.message);
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
