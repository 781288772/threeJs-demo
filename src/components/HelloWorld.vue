<script setup lang="ts">
import { ref,onMounted } from 'vue'
import * as THREE from "three"
defineProps<{ msg: string }>()

onMounted(()=>{
  initThree();
})


const  initThree = ()=> {
      const scene = new THREE.Scene()
      scene.background = new THREE.Color('#eee')
      const canvas = document.querySelector('#three')
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
      const camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      camera.position.z = 10

      function animate() {
        renderer.render(scene, camera)
        requestAnimationFrame(animate)
      }
      animate()
    }
</script>

<template>
  <canvas id="three"></canvas>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
