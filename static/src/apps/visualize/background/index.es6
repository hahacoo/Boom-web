import './style'
import { createDashBoard } from 'utils/stiBuilder'
import * as THREE from "three"

let template = `
<div class="visualize-background">
    <div id="back-common"></div>
    <div id="pic-bg"></div>
</div>
`

export default {

    template,
    created() {
		this.initAnimation()
    },
    methods: {
        initAnimation() {
            let camera,
                scene,
                renderer,
                mesh

            this.$nextTick(function() {
                init()
                animate()
            })

            function init() {
                // TODO
                // CAMERA
                camera = new THREE.PerspectiveCamera(
                    45,
                    window.innerWidth / window.innerHeight,
                    1,
                    6000
                )
                camera.position.z = 2400
                // SCENE
                scene = new THREE.Scene()

                let texture = THREE.ImageUtils.loadTexture("/static/img/bg-2.png")
                let geometry = new THREE.SphereGeometry(1600, 100, 100)
                let material = new THREE.MeshBasicMaterial({
                    // color: 0xf000ff,
                    map: texture,
                    side: THREE.BackSide,
                    // blending: THREE.AdditiveBlending,
                    // transparent: true,W
                    opacity: 0.8
                })

                mesh = new THREE.Mesh(geometry, material)

                scene.add(mesh)
                // RENDERER
                renderer = new THREE.WebGLRenderer()
                renderer.setPixelRatio(window.devicePixelRatio)
                renderer.setSize(window.innerWidth, window.innerHeight)
                // renderer.domElement.id = 'back-common'
                // renderer.domElement.style = 'position: absolute; z-index: 0'
                document.getElementById('back-common').appendChild(renderer.domElement)
                // EVENTS
                window.addEventListener('resize', onWindowResize, false)
            }

            function onWindowResize() {
                renderer.setSize(window.innerWidth, window.innerHeight)
                camera.aspect = window.innerWidth / window.innerHeight
                camera.updateProjectionMatrix()
            }

            function animate() {
                requestAnimationFrame(animate)
                // mesh.rotation.x += 0.0008
                mesh.rotation.y += 0.001
                renderer.render(scene, camera)
            }
        }
    }
}
