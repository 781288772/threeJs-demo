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
      gltfLoader.load('/public/scene.gltf', (gltf:any) => {
        var model = gltf.scene
           //遍历模型每部分
           model.traverse((o:any) => {
          //将图片作为纹理加载
          let explosionTexture = new THREE.TextureLoader().load(
            '/public/textures/Material_baseColor.png'
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
     
      // const hemLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6)
      // hemLight.position.set(0, 48, 0)
      // scene.add(hemLight)

      // const dirLight = new THREE.DirectionalLight(0xffffff, 0.6)
      // //光源等位置
      // dirLight.position.set(-10, 8, -5)
      // //可以产生阴影
      // dirLight.castShadow = true
      // dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024)
      // scene.add(dirLight)

      // let floorGeometry = new THREE.PlaneGeometry(8000, 8000)
      // let floorMaterial = new THREE.MeshPhongMaterial({
      //   color: 0x857ebb,
      //   shininess: 0,
      // })

      // let floor = new THREE.Mesh(floorGeometry, floorMaterial)
      // floor.rotation.x = -0.5 * Math.PI
      // floor.receiveShadow = true
      // floor.position.y = -0.001
      // scene.add(floor)


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
      function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement
        var width = window.innerWidth
        var height = window.innerHeight
        var canvasPixelWidth = canvas.width / window.devicePixelRatio
        var canvasPixelHeight = canvas.height / window.devicePixelRatio

        const needResize =
          canvasPixelWidth !== width || canvasPixelHeight !== height
        if (needResize) {
          renderer.setSize(width, height, false)
        }
        return needResize
      }

    
    }
</script>

<template>
  <canvas id="three"></canvas>
</template>

<style scoped>
#three {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
.t{
  color:#77B176;
}
</style>
