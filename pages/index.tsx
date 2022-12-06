import { Box, Grid } from '@mui/material';
import HostingList from '../components/hostingItem/hostingList';
import Layout from '../components/layout'
import Nav from '../components/nav';
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Layout>
      {/* <Nav /> 기능 추가중*/}
      <Box className={styles.container}>
        <HostingList />
      </Box>
    </Layout>
  )
}