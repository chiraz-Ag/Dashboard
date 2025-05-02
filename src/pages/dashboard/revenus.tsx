import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Typography, Box, Paper, useTheme } from "@mui/material";
import Papa from "papaparse"; // Ajout de l'import ici

const CSV_FILE_PATH = "/data/freelancer_earnings_bd.csv"; // Assure-toi que le fichier est dans `public/`

const Revenus = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  // Charger le CSV
  useEffect(() => {
    const fetchCSVData = async () => {
      try {
        const response = await fetch(CSV_FILE_PATH);
        if (!response.ok) {
          throw new Error("Erreur lors du chargement du fichier CSV");
        }
        const csvText = await response.text();

        // Parser les données CSV
        const parsedData = Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });

        if (parsedData.data.length > 0) {
          setData(parsedData.data);
        } else {
          console.error("Le fichier CSV est vide ou mal formaté.");
        }
      } catch (error) {
        console.error("Erreur lors du chargement du fichier CSV :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCSVData();
  }, []);

  // Calculer les métriques
  const calculateMetrics = () => {
    if (!data || data.length === 0) return {};

    // Revenu moyen global
    const totalEarnings =
      data.reduce((sum, row) => sum + (row.Earnings_USD || 0), 0) / data.length;

    // Taux horaire moyen
    const averageHourlyRate =
      data.reduce((sum, row) => sum + (row.Hourly_Rate || 0), 0) / data.length;

    // Revenu moyen par catégorie
    const categories = [...new Set(data.map((row) => row.Job_Category))];
    const averageEarningsByCategory = categories.map((category) => ({
      category,
      earnings:
        data
          .filter((row) => row.Job_Category === category)
          .reduce((sum, row) => sum + (row.Earnings_USD || 0), 0) /
        data.filter((row) => row.Job_Category === category).length,
    }));

    // Méthodes de paiement les plus utilisées
    const paymentMethods = [...new Set(data.map((row) => row.Payment_Method))];
    const paymentMethodUsage = paymentMethods.map((method) => ({
      method,
      count: data.filter((row) => row.Payment_Method === method).length,
    }));

    // Corrélation entre taux horaire et revenu total
    const hourlyRateVsEarnings = data.map((row) => ({
      hourlyRate: row.Hourly_Rate || 0,
      earnings: row.Earnings_USD || 0,
    }));

    return {
      totalEarnings,
      averageHourlyRate,
      averageEarningsByCategory,
      paymentMethodUsage,
      hourlyRateVsEarnings,
    };
  };

  const metrics = calculateMetrics();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Vérification des données
  if (!metrics.totalEarnings || !metrics.averageHourlyRate) {
    return <div>Les données ne sont pas disponibles ou sont incomplètes.</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        padding: 2,
        marginLeft: "240px", // Espace pour le SideMenu
        marginTop: "64px", // Espace pour l'AppBar
      }}
    >
      {/* Section des KPIs */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Paper
          elevation={1}
          sx={{
            padding: 2,
            width: 200,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Typography variant="h6">Revenu moyen global</Typography>
          <Typography variant="h4">
            ${metrics.totalEarnings.toFixed(2)}
          </Typography>
        </Paper>
        <Paper
          elevation={1}
          sx={{
            padding: 2,
            width: 200,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Typography variant="h6">Revenu horaire moyen</Typography>
          <Typography variant="h4">
            ${metrics.averageHourlyRate.toFixed(2)}
          </Typography>
        </Paper>
      </Box>

      {/* Graphique : Revenu moyen par catégorie */}
      <Paper
        elevation={1}
        sx={{
          padding: 2,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Revenu moyen par catégorie
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={metrics.averageEarningsByCategory}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="category" stroke={theme.palette.text.secondary} />
            <YAxis stroke={theme.palette.text.secondary} />
            <Tooltip
              contentStyle={{ backgroundColor: theme.palette.background.paper }}
            />
            <Legend />
            <Bar dataKey="earnings" fill="#0088FE" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      {/* Graphique : Méthodes de paiement les plus utilisées */}
      <Paper
        elevation={1}
        sx={{
          padding: 2,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Méthodes de paiement les plus utilisées
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={metrics.paymentMethodUsage}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="method" stroke={theme.palette.text.secondary} />
            <YAxis stroke={theme.palette.text.secondary} />
            <Tooltip
              contentStyle={{ backgroundColor: theme.palette.background.paper }}
            />
            <Legend />
            <Bar dataKey="count" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      {/* Graphique : Corrélation entre taux horaire et revenu total */}
      <Paper
        elevation={1}
        sx={{
          padding: 2,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Corrélation entre taux horaire et revenu total
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={metrics.hourlyRateVsEarnings}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="hourlyRate" stroke={theme.palette.text.secondary} />
            <YAxis stroke={theme.palette.text.secondary} />
            <Tooltip
              contentStyle={{ backgroundColor: theme.palette.background.paper }}
            />
            <Legend />
            <Bar dataKey="earnings" fill="#FFBB28" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default Revenus;
