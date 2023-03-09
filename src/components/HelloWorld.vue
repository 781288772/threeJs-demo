<script setup lang="ts">
import { ref,onMounted } from 'vue'
import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
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
        25,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      camera.position.z = 10;

      const gltfLoader = new GLTFLoader()
      gltfLoader.load('/public/1.gltf', (gltf) => {
        var model = gltf.scene
           //遍历模型每部分
           model.traverse((o) => {
          //将图片作为纹理加载
          let explosionTexture = new THREE.TextureLoader().load(
            '/public/textures/potted_plant_01_leaves_diff_4k.jpg'
          )
          //调整纹理图的方向
          explosionTexture.flipY = false
          //将纹理图生成基础网格材质(MeshBasicMaterial)
          const material = new THREE.MeshBasicMaterial({
            map: explosionTexture,
          })
          //给模型每部分上材质
          o.material = material
        })
        scene.add(model)
      })
      function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement
        var width = window.innerWidth
        var height = window.innerHeight
        var canvasPixelWidth = canvas.width / window.devicePixelRatio
        var canvasPixelHeight = canvas.height / window.devicePixelRatio

        const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height
        if (needResize) {
          renderer.setSize(width, height, false)
        }
        return needResize
      }
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      function animate() {
        controls.update()
        renderer.render(scene, camera)
        requestAnimationFrame(animate)

        //添加下面代码
        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement
          camera.aspect = canvas.clientWidth / canvas.clientHeight
          camera.updateProjectionMatrix()
        }
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
