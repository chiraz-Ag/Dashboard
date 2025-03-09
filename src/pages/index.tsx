import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Dashboard from './dashboard'
import Header from 'C:/Users/ASUS VIVOBOOK X413J/data-dashboard/src/components/Header'
import SideMenu from 'C:/Users/ASUS VIVOBOOK X413J/data-dashboard/src/components/SideMenu'
import Login from '@/components/login'




export default function Home() {
  return (
    <>
      <Head>
        <title>Data Dasboard</title>
        <meta name="description" content="Data Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
            <Header/>
            <SideMenu/>
            <Dashboard/>
            <Login/>
            
          
      </main>
    </>
  )
}
