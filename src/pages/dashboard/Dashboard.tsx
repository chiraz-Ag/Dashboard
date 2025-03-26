import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import DataRibbon from "@/components/Dashboard/DataRibbon";
import Papa from "papaparse";

const CSV_FILE_PATH = "/data/freelancer_earnings_bd.csv"; // Assure-toi que le fichier est dans `public/`

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les données du CSV
  useEffect(() => {
    const fetchCSVData = async () => {
      try {
        const response = await fetch(CSV_FILE_PATH);
        const csvText = await response.text();

        // Parser le CSV
        const parsedData = Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });

        if (parsedData.data.length > 0) {
          setData(parsedData.data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement du fichier CSV :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCSVData();
  }, []);

  // 📌 Calcul des statistiques
  const totalFreelancers = data.length;
  const totalEarnings = data.reduce(
    (sum, row) => sum + (row.Earnings_USD || 0),
    0
  );
  const avgHourlyRate = data.length > 0 ? totalEarnings / data.length : 0;
  const avgSuccessRate =
    data.length > 0
      ? data.reduce((sum, row) => sum + (row.Job_Success_Rate || 0), 0) /
        data.length
      : 0;

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>
        Freelancer Dashboard
      </Typography>

      {/* 📌 Affichage des cartes de statistiques */}
      <DataRibbon
        totalFreelancers={totalFreelancers}
        totalEarnings={totalEarnings}
        avgHourlyRate={avgHourlyRate}
        avgSuccessRate={avgSuccessRate}
      />

      {/* 📌 Section pour ajouter des graphiques plus tard */}
      <Grid container spacing={4} sx={{ marginTop: 4 }}>
        <Grid item xs={12} md={6}>
          {/* Ajouter le graphique de distribution des catégories ici */}
        </Grid>
        <Grid item xs={12} md={6}>
          {/* Ajouter le graphique de répartition des plateformes ici */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
