import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

interface DataRibbonProps {
  totalFreelancers: number;
  totalEarnings: number;
  avgHourlyRate: number;
  avgSuccessRate: number;
}

const DataRibbon: React.FC<DataRibbonProps> = ({
  totalFreelancers,
  totalEarnings,
  avgHourlyRate,
  avgSuccessRate,
}) => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Freelancers</Typography>
            <Typography variant="h4">{totalFreelancers}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Earnings (USD)</Typography>
            <Typography variant="h4">
              ${totalEarnings.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Average Hourly Rate</Typography>
            <Typography variant="h4">${avgHourlyRate.toFixed(2)}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Average Success Rate</Typography>
            <Typography variant="h4">{avgSuccessRate.toFixed(2)}%</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DataRibbon;
