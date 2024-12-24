<template>
    <v-container id="skills" class="align-center">
        <v-row>
            <v-col align="center">
                <h2 class="text-h4">My skills</h2>
            </v-col>
        </v-row>
        <v-row class="px-10">
            <v-col align="center" align-self="center" :class="{'text-center': isMobile}">
                <v-progress-circular
                    v-for="skill in skills"
                    :key="skill.id"
                    class="ma-1 percentage"
                    color="#FF81C1"
                    bg-color="white"
                    :size="isMobile ? 80 : 120"
                    :model-value="skill.percentage"
                >
                    <span class="text-subtitle-1 font-weight-bold">{{ skill.name }}</span>
                </v-progress-circular>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { useDisplay } from 'vuetify';

export default {
    setup() {
        const display = useDisplay(); // Access reactive display values
        const projects = ref([]);
        const skills = ref([]);
        onMounted(async () => {
        // Fetch projects
        try {
            projects.value = await $fetch('/api/projects');
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
        // Fetch skills
        try {
            skills.value = await $fetch('/api/skills');
        } catch (error) {
            console.error('Error fetching skills:', error);
        }
        });
        return {
            display, 
            projects,
            skills
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
    },
    mounted() {
        this.updateLayout(); // Check layout on mount
        window.addEventListener("resize", this.updateLayout); // Update on resize
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.updateLayout); // Clean up event listener
    },
};
</script>
<style>
@import url(assets/css/styles.css);

</style>