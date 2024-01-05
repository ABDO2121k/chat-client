import {Box, useMediaQuery} from '@mui/material'
import Typer from '../components/typeAnimation/Typer'
import { useTheme } from '@emotion/react'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Robot3 from '../models/Robot3'

// and5lo react type animation bax ndiro des animation l home page dialna

const Home = () => {
  const theme=useTheme()
  const isBeloMd=useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Box width={'100%'} height={'100%'} flex={'flex'} mx={'auto'} mt={3}>
      <Box sx={{display:'flex',width:'100%',flexDirection:'column',alignItems:'center'}}>
        <Box>
          <Typer/>
        </Box>
        <Box  width={'100%'} height={'100%'} display={'flex'} flexDirection={{md:'row',sm:'column',xs:'column'}} gap={5} mx={'auto'}>
            {/* ROBOT 3D */}
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
          style={{width:'10%',margin:'auto'}}
        >
          <directionalLight intensity={2.5} position={[0, 0, 1]} />
          <ambientLight intensity={0.5} />
          {/* //suspense kat5lina nbiyno l 3d bxakl mzn */}
          <Suspense fallback={'Loading ....'}>
            <Robot3
              position={[0.5, -4, 0]}
              rotation={[12.6, -0.1, 0]}
              scale={[8,8, 8]}
            />
          </Suspense>
        </Canvas>
          <img src="openai.png" className='image-reverse rotate' alt="openai" style={{width:'150px',margin:'auto'}}/>
        </Box>
        <Box sx={{display:'flex',width:'100%',mx:'auto'}}>
          <img src="home.png" alt="chat" style={{display:'flex',margin:'auto',width:isBeloMd?'80%':'60%',borderRadius:'20px',boxShadow:'-5px -5px 20px #64f3d5',marginTop:'20px',marginBottom:'20px'}} />
        </Box>
      </Box>
    </Box>
  )
}

export default Home