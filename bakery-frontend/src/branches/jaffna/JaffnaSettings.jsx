import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Settings, 
  Shield, 
  Bell, 
  Palette,
  Database,
  Users,
  Globe,
  Save,
  RefreshCw
} from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
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
  });

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const saveSettings = () => {
    // In a real app, this would save to backend
    console.log('Saving settings:', settings);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-bakery-brown">System Settings</h1>
        <p className="text-muted-foreground">Configure system-wide settings and preferences</p>
      </div>

      {/* Settings Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch
                id="email-notifications"
                checked={settings.notifications.email}
                onCheckedChange={(checked) => handleSettingChange('notifications', 'email', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
              <Switch
                id="sms-notifications"
                checked={settings.notifications.sms}
                onCheckedChange={(checked) => handleSettingChange('notifications', 'sms', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <Switch
                id="push-notifications"
                checked={settings.notifications.push}
                onCheckedChange={(checked) => handleSettingChange('notifications', 'push', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="low-stock-alerts">Low Stock Alerts</Label>
              <Switch
                id="low-stock-alerts"
                checked={settings.notifications.lowStock}
                onCheckedChange={(checked) => handleSettingChange('notifications', 'lowStock', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="new-orders">New Order Notifications</Label>
              <Switch
                id="new-orders"
                checked={settings.notifications.newOrders}
                onCheckedChange={(checked) => handleSettingChange('notifications', 'newOrders', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="daily-reports">Daily Reports</Label>
              <Switch
                id="daily-reports"
                checked={settings.notifications.dailyReport}
                onCheckedChange={(checked) => handleSettingChange('notifications', 'dailyReport', checked)}
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
              <Label htmlFor="theme">Theme</Label>
              <Select
                value={settings.appearance.theme}
                onValueChange={(value) => handleSettingChange('appearance', 'theme', value)}
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
              <Label htmlFor="language">Language</Label>
              <Select
                value={settings.appearance.language}
                onValueChange={(value) => handleSettingChange('appearance', 'language', value)}
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
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={settings.appearance.currency}
                onValueChange={(value) => handleSettingChange('appearance', 'currency', value)}
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
              <Label htmlFor="timezone">Timezone</Label>
              <Select
                value={settings.appearance.timezone}
                onValueChange={(value) => handleSettingChange('appearance', 'timezone', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asia/Colombo">Asia/Colombo (UTC+5:30)</SelectItem>
                  <SelectItem value="UTC">UTC (UTC+0)</SelectItem>
                  <SelectItem value="America/New_York">America/New_York (UTC-5)</SelectItem>
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
              <Label htmlFor="two-factor">Two-Factor Authentication</Label>
              <Switch
                id="two-factor"
                checked={settings.security.twoFactor}
                onCheckedChange={(checked) => handleSettingChange('security', 'twoFactor', checked)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
              <Input
                id="session-timeout"
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                min="5"
                max="480"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-expiry">Password Expiry (days)</Label>
              <Input
                id="password-expiry"
                type="number"
                value={settings.security.passwordExpiry}
                onChange={(e) => handleSettingChange('security', 'passwordExpiry', parseInt(e.target.value))}
                min="30"
                max="365"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-attempts">Max Login Attempts</Label>
              <Input
                id="login-attempts"
                type="number"
                value={settings.security.loginAttempts}
                onChange={(e) => handleSettingChange('security', 'loginAttempts', parseInt(e.target.value))}
                min="3"
                max="10"
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
              <Label htmlFor="auto-backup">Auto Backup</Label>
              <Switch
                id="auto-backup"
                checked={settings.system.autoBackup}
                onCheckedChange={(checked) => handleSettingChange('system', 'autoBackup', checked)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="backup-frequency">Backup Frequency</Label>
              <Select
                value={settings.system.backupFrequency}
                onValueChange={(value) => handleSettingChange('system', 'backupFrequency', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="data-retention">Data Retention (days)</Label>
              <Input
                id="data-retention"
                type="number"
                value={settings.system.dataRetention}
                onChange={(e) => handleSettingChange('system', 'dataRetention', parseInt(e.target.value))}
                min="30"
                max="1095"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
              <Switch
                id="maintenance-mode"
                checked={settings.system.maintenanceMode}
                onCheckedChange={(checked) => handleSettingChange('system', 'maintenanceMode', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline" className="flex items-center space-x-2">
          <RefreshCw className="w-4 h-4" />
          <span>Reset to Default</span>
        </Button>
        <Button 
          className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white flex items-center space-x-2"
          onClick={saveSettings}
        >
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </Button>
      </div>

      {/* System Info */}
      <Card className="bakery-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-orange-600" />
            <span>System Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Version</p>
              <p className="text-sm">SE Bakers Admin v1.0.0</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Last Updated</p>
              <p className="text-sm">{new Date().toLocaleDateString()}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Status</p>
              <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
