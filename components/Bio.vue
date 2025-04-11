<template>
  <div class="bio-section-wrapper">
    <!-- Timeline (left side) -->
    <div class="timeline-side">
      <h2 class="text-center text-h4 mb-8">My Journey</h2>
      <div class="timeline-wrapper" :class="{ mobile: isMobile }">
        <v-timeline
          line-color="#FFFFFF"
          class="timeline-desktop"
          :align="isMobile ? 'start' : 'center'" 
          :side="isMobile ? 'end' : ''"
        >
          <v-timeline-item
            v-for="(item, i) in highlightedItems"
            :key="i"
            :dot-color="item.color"
            :icon="item.icon"
            size="small"
            fill-dot
          >
            <div class="timeline-content">
              <h3 class="text-h6 font-bold mb-1">{{ item.title }}</h3>
              <div class="text-body-2 text-grey-darken-1">{{ item.date }}</div>
              <p class="text-body-2 mt-1">{{ item.text }}</p>
            </div>
          </v-timeline-item>
        </v-timeline>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const display = useDisplay();
    return { display };
  },
  data() {
    return {
      isMobile: false,
      highlightedItems: [
        {
          color: '#FF81C1',
          icon: 'mdi-rocket',
          title: 'GrantPneu',
          date: '2025',
          text: 'Created my first project for client grantpneu.cz',
        },
        {
          color: '#FF81C1',
          icon: 'mdi-teach',
          title: 'Algorithmics',
          date: '2025–Present',
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
          date: '2023–Present',
          text: 'Junior web developer at Via Aurea',
        },
        {
          color: '#FF81C1',
          icon: 'mdi-school',
          title: 'IT High School Brno',
          date: '2022–2026',
          text: 'Studying at IT High School of Technology and Economics, Brno',
        },
      ],
    };
  },
  methods: {
    updateLayout() {
      this.isMobile = this.display.smAndDown;
    },
  },
  mounted() {
    this.updateLayout();
    window.addEventListener('resize', this.updateLayout);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateLayout);
  },
};
</script>

<style scoped>

</style>
