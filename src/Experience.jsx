import { useMatcapTexture, Center, OrbitControls, Text3D } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)
const material = new THREE.MeshMatcapMaterial()

export default function Experience() {
  const [matcapTexture] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256)
  const donutsRef = useRef([])

  useEffect(() => {
    matcapTexture.colorSpace = THREE.SRGBColorSpace
    matcapTexture.needsUpdate = true
    material.matcap = matcapTexture
    material.needsUpdate = true
  }, [])

  useFrame((_, delta) => {
    donutsRef.current.forEach(donut => (donut.rotation.y += delta * 0.15))
  })

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <Center>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          material={material}
        >
          Wills Websites
        </Text3D>
      </Center>

      {[...Array(100)].map((_, i) => (
        <mesh
          key={i}
          ref={element => (donutsRef.current[i] = element)}
          geometry={torusGeometry}
          material={material}
          position={[(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10]}
          scale={0.2 + Math.random() * 0.2}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        />
      ))}
    </>
  )
}
