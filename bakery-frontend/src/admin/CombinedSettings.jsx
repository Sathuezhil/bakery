import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Palette, Shield, Database, Gift, Edit, Trash2, Plus, Check, X } from 'lucide-react';

const defaultSettings = {
  notifications: {
    email: true,
    sms: false,
    push: true,
    lowStock: true,
    newOrders: true,
    dailyReport: false
  },
  appearance: {
    theme: 'light',
    language: 'en',
    currency: 'LKR',
    timezone: 'Asia/Colombo'
  },
  security: {
    twoFactor: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 5
  },
  system: {
    autoBackup: true,
    backupFrequency: 'daily',
    dataRetention: 365,
    maintenanceMode: false
  }
};

const branches = [
  { name: 'Jaffna', color: 'text-orange-700' },
  { name: 'Colombo', color: 'text-orange-700' }
];

const defaultPromotions = [
  { id: 1, name: 'New Year Offer', type: 'Percentage', value: 10, description: '10% off for New Year', start: '2024-01-01', end: '2024-01-10', active: true },
  { id: 2, name: 'Buy 1 Get 1', type: 'BOGO', value: null, description: 'Buy one get one free', start: '2024-02-01', end: '2024-02-07', active: false }
];

export default function CombinedSettings() {
  const [branchSettings, setBranchSettings] = useState({
    Jaffna: { ...defaultSettings },
    Colombo: { ...defaultSettings }
  });

  const [branchPromotions, setBranchPromotions] = useState({
    Jaffna: [...defaultPromotions],
    Colombo: [...defaultPromotions]
  });

  const [newPromo, setNewPromo] = useState({ name: '', type: 'Percentage', value: '', description: '', start: '', end: '', active: true });
  const [editPromo, setEditPromo] = useState({ branch: '', id: null, data: null });
  const [promoMsg, setPromoMsg] = useState('');
  const promoTimeout = useRef();
  const [addPromoBranch, setAddPromoBranch] = useState('Jaffna');

  const resetPromoMsg = () => {
    clearTimeout(promoTimeout.current);
    promoTimeout.current = setTimeout(() => setPromoMsg(''), 2000);
  };

  const validatePromo = (promo) => {
    if (!promo.name) return 'Name required';
    if (promo.type === 'Percentage' && (!promo.value || promo.value < 1 || promo.value > 100)) return 'Enter valid % (1-100)';
    if (!promo.start || !promo.end) return 'Start and End date required';
    if (new Date(promo.start) > new Date(promo.end)) return 'Start date must be before end date';
    return '';
  };

  const handleSettingChange = (branch, category, key, value) => {
    setBranchSettings(prev => ({
      ...prev,
      [branch]: {
        ...prev[branch],
        [category]: {
          ...prev[branch][category],
          [key]: value
        }
      }
    }));
  };

  const handlePromoChange = (branch, id, key, value) => {
    setBranchPromotions(prev => ({
      ...prev,
      [branch]: prev[branch].map(p => p.id === id ? { ...p, [key]: value } : p)
    }));
  };

  const handleAddPromo = (branch) => {
    const err = validatePromo(newPromo);
    if (err) { setPromoMsg(err); resetPromoMsg(); return; }
    if (branch === 'Both') {
      setBranchPromotions(prev => ({
        Jaffna: [
          ...prev.Jaffna,
          { ...newPromo, id: Date.now() + Math.random() }
        ],
        Colombo: [
          ...prev.Colombo,
          { ...newPromo, id: Date.now() + Math.random() }
        ]
      }));
    } else {
      setBranchPromotions(prev => ({
        ...prev,
        [branch]: [
          ...prev[branch],
          { ...newPromo, id: Date.now() }
        ]
      }));
    }
    setPromoMsg('Promotion added!'); resetPromoMsg();
    setNewPromo({ name: '', type: 'Percentage', value: '', description: '', start: '', end: '', active: true });
  };

  const handleDeletePromo = (branch, id) => {
    setBranchPromotions(prev => ({
      ...prev,
      [branch]: prev[branch].filter(p => p.id !== id)
    }));
    setPromoMsg('Promotion deleted!'); resetPromoMsg();
  };

  const handleEditPromo = (branch, promo) => {
    setEditPromo({ branch, id: promo.id, data: { ...promo } });
  };

  const handleEditPromoChange = (key, value) => {
    setEditPromo(edit => ({ ...edit, data: { ...edit.data, [key]: value } }));
  };

  const handleSaveEditPromo = () => {
    const err = validatePromo(editPromo.data);
    if (err) { setPromoMsg(err); resetPromoMsg(); return; }
    setBranchPromotions(prev => ({
      ...prev,
      [editPromo.branch]: prev[editPromo.branch].map(p => p.id === editPromo.id ? { ...editPromo.data } : p)
    }));
    setPromoMsg('Promotion updated!'); resetPromoMsg();
    setEditPromo({ branch: '', id: null, data: null });
  };

  const handleCancelEditPromo = () => setEditPromo({ branch: '', id: null, data: null });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-bakery-brown">Combined Settings</h1>
        <p className="text-muted-foreground">View and edit system settings for both Jaffna and Colombo branches</p>
      </div>
      <div className="mb-6">
        <Card className="bakery-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Gift className="w-5 h-5 text-orange-600" />
              <span>Add Promotion</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {promoMsg && <div className="text-sm text-green-700 font-semibold mb-2">{promoMsg}</div>}
            <form className="flex flex-col md:flex-row md:items-center gap-2" onSubmit={e => { e.preventDefault(); handleAddPromo(addPromoBranch); }}>
              <Select value={addPromoBranch} onValueChange={setAddPromoBranch}>
                <SelectTrigger className="w-32"><SelectValue placeholder="Select Branch" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Jaffna">Jaffna</SelectItem>
                  <SelectItem value="Colombo">Colombo</SelectItem>
                  <SelectItem value="Both">Both</SelectItem>
                </SelectContent>
              </Select>
              <input className="border rounded px-2 py-1 flex-1" value={newPromo.name} onChange={e => setNewPromo({ ...newPromo, name: e.target.value })} placeholder="Promotion Name" />
              <Select value={newPromo.type} onValueChange={val => setNewPromo({ ...newPromo, type: val })}>
                <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Percentage">Percentage</SelectItem>
                  <SelectItem value="BOGO">BOGO</SelectItem>
                  <SelectItem value="Flat">Flat</SelectItem>
                </SelectContent>
              </Select>
              {newPromo.type === 'Percentage' && (
                <input type="number" className="border rounded px-2 py-1 w-16" value={newPromo.value} onChange={e => setNewPromo({ ...newPromo, value: e.target.value })} placeholder="%" min="1" max="100" />
              )}
              <input className="border rounded px-2 py-1 flex-1" value={newPromo.description} onChange={e => setNewPromo({ ...newPromo, description: e.target.value })} placeholder="Description" />
              <input type="date" className="border rounded px-2 py-1" value={newPromo.start} onChange={e => setNewPromo({ ...newPromo, start: e.target.value })} />
              <input type="date" className="border rounded px-2 py-1" value={newPromo.end} onChange={e => setNewPromo({ ...newPromo, end: e.target.value })} />
              <Switch checked={newPromo.active} onCheckedChange={checked => setNewPromo({ ...newPromo, active: checked })} />
              <Button variant="outline" size="icon" type="submit"><Plus className="h-4 w-4" /></Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {branches.map((b) => (
          <div key={b.name}>
            <h2 className={`text-xl font-bold mb-2 ${b.color}`}>{b.name} Branch</h2>
            <div className="grid grid-cols-1 gap-6">
              {/* Notifications */}
              <Card className="bakery-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="w-5 h-5 text-orange-600" />
                    <span>Notifications</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`email-notifications-${b.name}`}>Email Notifications</Label>
                    <Switch
                      id={`email-notifications-${b.name}`}
                      checked={branchSettings[b.name].notifications.email}
                      onCheckedChange={(checked) => handleSettingChange(b.name, 'notifications', 'email', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`sms-notifications-${b.name}`}>SMS Notifications</Label>
                    <Switch
                      id={`sms-notifications-${b.name}`}
                      checked={branchSettings[b.name].notifications.sms}
                      onCheckedChange={(checked) => handleSettingChange(b.name, 'notifications', 'sms', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`push-notifications-${b.name}`}>Push Notifications</Label>
                    <Switch
                      id={`push-notifications-${b.name}`}
                      checked={branchSettings[b.name].notifications.push}
                      onCheckedChange={(checked) => handleSettingChange(b.name, 'notifications', 'push', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`low-stock-alerts-${b.name}`}>Low Stock Alerts</Label>
                    <Switch
                      id={`low-stock-alerts-${b.name}`}
                      checked={branchSettings[b.name].notifications.lowStock}
                      onCheckedChange={(checked) => handleSettingChange(b.name, 'notifications', 'lowStock', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`new-orders-${b.name}`}>New Order Notifications</Label>
                    <Switch
                      id={`new-orders-${b.name}`}
                      checked={branchSettings[b.name].notifications.newOrders}
                      onCheckedChange={(checked) => handleSettingChange(b.name, 'notifications', 'newOrders', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`daily-reports-${b.name}`}>Daily Reports</Label>
                    <Switch
                      id={`daily-reports-${b.name}`}
                      checked={branchSettings[b.name].notifications.dailyReport}
                      onCheckedChange={(checked) => handleSettingChange(b.name, 'notifications', 'dailyReport', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
              {/* Appearance */}
              <Card className="bakery-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="w-5 h-5 text-orange-600" />
                    <span>Appearance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`theme-${b.name}`}>Theme</Label>
                    <Select
                      value={branchSettings[b.name].appearance.theme}
                      onValueChange={(value) => handleSettingChange(b.name, 'appearance', 'theme', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="auto">Auto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`language-${b.name}`}>Language</Label>
                    <Select
                      value={branchSettings[b.name].appearance.language}
                      onValueChange={(value) => handleSettingChange(b.name, 'appearance', 'language', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="si">සිංහල</SelectItem>
                        <SelectItem value="ta">தமிழ்</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`currency-${b.name}`}>Currency</Label>
                    <Select
                      value={branchSettings[b.name].appearance.currency}
                      onValueChange={(value) => handleSettingChange(b.name, 'appearance', 'currency', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LKR">LKR (Sri Lankan Rupee)</SelectItem>
                        <SelectItem value="USD">USD (US Dollar)</SelectItem>
                        <SelectItem value="EUR">EUR (Euro)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`timezone-${b.name}`}>Timezone</Label>
                    <Select
                      value={branchSettings[b.name].appearance.timezone}
                      onValueChange={(value) => handleSettingChange(b.name, 'appearance', 'timezone', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Colombo">Asia/Colombo</SelectItem>
                        <SelectItem value="Asia/Kolkata">Asia/Kolkata</SelectItem>
                        <SelectItem value="Asia/Singapore">Asia/Singapore</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
              {/* Security */}
              <Card className="bakery-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-orange-600" />
                    <span>Security</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`two-factor-${b.name}`}>Two-Factor Authentication</Label>
                    <Switch
                      id={`two-factor-${b.name}`}
                      checked={branchSettings[b.name].security.twoFactor}
                      onCheckedChange={(checked) => handleSettingChange(b.name, 'security', 'twoFactor', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`session-timeout-${b.name}`}>Session Timeout (min)</Label>
                    <input
                      type="number"
                      className="border rounded px-2 py-1 w-20"
                      value={branchSettings[b.name].security.sessionTimeout}
                      onChange={e => handleSettingChange(b.name, 'security', 'sessionTimeout', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`password-expiry-${b.name}`}>Password Expiry (days)</Label>
                    <input
                      type="number"
                      className="border rounded px-2 py-1 w-20"
                      value={branchSettings[b.name].security.passwordExpiry}
                      onChange={e => handleSettingChange(b.name, 'security', 'passwordExpiry', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`login-attempts-${b.name}`}>Max Login Attempts</Label>
                    <input
                      type="number"
                      className="border rounded px-2 py-1 w-20"
                      value={branchSettings[b.name].security.loginAttempts}
                      onChange={e => handleSettingChange(b.name, 'security', 'loginAttempts', parseInt(e.target.value))}
                    />
                  </div>
                </CardContent>
              </Card>
              {/* System */}
              <Card className="bakery-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="w-5 h-5 text-orange-600" />
                    <span>System</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`auto-backup-${b.name}`}>Auto Backup</Label>
                    <Switch
                      id={`auto-backup-${b.name}`}
                      checked={branchSettings[b.name].system.autoBackup}
                      onCheckedChange={(checked) => handleSettingChange(b.name, 'system', 'autoBackup', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`backup-frequency-${b.name}`}>Backup Frequency</Label>
                    <Select
                      value={branchSettings[b.name].system.backupFrequency}
                      onValueChange={(value) => handleSettingChange(b.name, 'system', 'backupFrequency', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`data-retention-${b.name}`}>Data Retention (days)</Label>
                    <input
                      type="number"
                      className="border rounded px-2 py-1 w-20"
                      value={branchSettings[b.name].system.dataRetention}
                      onChange={e => handleSettingChange(b.name, 'system', 'dataRetention', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`maintenance-mode-${b.name}`}>Maintenance Mode</Label>
                    <Switch
                      id={`maintenance-mode-${b.name}`}
                      checked={branchSettings[b.name].system.maintenanceMode}
                      onCheckedChange={(checked) => handleSettingChange(b.name, 'system', 'maintenanceMode', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
              {/* Promotions */}
              <Card className="bakery-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Gift className="w-5 h-5 text-orange-600" />
                    <span>Promotions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {promoMsg && <div className="text-sm text-green-700 font-semibold mb-2">{promoMsg}</div>}
                  <div className="space-y-2">
                    {branchPromotions[b.name].map((promo) => (
                      editPromo.branch === b.name && editPromo.id === promo.id ? (
                        <div key={promo.id} className="flex flex-col md:flex-row gap-2 border rounded p-2 bg-orange-50">
                          <input className="border rounded px-2 py-1 flex-1" value={editPromo.data.name} onChange={e => handleEditPromoChange('name', e.target.value)} placeholder="Promotion Name" />
                          <Select value={editPromo.data.type} onValueChange={val => handleEditPromoChange('type', val)}>
                            <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Percentage">Percentage</SelectItem>
                              <SelectItem value="BOGO">BOGO</SelectItem>
                              <SelectItem value="Flat">Flat</SelectItem>
                            </SelectContent>
                          </Select>
                          {editPromo.data.type === 'Percentage' && (
                            <input type="number" className="border rounded px-2 py-1 w-16" value={editPromo.data.value || ''} onChange={e => handleEditPromoChange('value', e.target.value)} placeholder="%" min="1" max="100" />
                          )}
                          <input className="border rounded px-2 py-1 flex-1" value={editPromo.data.description} onChange={e => handleEditPromoChange('description', e.target.value)} placeholder="Description" />
                          <input type="date" className="border rounded px-2 py-1" value={editPromo.data.start} onChange={e => handleEditPromoChange('start', e.target.value)} />
                          <input type="date" className="border rounded px-2 py-1" value={editPromo.data.end} onChange={e => handleEditPromoChange('end', e.target.value)} />
                          <Switch checked={editPromo.data.active} onCheckedChange={checked => handleEditPromoChange('active', checked)} />
                          <Button variant="ghost" size="icon" onClick={handleSaveEditPromo}><Check className="h-4 w-4 text-green-600" /></Button>
                          <Button variant="ghost" size="icon" onClick={handleCancelEditPromo}><X className="h-4 w-4 text-red-500" /></Button>
                        </div>
                      ) : (
                        <div key={promo.id} className="flex flex-col md:flex-row gap-2 border rounded p-2 items-center bg-white">
                          <div className="flex-1">
                            <div className="font-semibold text-bakery-brown">{promo.name}</div>
                            <div className="text-xs text-gray-500">{promo.description}</div>
                            <div className="text-xs text-gray-500">{promo.type === 'Percentage' ? `${promo.value}% off` : promo.type === 'BOGO' ? 'Buy One Get One' : 'Flat Discount'} | {promo.start} to {promo.end}</div>
                          </div>
                          <Badge className={promo.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}>{promo.active ? 'Active' : 'Inactive'}</Badge>
                          <Button variant="ghost" size="icon" onClick={() => handleEditPromo(b.name, promo)}><Edit className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeletePromo(b.name, promo.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                        </div>
                      )
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
