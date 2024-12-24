<template>
  <h2 class="text-center text-h4 pb-6 pt-8">My route</h2>
  <v-timeline align="start" line-color="#FFFFFF">
    <v-timeline-item v-for="(item, i) in items" :key="i" :dot-color="item.color" :icon="item.icon" fill-dot>
      <v-card :title="item.title" :subtitle="item.date" variant="outlined" :color="item.color">
        <v-card-text>
          <p>{{ item.text }}</p>
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>
<script>
export default {
  data: () => ({
    items: [
      {
        color: '#FF81C1',
        icon: 'mdi-lightbulb-on', // Represents starting or learning something new
        title: 'Start of My Programming Journey',
        date: '2020',
        text: 'This year marked the beginning of my programming journey as I started learning basic concepts and foundational skills.',
      },
      {
        color: '#FF81C1',
        icon: 'mdi-school', // Represents education or school
        title: 'IT High School Brno Olomoucká',
        date: '2021-2026',
        text: 'In 2021, I enrolled in the IT High School of Technology and Economics in Brno, Olomoucká, where I continue to study.',
      },
      {
        color: '#FF81C1',
        icon: 'mdi-publish', // Represents blogging or writing
        title: 'Takovi',
        date: '2021',
        text: 'Launched my first major project, "Takovi," a blog dedicated to electronics.',
      },
      {
        color: '#FF81C1',
        icon: 'mdi-rocket', // Represents growth or exploration
        title: 'Year of Growth',
        date: '2022',
        text: 'Spent 2022 focusing on learning new skills and broadening my knowledge.',
      },
      {
        color: '#FF81C1',
        icon: 'mdi-briefcase', // Represents work or a job
        title: 'Via Aurea',
        date: '2023-Present',
        text: 'Started my first job as a junior web developer at Via Aurea.',
      },
      {
        color: '#FF81C1',
        icon: 'mdi-certificate', // Represents certification
        title: 'IT Essentials Cisco Certificate',
        date: '2024',
        text: 'Successfully completed the IT Essentials course from Cisco.',
      },
      {
        color: '#FF81C1',
        icon: 'mdi-web', // Represents website development or online presence
        title: 'Portfolio Launch',
        date: '2024',
        text: 'Designed and published the first version of my portfolio website.',
      },
      {
        color: '#FF81C1',
        icon: 'mdi-teach', // Represents teaching or education
        title: 'Algorithmics',
        date: '2024-Present',
        text: 'Joined Algorithmics as an online programming teacher.',
      },
    ],
  }),
}
</script>
<style scoped>
@import url(assets/css/styles.css);
</style>