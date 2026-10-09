import React from "react";
import { Box, Card, CardContent, Chip, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

const txns = [
 ["TXN-9042","Rahul Sharma","₹24,500","UPI","Completed"],
 ["TXN-9041","Priya Singh","₹12,900","Card","Completed"],
 ["TXN-9040","Aman Verma","₹5,400","Net Banking","Pending"],
 ["TXN-9039","Neha Gupta","₹31,200","Card","Completed"],
 ["TXN-9038","Arjun Patel","₹8,750","UPI","Failed"],
];
export default function Transactions() {
 return <Stack spacing={3}><Box><Typography variant="h4">Transactions</Typography><Typography color="text.secondary">All incoming payment activity.</Typography></Box>
 <Card><CardContent><TableContainer><Table><TableHead><TableRow><TableCell>ID</TableCell><TableCell>Customer</TableCell><TableCell>Amount</TableCell><TableCell>Method</TableCell><TableCell>Status</TableCell></TableRow></TableHead>
 <TableBody>{txns.map(t=><TableRow hover key={t[0]}>{t.map((v,i)=><TableCell key={i}>{i===4?<Chip label={v} size="small" color={v==="Completed"?"success":v==="Failed"?"error":"warning"}/>:v}</TableCell>)}</TableRow>)}</TableBody>
 </Table></TableContainer></CardContent></Card></Stack>;
}