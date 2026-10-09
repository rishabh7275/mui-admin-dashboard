import React from "react";
import { SaveRounded } from "@mui/icons-material";
import { Button, Card, CardContent, MenuItem, Stack, Switch, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Settings({ onNotice }) {
 const [email, setEmail] = useState("rishabh@example.com");
 const [alerts, setAlerts] = useState(true);
 return <Stack spacing={3}><Stack><Typography variant="h4">Settings</Typography><Typography color="text.secondary">Configure your workspace preferences.</Typography></Stack>
 <Card><CardContent sx={{p:3}}><Stack spacing={2.5} sx={{maxWidth:700}}>
   <Typography variant="h6">Profile & Preferences</Typography>
   <TextField label="Full name" defaultValue="Rishabh Tiwari" />
   <TextField label="Email" value={email} onChange={e=>setEmail(e.target.value)} />
   <TextField select label="Role" defaultValue="Administrator"><MenuItem value="Administrator">Administrator</MenuItem><MenuItem value="Editor">Editor</MenuItem></TextField>
   <Stack direction="row" justifyContent="space-between" alignItems="center"><Stack><Typography fontWeight={700}>Email notifications</Typography><Typography variant="caption" color="text.secondary">Receive alerts about orders and account activity.</Typography></Stack><Switch checked={alerts} onChange={e=>setAlerts(e.target.checked)} /></Stack>
   <Button variant="contained" startIcon={<SaveRounded/>} onClick={()=>onNotice("Settings saved successfully")} sx={{alignSelf:"flex-start"}}>Save Changes</Button>
 </Stack></CardContent></Card></Stack>;
}