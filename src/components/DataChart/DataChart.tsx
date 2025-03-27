import React from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Grid, Card, CardContent, Typography } from "@mui/material";

Chart.register(...registerables);

const Charts = ({ data }) => {
  // 📌 Graphique 1 - Distribution des Catégories de Jobs
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

  // 📌 Graphique 2 - Répartition des Plateformes
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

  return (
    <Grid container spacing={4}>
      {/* 📊 Graphique 1 */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Catégories de Jobs</Typography>
            <Bar data={jobCategoryChart} />
          </CardContent>
        </Card>
      </Grid>

      {/* 🌍 Graphique 2 */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Répartition des Plateformes</Typography>
            <Pie data={platformChart} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Charts;
