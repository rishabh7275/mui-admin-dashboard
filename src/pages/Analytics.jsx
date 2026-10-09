import React from "react";
import { BarChartRounded, TrendingUpRounded } from "@mui/icons-material";
import { Box, Card, CardContent, Grid, LinearProgress, Stack, Typography } from "@mui/material";

export default function Analytics() {
  const metrics = [["Revenue growth", 82],["Customer acquisition", 71],["Repeat purchases", 64],["Product conversion", 76]];
  return <Stack spacing={3}>
    <Box><Typography variant="h4">Analytics</Typography><Typography color="text.secondary">Business performance at a glance.</Typography></Box>
    <Grid container spacing={2.2}>
      <Grid size={{xs:12,md:7}}><Card sx={{height:"100%"}}><CardContent sx={{p:3}}>
        <Stack direction="row" justifyContent="space-between"><Box><Typography variant="h6">Growth Index</Typography><Typography color="text.secondary">Last 12 months</Typography></Box><TrendingUpRounded color="primary"/></Stack>
        <Box sx={{height:260,display:"flex",alignItems:"end",gap:1.5,mt:3}}>{[35,48,42,60,54,68,63,78,72,86,82,95].map((h,i)=><Box key={i} sx={{flex:1,height:`${h}%`,borderRadius:"8px 8px 2px 2px",background:"linear-gradient(180deg,#7c4dff,#00bfa6)",opacity:.35+i*.045}}/>)}</Box>
      </CardContent></Card></Grid>
      <Grid size={{xs:12,md:5}}><Card sx={{height:"100%"}}><CardContent sx={{p:3}}><Typography variant="h6">Performance</Typography><Stack spacing={2.8} sx={{mt:3}}>{metrics.map(([m,v])=><Box key={m}><Box sx={{display:"flex",justifyContent:"space-between",mb:1}}><Typography variant="body2" fontWeight={700}>{m}</Typography><Typography variant="body2">{v}%</Typography></Box><LinearProgress value={v} variant="determinate"/></Box>)}</Stack></CardContent></Card></Grid>
    </Grid>
  </Stack>;
}