import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  useTheme,
  Grid,
  Avatar,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import Papa from "papaparse";
import TungstenIcon from "@mui/icons-material/Tungsten";

const CSV_FILE_PATH = "/data/freelancer_earnings_bd.csv";

const Overview = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

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
        console.error("Error loading CSV file:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCSVData();
  }, []);

  const calculateMetrics = () => {
    if (!data || data.length === 0) return {};

    const totalFreelancers = new Set(data.map((row) => row.Freelancer_ID)).size;
    const platforms = [...new Set(data.map((row) => row.Platform))];
    const jobCategories = [...new Set(data.map((row) => row.Job_Category))];

    const freelancerByCategory = jobCategories.map((category) => ({
      category,
      count: data.filter((row) => row.Job_Category === category).length,
    }));

    const freelancerByPlatform = platforms.map((platform) => ({
      platform,
      count: data.filter((row) => row.Platform === platform).length,
    }));

    const avgEarnings =
      data.reduce((sum, row) => sum + (row.Earnings || 0), 0) /
      totalFreelancers;

    return {
      totalFreelancers,
      platforms,
      jobCategories,
      freelancerByCategory,
      freelancerByPlatform,
      avgEarnings: avgEarnings.toFixed(2),
    };
  };

  const metrics = calculateMetrics();
  if (loading) return <div>Loading...</div>;

  const chartColors = [
    "#f8bbd0",
    "#ffccbc",
    "#c8e6c9",
    "#ffeb3b",
    "#90caf9",
    "#a5d6a7",
  ];

  return (
    <Box
      sx={{
        marginLeft: "240px",
        marginTop: "64px",
        padding: 4,
        backgroundColor: "#e3f2fd",
        minHeight: "100vh",
        color: theme.palette.text.primary,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          mb={4}
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              sx={{
                backgroundColor: "#f8bbd0",
                color: "#fff",
                width: 40,
                height: 40,
              }}
            >
              <TungstenIcon />
            </Avatar>
            <Typography variant="h4" fontWeight="bold" color="#2e2e2e">
              Overview
            </Typography>
          </Box>
        </Box>

        {/* KPI Cards */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={6} md={3}>
            <KpiCard
              title="Total Freelancers"
              value={metrics.totalFreelancers}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <KpiCard title="Platforms" value={metrics.platforms.length} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <KpiCard
              title="Job Categories"
              value={metrics.jobCategories.length}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <KpiCard title="Avg. Earnings ($)" value={metrics.avgEarnings} />
          </Grid>
        </Grid>

        {/* Graphiques */}
        <Grid container spacing={3} mb={3}>
          {/* BarChart */}
          <Grid item xs={12} md={8}>
            <SectionCard title="Freelancers by Job Category">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  data={metrics.freelancerByCategory}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 10, bottom: 30 }}
                >
                  <XAxis
                    type="number"
                    tick={{ fontSize: 12 }}
                    label={{
                      value: "Freelancers",
                      position: "insideBottom",
                      offset: -5,
                      style: { fontWeight: "bold" },
                    }}
                  />
                  <YAxis
                    type="category"
                    dataKey="category"
                    interval={0}
                    width={220}
                    tick={({ x, y, payload }) => {
                      const label =
                        payload.value.length > 28
                          ? payload.value.slice(0, 28) + "…"
                          : payload.value;
                      return (
                        <text
                          x={x - 10}
                          y={y + 5}
                          textAnchor="end"
                          fontSize={12}
                          fill="#333"
                        >
                          {label}
                        </text>
                      );
                    }}
                  />
                  <Tooltip />
                  <Bar dataKey="count" fill="#f8bbd0" barSize={22} />
                </BarChart>
              </ResponsiveContainer>
            </SectionCard>
          </Grid>

          {/* PieChart */}
          <Grid item xs={12} md={4}>
            <SectionCard title="Freelancers by Platform">
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={metrics.freelancerByPlatform}
                    dataKey="counter"
                    nameKey="platform"
                    cx="50%"
                    cy="50%"
                    outerRadius={80} // Réduire la taille du pie chart
                    label={({ name, percent }) => (
                      <text
                        style={{
                          fontSize: "14px",
                          fill: "#333", // Texte sombre pour contraster avec le fond blanc
                          textAnchor: "middle", // Centrer le texte dans chaque segment
                        }}
                      >
                        {`${name} (${(percent * 100).toFixed(1)}%)`}
                      </text>
                    )}
                  >
                    {metrics.freelancerByPlatform.map((_, i) => (
                      <Cell
                        key={i}
                        fill={chartColors[i % chartColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </SectionCard>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const KpiCard = ({ title, value }) => (
  <Card
    sx={{
      height: 120,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ffffff",
      boxShadow: 3,
      borderRadius: 3,
      paddingY: 2,
    }}
  >
    <CardContent sx={{ textAlign: "center", padding: "0 !important" }}>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5 }}>
        {title}
      </Typography>
      <Typography variant="h4" color="primary">
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const SectionCard = ({ title, children }) => (
  <Paper
    elevation={3}
    sx={{
      padding: 3,
      marginBottom: 3,
      backgroundColor: "#ffffff",
      borderRadius: 3,
    }}
  >
    <Typography variant="h6" fontWeight="bold" mb={2}>
      {title}
    </Typography>
    {children}
  </Paper>
);

export default Overview;
