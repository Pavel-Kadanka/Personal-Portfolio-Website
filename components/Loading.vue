<template>
    <div id="loading" class="text-center">
        <div class="loading-content">
            <v-progress-circular
                color="#FF81C1"
                indeterminate
                size="120"
                width="8"
            ></v-progress-circular>
            <div class="loading-text gradient-text">
                Loading...
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>
#loading {
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(15, 15, 17);
}

.loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
}

.loading-text {
    font-size: 1.5rem;
    font-weight: 500;
    margin-top: 1rem;
    animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
}
</style>