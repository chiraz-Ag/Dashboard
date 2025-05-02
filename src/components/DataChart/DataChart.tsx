// 📄 src/components/Charts.tsx

import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Grid, Card, CardContent, Typography } from "@mui/material";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

interface ChartsProps {
  data: any[];
}

const Charts: React.FC<ChartsProps> = ({ data }) => {
  // 📌 Graphique 1 - Répartition par catégorie
  const categories = [...new Set(data.map((item) => item.Catégorie))];
  const freelancersByCategory = categories.reduce(
    (acc, category) => {
      acc[category] = data.filter((item) => item.Catégorie === category).length;
      return acc;
    },
    {} as Record<string, number>
  );

  const categoryChartData = {
    labels: Object.keys(freelancersByCategory),
    datasets: [
      {
        label: "Freelancers par Catégorie",
        data: Object.values(freelancersByCategory),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  // 📌 Graphique 2 - Répartition par plateforme
  const platforms = [...new Set(data.map((item) => item.Plateforme))];
  const freelancersByPlatform = platforms.reduce(
    (acc, platform) => {
      acc[platform] = data.filter(
        (item) => item.Plateforme === platform
      ).length;
      return acc;
    },
    {} as Record<string, number>
  );

  const platformChartData = {
    labels: Object.keys(freelancersByPlatform),
    datasets: [
      {
        label: "Freelancers par Plateforme",
        data: Object.values(freelancersByPlatform),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  return (
    <Grid container spacing={4}>
      {/* 📊 Graphique 1 */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Répartition par Catégorie</Typography>
            <Bar data={categoryChartData} />
          </CardContent>
        </Card>
      </Grid>

      {/* 🌍 Graphique 2 */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Répartition par Plateforme</Typography>
            <Pie data={platformChartData} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DataChart;
