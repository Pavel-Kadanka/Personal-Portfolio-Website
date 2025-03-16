<template>
  <div class="bio-section-wrapper">
    <div class="timeline-side">
      <h2 class="text-center text-h4 mb-8">My Journey</h2>
      <div class="timeline-wrapper" :class="{ 'mobile': isMobile }">
        <!-- Timeline for desktop -->
        <v-timeline 
                   density="compact" 
                   align="start" 
                   line-color="#FFFFFF"
                   side="end"
                   class="timeline-desktop">
          <v-timeline-item v-for="(item, i) in highlightedItems" 
                          :key="i" 
                          :dot-color="item.color" 
                          :icon="item.icon" 
                          size="small"
                          fill-dot>
            <div class="timeline-content">
              <h3 class="text-h6">{{ item.title }}</h3>
              <div class="text-body-2">{{ item.date }}</div>
              <p class="text-body-2 mt-1">{{ item.text }}</p>
            </div>
          </v-timeline-item>
        </v-timeline>

        <!-- Timeline for mobile -->
        
      </div>
    </div>

    <div class="skills-side">
      <h2 class="text-center text-h4 mb-8">My Skills</h2>
      <div class="skills-grid">
        <div v-for="skill in skills" :key="skill.name" class="skill-card">
          <div class="skill-content">
            <v-progress-circular
              :model-value="skill.percentage"
              color="#FF81C1"
              :size="90"
              :width="8"
              class="mb-3"
            >
              {{ skill.percentage }}%
            </v-progress-circular>
            <h3 class="text-h6">{{ skill.name }}</h3>
            <div class="skill-tags">
              <v-chip
                v-for="tag in skill.tags"
                :key="tag"
                size="small"
                color="#FF81C1"
                class="ma-1"
              >
                {{ tag }}
              </v-chip>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      // Only show the most important/recent items
      highlightedItems: [
        {
          color: '#FF81C1',
          icon: 'mdi-teach',
          title: 'Algorithmics',
          date: '2025-Present',
          text: 'Online programming teacher at Algorithmics',
        },
        {
          color: '#FF81C1',
          icon: 'mdi-certificate',
          title: 'CCNA: Introduction to Networks',
          date: '2024',
          text: 'Completed CCNA: Introduction to Networks course from Cisco',
        },
        {
          color: '#FF81C1',
          icon: 'mdi-certificate',
          title: 'IT Essentials Certificate',
          date: '2024',
          text: 'Completed IT Essentials course from Cisco',
        },
        {
          color: '#FF81C1',
          icon: 'mdi-briefcase',
          title: 'Via Aurea',
          date: '2023-Present',
          text: 'Junior web developer at Via Aurea',
        },
        {
          color: '#FF81C1',
          icon: 'mdi-school',
          title: 'IT High School Brno',
          date: '2022-2026',
          text: 'Studying at IT High School of Technology and Economics, Brno',
        },
      ],
      skills: [
        {
          name: 'Frontend Core',
          percentage: 95,
          tags: ['HTML', 'CSS', 'JavaScript']
        },
        {
          name: 'Vue Ecosystem',
          percentage: 80,
          tags: ['Vue 3', 'Nuxt 3', 'Vuetify']
        },
        {
          name: 'Backend',
          percentage: 65,
          tags: ['PHP', 'Laravel', 'C#', 'Python']
        },
        {
          name: 'Development Tools',
          percentage: 90,
          tags: ['Git', 'Version Control']
        },
        {
          name: 'Design',
          percentage: 75,
          tags: ['UI/UX', 'Figma']
        },
        {
          name: 'Other Technologies',
          percentage: 70,
          tags: ['RESTful APIs', 'SQL', 'Responsive Design']
        }
      ]
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

<style scoped>

</style>
