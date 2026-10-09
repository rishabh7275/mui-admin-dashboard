import React from "react";
import { useMemo, useState } from "react";
import {
  AddRounded, DeleteOutlineRounded, EditRounded, SearchRounded
} from "@mui/icons-material";
import {
  Avatar, Box, Button, Card, CardContent, Chip, Dialog, DialogActions,
  DialogContent, DialogTitle, IconButton, InputAdornment, MenuItem,
  Pagination, Select, Stack, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TextField, Tooltip, Typography
} from "@mui/material";

const initialUsers = [
  { id: 1, name: "Rahul Sharma", email: "rahul@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Priya Singh", email: "priya@example.com", role: "Editor", status: "Active" },
  { id: 3, name: "Aman Verma", email: "aman@example.com", role: "Viewer", status: "Inactive" },
  { id: 4, name: "Neha Gupta", email: "neha@example.com", role: "Editor", status: "Active" },
  { id: 5, name: "Arjun Patel", email: "arjun@example.com", role: "Viewer", status: "Active" },
  { id: 6, name: "Kavya Joshi", email: "kavya@example.com", role: "Admin", status: "Active" },
  { id: 7, name: "Vikas Kumar", email: "vikas@example.com", role: "Viewer", status: "Inactive" },
  { id: 8, name: "Sneha Rao", email: "sneha@example.com", role: "Editor", status: "Active" },
];

export default function Users({ onNotice }) {
  const [users, setUsers] = useState(initialUsers);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("All");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", role: "Viewer", status: "Active" });

  const filtered = useMemo(() => users.filter(u =>
    `${u.name} ${u.email}`.toLowerCase().includes(query.toLowerCase()) &&
    (role === "All" || u.role === role)
  ), [users, query, role]);

  const openCreate = () => {
    setEditing(null);
    setForm({ name: "", email: "", role: "Viewer", status: "Active" });
    setOpen(true);
  };

  const openEdit = (user) => {
    setEditing(user);
    setForm(user);
    setOpen(true);
  };

  const save = () => {
    if (!form.name || !form.email) return;
    if (editing) {
      setUsers(users.map(u => u.id === editing.id ? { ...form, id: editing.id } : u));
      onNotice("User updated successfully");
    } else {
      setUsers([...users, { ...form, id: Date.now() }]);
      onNotice("User added successfully");
    }
    setOpen(false);
  };

  const remove = (id) => {
    setUsers(users.filter(u => u.id !== id));
    onNotice("User deleted");
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4">Users</Typography>
        <Typography color="text.secondary">Manage users, roles and account status.</Typography>
      </Box>

      <Card>
        <CardContent>
          <Stack direction={{ xs: "column", md: "row" }} spacing={1.5} sx={{ mb: 2.5 }}>
            <TextField
              size="small" fullWidth placeholder="Search users..."
              value={query} onChange={e => setQuery(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchRounded /></InputAdornment> }}
            />
            <Select size="small" value={role} onChange={e => setRole(e.target.value)} sx={{ minWidth: 150 }}>
              <MenuItem value="All">All roles</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Editor">Editor</MenuItem>
              <MenuItem value="Viewer">Viewer</MenuItem>
            </Select>
            <Button variant="contained" startIcon={<AddRounded />} onClick={openCreate}>Add User</Button>
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell><TableCell>Role</TableCell><TableCell>Status</TableCell><TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map(user => (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar sx={{ bgcolor: "primary.main" }}>{user.name[0]}</Avatar>
                        <Box><Typography fontWeight={750}>{user.name}</Typography><Typography variant="caption" color="text.secondary">{user.email}</Typography></Box>
                      </Stack>
                    </TableCell>
                    <TableCell><Chip label={user.role} size="small" variant="outlined" /></TableCell>
                    <TableCell><Chip label={user.status} size="small" color={user.status === "Active" ? "success" : "default"} /></TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit"><IconButton onClick={() => openEdit(user)}><EditRounded fontSize="small" /></IconButton></Tooltip>
                      <Tooltip title="Delete"><IconButton color="error" onClick={() => remove(user.id)}><DeleteOutlineRounded fontSize="small" /></IconButton></Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Stack alignItems="flex-end" sx={{ mt: 2 }}>
            <Pagination count={Math.max(1, Math.ceil(filtered.length / 5))} color="primary" />
          </Stack>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editing ? "Edit User" : "Add New User"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField label="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} fullWidth />
            <TextField label="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} fullWidth />
            <Stack direction="row" spacing={2}>
              <TextField select label="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} fullWidth>
                <MenuItem value="Admin">Admin</MenuItem><MenuItem value="Editor">Editor</MenuItem><MenuItem value="Viewer">Viewer</MenuItem>
              </TextField>
              <TextField select label="Status" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} fullWidth>
                <MenuItem value="Active">Active</MenuItem><MenuItem value="Inactive">Inactive</MenuItem>
              </TextField>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={save}>{editing ? "Save Changes" : "Create User"}</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}