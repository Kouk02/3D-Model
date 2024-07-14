let scene, camera, renderer, text;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    const fontLoader = new THREE.FontLoader();
    fontLoader.load('fonts/Break Brush_Regular.json', function (font) {
        const geometry = new THREE.TextGeometry('Kouk', {
            font: font,
            size: 3,
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

        const material = new THREE.MeshPhysicalMaterial({
            color: 0x000000,
            roughness: 0.2,
            metalness: 0.5,
            transparent: true,
            opacity: 0.5,
            side: THREE.DoubleSide,
            clearcoat: 0.3,
            clearcoatRoughness: 0.25
        });

        text = new THREE.Mesh(geometry, material);
        text.castShadow = true;
        scene.add(text);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
        scene.add(ambientLight);

        const leftLight = createNeonLight(-5, 0, 8, 0xffffff, 50);
        scene.add(leftLight);

        const rightLight = createNeonLight(5, 0, 8, 0xffffff, 50);
        scene.add(rightLight);

        animate();
    });
}

function createNeonLight(x, y, z, color, intensity) {
    const group = new THREE.Group();

    const coreLight = new THREE.SpotLight(color, intensity);
    coreLight.position.set(x, y, z);
    coreLight.angle = Math.PI / 4;
    coreLight.penumbra = 0.2;
    coreLight.decay = 1.5;
    coreLight.distance = 20;
    group.add(coreLight);

    const glowGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2.2, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide
    });
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    glowMesh.position.set(x, y, z);
    glowMesh.rotation.x = Math.PI / 2;
    group.add(glowMesh);

    const spreadLight = new THREE.PointLight(color, intensity * 0.25);
    spreadLight.position.set(x, y, z);
    spreadLight.distance = 5;
    group.add(spreadLight);

    return group;
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
