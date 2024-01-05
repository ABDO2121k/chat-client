/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Berk Gedik (https://sketchfab.com/berkgedik)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/cube-robot-animated-30a8e15725cf4feb9a3c8423f89d7df8
Title: Cube Robot - Animated
*/

import  { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import scene from '../assets/cube_robot_-_animated.glb'
const Robot=(props)=> {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(scene);
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    Object.values(actions).forEach((action) => action.play());
  }, [actions]);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.0020021}
        >
          <group name="CubeRudefbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="Armature"
                  position={[0, -37.0152473, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <group name="Object_5">
                    <primitive object={nodes._rootJoint} />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

export default Robot;
