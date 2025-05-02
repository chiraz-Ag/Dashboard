import SideMenu from "@/components/SideMenu";
import scss from "./Layout.module.scss";
import { useSession } from "next-auth/react";
import React from "react";
import Head from "next/head";
import Footer from "@/components/Footer";
import { AppBar, Toolbar, Typography, Tabs, Tab, Box } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabItems = [
  { label: "Vue d’ensemble", href: "/overview" },
  { label: "Performance", href: "/performance" },
  { label: "Paiements & Revenus", href: "/revenus" },
  { label: "Fidélisation", href: "/fidelisation" },
  { label: "Marketing & impact", href: "/marketing" },
];

const Layout = (props: any) => {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <>
      <Head>
        <title>FreelanceScoop - Data Dashboard</title>
        <meta name="description" content="Data Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* AppBar + Tabs en haut */}
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: "Pacifico" }}>
            FreelanceScoop
          </Typography>
          <Tabs
            value={tabItems.findIndex((tab) => pathname.startsWith(tab.href))}
            textColor="inherit"
            indicatorColor="secondary"
          >
            {tabItems.map((tab) => (
              <Tab
                key={tab.href}
                label={tab.label}
                component={Link}
                href={tab.href}
              />
            ))}
          </Tabs>
        </Toolbar>
      </AppBar>

      {/* Layout principal avec SideMenu + contenu + Footer */}
      <main
        className={scss.layout}
        style={{ padding: session ? "80px 24px 0 80px" : "80px 24px 0 0" }}
      >
        {session && <SideMenu />}
        {props.children}
        <Footer />
      </main>
    </>
  );
};

export default Layout;
