<template>
    <div class="testimonials-container dark-theme">
        <h2 class="text-h4 gradient-text text-center mb-8">What Clients Say</h2>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-carousel 
                        show-arrows="hover" 
                        cycle 
                        height="auto" 
                        class="testimonials-carousel"
                        :hide-delimiter-background="true"
                        >
                        <v-carousel-item 
                            v-for="(testimonial, index) in testimonials" 
                            :key="index"
                        >
                            <v-card class="testimonial-card pa-6 dark-card">
                                <v-card-text class="text-center">
                                    <v-icon class="quote-icon">mdi-format-quote-open</v-icon>
                                    <p class="text-subtitle-1 font-italic mb-4 white--text">"{{ testimonial.message }}"</p>
                                    <v-icon class="quote-icon">mdi-format-quote-close</v-icon>
                                </v-card-text>
                                <v-card-actions class="justify-center mb-4">
                                    <div class="ml-4">
                                        <p class="font-weight-bold mb-1 white--text text-center">{{ testimonial.name }}</p>
                                        <p class="text-caption text--lighten-1">{{ testimonial.role }}</p>
                                    </div>
                                </v-card-actions>
                            </v-card>
                        </v-carousel-item>
                    </v-carousel>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            testimonials: [
                {
                    name: "Jiří Matuška",
                    role: "Owner, GrantPneu",
                    message: "The collaboration on creating my company website was excellent. I especially appreciate its simplicity, clarity, and ease of navigation for visitors. All important information is easily accessible without unnecessary complications. The website looks modern and professional. If you are looking for someone to create a functional and efficient website, I definitely recommend them.",
                },
            ],
        };
    },
};
</script>

<style scoped>
.testimonials-container.dark-theme {
    padding: 4rem 0;
}

.gradient-text {
    background: var(--primary-gradient); /* Adjust gradient to match your site */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.testimonials-carousel {
    margin: 0 auto;
    max-width: 800px;
}

.testimonial-card.dark-card {
    background-color: var(--card-color); /* Dark card background */
    color: #ffffff; /* White text for readability */
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1); /* Light shadow for contrast */
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.quote-icon {
    color: var(--primary-color); /* Adjust to match your site's theme */
    font-size: 2rem;
    margin-bottom: 1rem;
}

.v-card-text {
    line-height: 1.8;
}

.white--text {
    color: #ffffff !important; /* Ensure text is white */
}

.text--lighten-1 {
    color: rgba(255, 255, 255, 0.7); /* Lighter text for secondary content */
}
</style>