import { Box, Grid } from '@mui/material';
import HostingList from '../components/hostingList';
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Layout>
      <Box className={styles.container}>
        <HostingList />
      </Box>
    </Layout>
  )
}