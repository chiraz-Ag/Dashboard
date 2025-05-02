import React, { useEffect, useState, useMemo } from "react";
import { Box, Typography, Avatar, Grid, Paper, useTheme } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Papa from "papaparse";
import PublicIcon from "@mui/icons-material/Public";

const CSV_FILE_PATH = "/data/freelancer_earnings_bd.csv";

const REGIONS = [
  "USA",
  "Canada",
  "Europe",
  "Asia",
  "Australia",
  "Middle East",
  "UK",
];

const MAP_COLORS = ["#f3e5f5", "#ce93d8", "#ab47bc", "#6a1b9a"];

const Loyalty = () => {
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
        setData(parsedData.data);
      } catch (error) {
        console.error("Error loading CSV file:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCSVData();
  }, []);

  const regionRatings = useMemo(() => {
    const regionMap = {};
    data.forEach((row) => {
      const region = row.Client_Region;
      if (!regionMap[region]) regionMap[region] = { sum: 0, count: 0 };
      const rating = Number(row.Client_Rating);
      if (rating > 0) {
        regionMap[region].sum += rating;
        regionMap[region].count += 1;
      }
    });
    return REGIONS.map((region) => {
      const entry = regionMap[region];
      return {
        region,
        avgRating: entry && entry.count > 0 ? entry.sum / entry.count : 0,
      };
    });
  }, [data]);

  const minRating = Math.min(...regionRatings.map((r) => r.avgRating));
  const maxRating = Math.max(...regionRatings.map((r) => r.avgRating));
  const getRegionColor = (rating) => {
    if (!rating) return MAP_COLORS[0];
    const idx = Math.floor(
      ((rating - minRating) / (maxRating - minRating + 0.0001)) *
        (MAP_COLORS.length - 1)
    );
    return MAP_COLORS[idx];
  };

  const rehireByCategory = useMemo(() => {
    const catMap = {};
    data.forEach((row) => {
      const cat = row.Job_Category;
      if (!catMap[cat]) catMap[cat] = { sum: 0, count: 0 };
      const rehire = Number(row.Rehire_Rate);
      if (rehire > 0) {
        catMap[cat].sum += rehire;
        catMap[cat].count += 1;
      }
    });
    return Object.entries(catMap).map(([cat, { sum, count }]) => ({
      category: cat,
      avgRehire: count ? sum / count : 0,
    }));
  }, [data]);

  if (loading) return <div>Loading...</div>;

  return (
    <Box
      sx={{
        marginLeft: "240px",
        marginTop: "64px",
        padding: 4,
        backgroundColor: "#e0fcfc",
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
        <Box display="flex" alignItems="center" gap={2} mb={4}>
          <Avatar
            sx={{
              backgroundColor: "#f8bbd0",
              color: "#fff",
              width: 40,
              height: 40,
            }}
          >
            <PublicIcon />
          </Avatar>
          <Typography variant="h4" fontWeight="bold" color="#2e2e2e">
            Fidélisation / Relation client
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Carte des régions */}
          <Grid item xs={12} md={6}>
            <SectionCard title="Note moyenne des clients par région">
              <Box
                sx={{
                  width: "100%",
                  height: 350,
                  background: "#f8fafd",
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <Box sx={{ width: "90%", height: 250, position: "relative" }}>
                  {regionRatings.map((r, i) => (
                    <Box
                      key={r.region}
                      sx={{
                        position: "absolute",
                        left: `${10 + i * 13}%`,
                        top: `${30 + (i % 2) * 40}px`,
                        width: 90,
                        height: 60,
                        background: getRegionColor(r.avgRating),
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: 2,
                        border: "2px solid #fff",
                        zIndex: 1,
                      }}
                    >
                      <Typography fontWeight="bold" color="#222" fontSize={16}>
                        {r.region}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Box display="flex" alignItems="center" gap={1} mt={2}>
                  {MAP_COLORS.map((color, i) => (
                    <Box
                      key={i}
                      sx={{
                        width: 30,
                        height: 12,
                        background: color,
                        borderRadius: 1,
                      }}
                    />
                  ))}
                  <Typography fontSize={12} color="#555" ml={1}>
                    Min: {minRating.toFixed(2)} Max: {maxRating.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </SectionCard>
          </Grid>

          {/* Histogramme Rehire Rate */}
          <Grid item xs={12} md={6}>
            <SectionCard title="Rehire Rate moyen par catégorie">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={rehireByCategory}>
                  <XAxis
                    dataKey="category"
                    tick={{ fontSize: 12 }}
                    interval={0}
                    angle={-20}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    label={{
                      value: "Rehire Rate (Moyenne)",
                      angle: -90,
                      position: "insideLeft",
                      style: { fontWeight: "bold" },
                    }}
                  />
                  <Tooltip formatter={(value) => value.toFixed(2)} />
                  <Bar dataKey="avgRehire" fill="#7c4dff" barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </SectionCard>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

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

export default Loyalty;
