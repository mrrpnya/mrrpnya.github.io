<script setup lang="ts">
import { Engine } from '@tsparticles/engine';

const onLoad = (container: Container) => {
}

</script>

<template>
    <div>
    <NuxtParticles
            class="w-full h-full z-0"
            id="tsparticles"
            @load="onLoad"
            :particlesInit="particlesInit"
            :options="{
                    fullScreen: {
                        enable: true,
                        zIndex: -10
                    },
                    fpsLimit: 40,
                    interactivity: {
                        detect_on: 'window',
                        events: {
                            onHover: {
                                enable: true,
                                mode: 'repulse'
                            },
                        },
                        modes: {
                            repulse: {
                                distance: 100,
                                duration: 1.0
                            }
                        }
                    },
                    particles: {
                        zIndex: 0,
                        color: {
                            value: '#A020F0'
                        },
                        links: {
                            color: '#B020F0',
                            distance: 200,
                            enable: true,
                            opacity: 0.5,
                            width: 1.5
                        },
                        move: {
                            direction: 'none',
                            enable: true,
                            outModes: 'bounce',
                            random: false,
                            speed: 1.5,
                            straight: false
                        },
                        number: {
                            density: {
                                enable: true,
                            },
                            value: 40
                        },
                        opacity: {
                            value: 0.5
                        },
                        shape: {
                            type: 'circle'
                        },
                        size: {
                            value: { min: 2, max: 9 }
                        }
                    },
                    detectRetina: true
                }"
        >
    </NuxtParticles>
    <slot></slot>
</div>
</template>