<template>
  <v-container class="px-4">
    <h2 class="text-center text-h4 mb-8 mb-md-12 animate-title">My Projects</h2>
    <v-row>
      <v-col v-for="(project, index) in sortedProjects"
             :key="project.id"
             cols="12"
             sm="6"
             lg="4"
             class="project-col">
        <v-card
          class="project-card"
          :style="{ animationDelay: `${index * 0.2}s` }"
          variant="outlined"
          @mouseover="hoveredProject = project.id"
          @mouseleave="hoveredProject = null"
        >
          <div class="project-image-wrapper">
            <v-carousel
              v-if="projectImages[project.id]?.length"
              height="300"
              hide-delimiters
              :show-arrows="hoveredProject === project.id"
              class="project-carousel"
            >
              <v-carousel-item
                v-for="(img, index) in projectImages[project.id]"
                :key="index"
                :src="img"
                cover
              >
                <div class="image-overlay" v-if="hoveredProject === project.id">
                  <v-btn
                    variant="outlined"
                    color="white"
                    class="view-project-btn"
                    :to="'/projects/' + project.id"
                  >
                    View Project
                    <v-icon end icon="mdi-arrow-right" class="ml-2"></v-icon>
                  </v-btn>
                </div>
              </v-carousel-item>
            </v-carousel>
          </div>

          <v-card-title class="project-title pa-4">
            <div class="d-flex align-center justify-space-between">
              <h3 class="text-h5 font-weight-medium">{{ project.title }}</h3>
              <v-chip
                color="#FF81C1"
                size="small"
                class="project-status"
              >
                {{ project.status || 'Completed' }}
              </v-chip>
            </div>
          </v-card-title>

          <v-card-text class="project-description pa-4 pt-0">
            {{ truncateText(project.description || project.name || '', 150) }}
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="pa-4">
            <v-chip-group>
              <v-chip
                v-for="skill in project_skills[project.id]"
                :key="skill.name"
                size="small"
                variant="outlined"
                class="tech-chip"
              >
                {{ skill.name }}
              </v-chip>
            </v-chip-group>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const projects = ref([]);
const projectImages = ref({});
const project_skills = ref({});
const loading = ref(true);
const hoveredProject = ref(null);

const truncateText = (text, maxLength) => {
  console.log('Input text:', text);
  console.log('Text length:', text?.length);

  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace === -1) {
    return truncated + '...';
  }
  
  return truncated.substring(0, lastSpace) + '...';
};

const fetchProjects = async () => {
  try {
    const { data: fetchedProjects } = await useFetch('/api/projects');
    console.log('Fetched projects:', fetchedProjects.value);
    
    if (fetchedProjects.value) {
      projects.value = fetchedProjects.value.map(project => ({
        ...project,
        description: project.description || project.name || ''
      }));

      // Fetch skills for each project
      for (const project of fetchedProjects.value) {
        try {
          const skills = await $fetch(`/api/project_skills?project_id=${project.id}`);
          project_skills.value[project.id] = skills;
        } catch (error) {
          console.error(`Error fetching skills for project ${project.id}:`, error);
          project_skills.value[project.id] = [];
        }
      }
    }

    // Fetch images for each project
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
            folder: folderName.replace(/^\/+|\/+$/g, ''),
          },
        });
        projectImages.value[project.id] = data.value || [];
      } catch (error) {
        console.error(`Error fetching images for folder "${folderName}":`, error.message);
        projectImages.value[project.id] = [];
      }
    }
  } catch (error) {
    console.error('Error fetching projects:', error);
  } finally {
    loading.value = false;
  }
};

// Sort projects in descending order
const sortedProjects = computed(() =>
  [...projects.value].sort((a, b) => b.id - a.id)
);

onMounted(() => {
  fetchProjects();
});
</script>

<style>
@import '@/assets/css/components/projects.css';
</style>
