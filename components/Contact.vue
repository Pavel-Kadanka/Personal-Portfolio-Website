<template>
    <v-row align="center" justify="center" :style="{padding: padding + 'px'}">
        <v-btn href="https://github.com/Pavel-Kadanka" :style="{ margin: margin + 'px'}" height="60" width="60" variant="outlined" color="#FF81C1"
            class="hover">
            <v-icon left>
                <img src="/github.svg" alt="Github" height="25">
            </v-icon>
        </v-btn>

        <v-btn href="mailto:“pavel.kadanka@outlook.cz" @click="openPopup" :style="{ marginLeft: margin + 'px', marginRight: margin + 'px' }" height="60" width="60" variant="outlined" color="#FF81C1" class="hover">
            <v-icon left>
                <img src="/mail.png" alt="message" height="25">
            </v-icon>
        </v-btn>

        <v-dialog v-model="dialog" max-width="500px" persistent>
            <v-card variant="elevated" color="#212E4A" align="center">
                <v-card-title class="special-font font-weight-bold special-color02">This is my working email
                    :)</v-card-title>
                <v-card-text class="text-subtitle-1 opacity-60">
                    pavel.kadanka@outlook.cz
                </v-card-text>
                <v-card-actions>
                    <v-btn variant="outlined" color="#FF81C1" text @click="closePopup">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-btn href="https://www.linkedin.com/in/pavel-kada%C5%88ka-48a34b296/" :style="{ marginLeft: margin + 'px', marginRight: margin + 'px' }" height="60" width="60"
            variant="outlined" color="#FF81C1" class="hover">
            <v-icon left>
                <img src="/linkedin.svg" alt="LinkedIn" height="25">
            </v-icon>
        </v-btn>

        <v-btn href="https://www.upwork.com/freelancers/~01e505b19bc3648ea8?mp_source=share" :style="{ marginLeft: margin + 'px', marginRight: margin + 'px' }" height="60" width="60"
            variant="outlined" color="#FF81C1" class="hover">
            <v-icon left>
                <img src="/upwork.svg" alt="UpWork" height="25">
            </v-icon>
        </v-btn>
    </v-row>

</template>
<script>
export default {
    data() {
        return {
            dialog: false,
            margin: 10,
            padding: 50,
        }
    },
    methods: {
        openPopup() {
            this.dialog = true;
        },
        closePopup() {
            this.dialog = false;
        }
    }
}
</script>
<style scoped>
@import url(assets/css/styles.css);

.hover {
    transition: 1s;
    /* Ensure the transition property applies to the transform */
}

.hover:hover {
    transform: scale(1.1);
    /* Use transform: scale to apply the scaling */
}
</style>