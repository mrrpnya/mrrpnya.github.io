<template>
    <div class="m-1 p-5 rounded-lg container bg-opacity-90 bg-slate-900 border-purple-600 border-2">
        <slot></slot>
    </div>
</template>

<style scoped>

/* Glow effect on border, plus a slight response to hover by changing the border color near the cursor */
.container {
    transition: border-color 0.5s;
    border-color: #A020F0;
    box-shadow: 0 0 10px #A020F0;
}

</style>