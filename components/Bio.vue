<template>
  <div class="bio-section-wrapper">
    <div class="timeline-side">
      <h2 class="text-center text-h4 mb-8">My Journey</h2>
      <div class="timeline-wrapper" :class="{ 'mobile': isMobile }">
        <!-- Timeline for desktop -->
        <v-timeline v-if="!isMobile" 
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
        <div v-else class="timeline-mobile">
          <v-card v-for="(item, i) in highlightedItems" 
                  :key="i"
                  variant="outlined"
                  :color="item.color"
                  class="mb-4">
            <v-card-item>
              <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>
              <v-card-title>{{ item.title }}</v-card-title>
              <v-card-subtitle class="text-white">{{ item.date }}</v-card-subtitle>
            </v-card-item>
            <v-card-text class="text-body-2">
              {{ item.text }}
            </v-card-text>
          </v-card>
        </div>
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
          icon: 'mdi-briefcase',
          title: 'Via Aurea',
          date: '2023-Present',
          text: 'Junior web developer at Via Aurea',
        },
        {
          color: '#FF81C1',
          icon: 'mdi-teach',
          title: 'Algorithmics',
          date: '2024-Present',
          text: 'Online programming teacher at Algorithmics',
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
          icon: 'mdi-school',
          title: 'IT High School Brno',
          date: '2021-2026',
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
          tags: ['Vue 3', 'Nuxt 3']
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
.bio-section-wrapper {
  display: flex;
  gap: 4rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 100vh;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.timeline-side {
  flex: 1;
  max-width: 25%;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.skills-side {
  flex: 3;
  max-width: 75%;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 1rem;
  height: calc(100% - 80px);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #FF81C1 transparent;
}

.skill-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 129, 193, 0.2);
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.skill-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(240, 139, 237, 0.15);
}

.skill-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.skill-tags {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}

/* Timeline styles remain the same but remove max-width from bio-container */
.bio-container {
  max-height: 100vh;
  padding: 2rem 0;
  overflow: hidden;
}

.timeline-wrapper {
  height: calc(100% - 80px);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #FF81C1 transparent;
  position: relative;
}

.timeline-wrapper::-webkit-scrollbar {
  width: 4px;
}

.timeline-wrapper::-webkit-scrollbar-thumb {
  background-color: #FF81C1;
  border-radius: 2px;
}

.timeline-wrapper::-webkit-scrollbar-track {
  background: transparent;
}

.timeline-desktop {
  padding: 0 1rem;
}

.timeline-content {
  background: rgba(255, 255, 255, 0.05);
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 129, 193, 0.2);
}

.timeline-mobile {
  padding: 0 0.5rem;
}

.mobile {
  max-height: calc(100vh - 100px);
}

/* Fade effect for scrollable content */
.timeline-wrapper::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(transparent, rgb(15, 15, 17));
  pointer-events: none;
}

/* Responsive design */
@media (max-width: 960px) {
  .bio-section-wrapper {
    height: auto;
    flex-direction: column;
    gap: 2rem;
  }

  .timeline-side,
  .skills-side {
    max-width: 100%;
    height: auto;
  }

  .timeline-wrapper,
  .skills-grid {
    height: auto;
    max-height: 500px;
  }

  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}

/* Responsive adjustments */
@media (min-width: 961px) and (max-width: 1264px) {
  .bio-container {
    max-width: 70%;
  }
}

/* Add scrollbar styling for skills grid */
.skills-grid::-webkit-scrollbar {
  width: 4px;
}

.skills-grid::-webkit-scrollbar-thumb {
  background-color: #FF81C1;
  border-radius: 2px;
}

.skills-grid::-webkit-scrollbar-track {
  background: transparent;
}
</style>
