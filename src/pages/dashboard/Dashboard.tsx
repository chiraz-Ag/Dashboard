import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Card, CardContent } from "@mui/material";
import { Bar, Pie, Scatter } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import DataRibbon from "@/components/Dashboard/DataRibbon";
import Papa from "papaparse";

Chart.register(...registerables);

const CSV_FILE_PATH = "/data/freelancer_earnings_bd.csv";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCSVData = async () => {
      try {
        const response = await fetch(CSV_FILE_PATH);
        const csvText = await response.text();
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

  // 📊 Graphiques
  const jobCategories = data.reduce((acc, curr) => {
    acc[curr.job_category] = (acc[curr.job_category] || 0) + 1;
    return acc;
  }, {});

  const jobCategoryChart = {
    labels: Object.keys(jobCategories),
    datasets: [
      {
        label: "Nombre de Jobs",
        data: Object.values(jobCategories),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  const platformCounts = data.reduce((acc, curr) => {
    acc[curr.platform] = (acc[curr.platform] || 0) + 1;
    return acc;
  }, {});

  const platformChart = {
    labels: Object.keys(platformCounts),
    datasets: [
      {
        label: "Freelancers par Plateforme",
        data: Object.values(platformCounts),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const experienceSuccessChart = {
    labels: ["Junior", "Intermédiaire", "Senior"],
    datasets: [
      {
        label: "Taux de Réussite",
        data: [80, 85, 92],
        backgroundColor: "rgba(54,162,235,0.6)",
      },
    ],
  };

  const revenueByCategory = {
    labels: Object.keys(jobCategories),
    datasets: [
      {
        label: "Revenus",
        data: Object.keys(jobCategories).map(() => Math.random() * 10000),
        backgroundColor: "rgba(255,99,132,0.6)",
      },
    ],
  };

  const clientRegionChart = {
    labels: ["USA", "Europe", "Asie", "Afrique"],
    datasets: [
      {
        label: "Clients",
        data: [40, 30, 20, 10],
        backgroundColor: ["#4BC0C0", "#FF9F40", "#9966FF", "#FF6384"],
      },
    ],
  };

  const paymentMethodsChart = {
    labels: ["PayPal", "Virement", "Carte Bancaire"],
    datasets: [
      {
        label: "Méthodes de Paiement",
        data: [60, 30, 10],
        backgroundColor: ["#FFCE56", "#FF6384", "#36A2EB"],
      },
    ],
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>
        Freelancer Dashboard
      </Typography>

      <DataRibbon
        totalFreelancers={totalFreelancers}
        totalEarnings={totalEarnings}
        avgHourlyRate={avgHourlyRate}
        avgSuccessRate={avgSuccessRate}
      />

      <Grid container spacing={4} sx={{ marginTop: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Répartition des Plateformes</Typography>
              <Pie data={platformChart} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Taux de Réussite par Expérience
              </Typography>
              <Bar data={experienceSuccessChart} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Revenus par Catégorie</Typography>
              <Bar data={revenueByCategory} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Répartition des Clients par Région
              </Typography>
              <Pie data={clientRegionChart} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Méthodes de Paiement</Typography>
              <Pie data={paymentMethodsChart} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
