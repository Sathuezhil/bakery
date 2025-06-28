import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

const branches = ['Jaffna', 'Colombo'];
const roles = ['Admin', 'Staff'];

export default function Signup({ onShowLogin }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    branch: '',
    role: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setError('');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirm || !form.branch || !form.role) {
      setError('All fields are required.');
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setError('Invalid email address.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    setSuccess(true);
    setError('');
    // Here you would send the signup data to your backend or localStorage
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-purple-100">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-bold text-bakery-brown">
            <User className="w-7 h-7 text-orange-600" />
            Create Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={form.name} onChange={e => handleChange('name', e.target.value)} placeholder="Your name" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={e => handleChange('email', e.target.value)} placeholder="you@email.com" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={form.password} onChange={e => handleChange('password', e.target.value)} placeholder="Password" />
            </div>
            <div>
              <Label htmlFor="confirm">Confirm Password</Label>
              <Input id="confirm" type="password" value={form.confirm} onChange={e => handleChange('confirm', e.target.value)} placeholder="Confirm password" />
            </div>
            <div>
              <Label htmlFor="branch">Branch</Label>
              <Select value={form.branch} onValueChange={v => handleChange('branch', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map(branch => (
                    <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Select value={form.role} onValueChange={v => handleChange('role', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {error && <div className="text-red-600 text-sm font-semibold">{error}</div>}
            {success && <div className="text-green-700 text-sm font-semibold">Signup successful! You can now {onShowLogin ? <button type="button" className="underline text-orange-600" onClick={onShowLogin}>login</button> : <Link to="/" className="underline text-orange-600">login</Link>}.</div>}
            <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-purple-500 text-white font-bold">Sign Up</Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-500">
            Already have an account?{' '}
            {onShowLogin ? (
              <button type="button" className="text-orange-600 underline font-semibold" onClick={onShowLogin}>Login</button>
            ) : (
              <Link to="/" className="text-orange-600 underline font-semibold">Login</Link>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
