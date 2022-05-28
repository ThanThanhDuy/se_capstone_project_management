import React from 'react'
// import { Box } from '@mui/material'
import './style.css'
// import { makeStyles } from '@mui/styles'
// import Header from '../common/header'
import Sidebar from '../common/sidebar/sidebar'
// import CapstoneTeam from '../../pages/capstone_team/capstone_team'

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'grid',
//     gridTemplateRows: 'auto 1fr',
//     gridTemplateColumns: '270px 1fr',
//     gridTemplateAreas: `"header header" "sidebar main"`,
//     minHeight: '100vh'
//   },
//   header: {
//     gridArea: 'header'
//   },
//   sidebar: {
//     gridArea: 'sidebar',
//     borderRight: `1px solid rgb(0 0 0 / 12%)`
//   },
//   main: {
//     gridArea: 'main',
//     padding: '20px'
//   }
// }))
const AdminLayout = () => {
  // const classes = useStyles()
  return (
    <>
      {/* <Box className={classes.root}>
      <Box className={classes.header}>
        <Header></Header>
      </Box>
      <Box className={classes.sidebar}>
        <Sidebar />
      </Box>
      <Box className={classes.main}>
        <CapstoneTeam />
      </Box>
    </Box> */}
      <Sidebar />
    </>
  )
}

export default AdminLayout
