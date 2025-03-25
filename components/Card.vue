<template>
    <div class="m-1 p-5 rounded-lg container bg-opacity-90 bg-slate-900 border-primary border-2">
        <slot></slot>
    </div>
</template>

<style scoped>

/* Glow effect on border, plus a slight response to hover by changing the border color near the cursor */
.container {
    @apply border-primary border-2 shadow-primary shadow-sm;
    transition: border-color 0.5s;
}

</style>