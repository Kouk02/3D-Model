let scene, camera, renderer, text;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    const fontLoader = new THREE.FontLoader();
    fontLoader.load('fonts/Break Brush_Regular.json', function (font) {
        const geometry = new THREE.TextGeometry('Kouk', {
            font: font,
            size: 4,
            height: 0.4,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.06,
            bevelSize: 0.04,
            bevelOffset: 0,
            bevelSegments: 5
        });

        geometry.computeBoundingBox();
        geometry.center();

        const material = new THREE.MeshStandardMaterial({
            color: 0x000000,
            roughness: 0.2, 
            metalness: 0.5, 
            transparent: true,
            opacity: 0.5, 
            side: THREE.FrontSide 
        });

        text = new THREE.Mesh(geometry, material);
        text.castShadow = true;
        scene.add(text);

        const ambientLight = new THREE.AmbientLight(0xffffff, 700); 
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 700); 
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        animate();
    });
}

function animate() {
    requestAnimationFrame(animate);
    if (text) {
        text.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
}

init();

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
