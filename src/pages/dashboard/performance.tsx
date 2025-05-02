import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { Typography, Box, Paper, useTheme } from "@mui/material";
import Papa from "papaparse";

const CSV_FILE_PATH = "/data/freelancer_earnings_bd.csv";

const Performance = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchCSVData = async () => {
      try {
        const response = await fetch(CSV_FILE_PATH);
        if (!response.ok) {
          throw new Error("Erreur lors du chargement du fichier CSV");
        }
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

  const calculatePerformanceScore = (row) => {
    if (
      !row["Success Rate"] ||
      !row["Client Rating"] ||
      !row["Rehire Rate"] ||
      !row["Earnings (USD)"]
    )
      return null;

    const successRateWeight = 0.4;
    const clientRatingWeight = 0.3;
    const rehireRateWeight = 0.2;
    const earningsWeight = 0.1;

    const normalizedSuccessRate = row["Success Rate"] / 100;
    const normalizedClientRating = row["Client Rating"] / 5;
    const normalizedRehireRate = row["Rehire Rate"] / 100;
    const maxEarnings = Math.max(...data.map((r) => r["Earnings (USD)"]));
    const normalizedEarnings = row["Earnings (USD)"] / maxEarnings;

    return (
      (normalizedSuccessRate * successRateWeight +
        normalizedClientRating * clientRatingWeight +
        normalizedRehireRate * rehireRateWeight +
        normalizedEarnings * earningsWeight) *
      100
    );
  };

  const dataWithPerformanceScore = data.map((row) => ({
    ...row,
    Performance_Score: calculatePerformanceScore(row),
  }));

  const calculateMetrics = () => {
    const validData = dataWithPerformanceScore.filter(
      (row) => typeof row.Performance_Score === "number"
    );
    const averagePerformanceScore =
      validData.length > 0
        ? validData.reduce((sum, row) => sum + row.Performance_Score, 0) /
          validData.length
        : 0;
    return { averagePerformanceScore };
  };

  const projectDurationByType = () => {
    const types = {};
    data.forEach((row) => {
      const type = row["Project Type"];
      if (!type || !row["Project Duration (Days)"]) return;
      if (!types[type]) types[type] = { total: 0, count: 0 };
      types[type].total += row["Project Duration (Days)"];
      types[type].count += 1;
    });
    return Object.entries(types).map(([type, val]) => ({
      name: type,
      value: val.total / val.count,
    }));
  };

  const successRateByExperience = () => {
    const levels = {};
    data.forEach((row) => {
      const level = row["Experience Level"];
      if (!level || !row["Success Rate"]) return;
      if (!levels[level]) levels[level] = { total: 0, count: 0 };
      levels[level].total += row["Success Rate"];
      levels[level].count += 1;
    });
    return Object.entries(levels).map(([level, val]) => ({
      name: level,
      value: val.total / val.count,
    }));
  };

  const metrics = calculateMetrics();

  if (loading) return <div>Loading...</div>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        padding: 2,
        marginLeft: "240px",
        marginTop: "64px",
      }}
    >
      {/* KPI Score */}
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
            width: 200,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[1],
            p: 2,
          }}
        >
          <Typography variant="h6">Average Performance Score</Typography>
          <Typography variant="h4">
            {isNaN(metrics.averagePerformanceScore)
              ? "N/A"
              : metrics.averagePerformanceScore.toFixed(2)}
          </Typography>
        </Paper>
      </Box>

      {/* Graphiques */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {/* PieChart */}
        <Paper sx={{ width: 400, height: 300, p: 2 }}>
          <Typography variant="h6">Durée moyenne par type</Typography>
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie
                data={projectDurationByType()}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill={theme.palette.primary.main}
                label
              >
                {projectDurationByType().map((_, i) => (
                  <Cell key={`cell-${i}`} fill={theme.palette.secondary.main} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Paper>

        {/* LineChart */}
        <Paper sx={{ width: 400, height: 300, p: 2 }}>
          <Typography variant="h6">Taux de réussite par expérience</Typography>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={successRateByExperience()}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke={theme.palette.primary.main}
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default Performance;
