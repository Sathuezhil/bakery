 'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Plus,
  Eye, 
  Phone, 
  Mail, 
  Calendar,
  Clock,
  ChefHat,
  User,
  Users,
  Briefcase
} from 'lucide-react';

const positions = ['Baker', 'Pastry Chef', 'Decorator', 'Sales Associate', 'Manager', 'Assistant'];
const departments = ['Kitchen', 'Front of House', 'Management', 'Decoration'];

const initialStaff = [
  {
    id: 1,
    name: 'Sathuryan Ezhil',
    email: 'ezhil@sweetdreams.com',
    phone: '+94 77 123 4567',
    position: 'Manager',
    department: 'Management',
    hireDate: '2022-03-15',
    salary: 55000,
    status: 'active',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100',
    skills: ['Leadership', 'Customer Service', 'Inventory Management'],
    schedule: 'Monday - Friday, 8:00 AM - 6:00 PM',
    emergencyContact: 'Sathuryan - +94 77 987 6543'
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    email: 'marcus.rodriguez@sweetdreams.com',
    phone: '+94 76 234 5678',
    position: 'Pastry Chef',
    department: 'Kitchen',
    hireDate: '2021-07-22',
    salary: 48000,
    status: 'active',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100',
    skills: ['French Pastries', 'Cake Design', 'Recipe Development'],
    schedule: 'Tuesday - Saturday, 5:00 AM - 2:00 PM',
    emergencyContact: 'Maria Rodriguez - +94 76 876 5432'
  },
  {
    id: 3,
    name: 'Emma Chen',
    email: 'emma.chen@sweetdreams.com',
    phone: '+94 71 345 6789',
    position: 'Baker',
    department: 'Kitchen',
    hireDate: '2023-01-10',
    salary: 42000,
    status: 'active',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100',
    skills: ['Bread Making', 'Sourdough', 'Early Morning Prep'],
    schedule: 'Monday - Friday, 4:00 AM - 1:00 PM',
    emergencyContact: 'David Chen - +94 71 765 4321'
  },
  {
    id: 4,
    name: 'Alex Thompson',
    email: 'alex.thompson@sweetdreams.com',
    phone: '+94 72 456 7890',
    position: 'Sales Associate',
    department: 'Front of House',
    hireDate: '2023-06-05',
    salary: 32000,
    status: 'active',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100',
    skills: ['Customer Service', 'POS Systems', 'Product Knowledge'],
    schedule: 'Wednesday - Sunday, 7:00 AM - 4:00 PM',
    emergencyContact: 'Lisa Thompson - +94 72 654 3210'
  },
  {
    id: 5,
    name: 'Isabella Martinez',
    email: 'isabella.martinez@sweetdreams.com',
    phone: '+94 75 567 8901',
    position: 'Decorator',
    department: 'Decoration',
    hireDate: '2022-11-18',
    salary: 38000,
    status: 'active',
    avatar: 'https://images.pexels.com/photos/1130624/pexels-photo-1130624.jpeg?auto=compress&cs=tinysrgb&w=100',
    skills: ['Cake Decorating', 'Fondant Work', 'Artistic Design'],
    schedule: 'Monday - Friday, 9:00 AM - 6:00 PM',
    emergencyContact: 'Carlos Martinez - +94 75 543 2109'
  },
  {
    id: 6,
    name: 'James Wilson',
    email: 'james.wilson@sweetdreams.com',
    phone: '+94 78 678 9012',
    position: 'Assistant',
    department: 'Kitchen',
    hireDate: '2023-09-12',
    salary: 28000,
    status: 'probation',
    avatar: 'https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg?auto=compress&cs=tinysrgb&w=100',
    skills: ['Food Prep', 'Cleaning', 'Basic Baking'],
    schedule: 'Monday - Friday, 6:00 AM - 3:00 PM',
    emergencyContact: 'Mary Wilson - +94 78 432 1098'
  }
];

export default function JaffnaStaff() {
  const [staff, setStaff] = useState(initialStaff);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    salary: '',
    schedule: '',
    emergencyContact: ''
  });

  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || member.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'probation': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'inactive': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPositionIcon = (position) => {
    switch (position.toLowerCase()) {
      case 'manager': return <Briefcase className="w-4 h-4" />;
      case 'baker': case 'pastry chef': return <ChefHat className="w-4 h-4" />;
      case 'decorator': return <User className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(salary);
  };

  const getStaffStats = () => {
    const stats = {
      total: staff.length,
      active: staff.filter(s => s.status === 'active').length,
      probation: staff.filter(s => s.status === 'probation').length,
      kitchen: staff.filter(s => s.department === 'Kitchen').length,
      frontOfHouse: staff.filter(s => s.department === 'Front of House').length,
      totalPayroll: staff.reduce((sum, s) => sum + s.salary, 0)
    };
    return stats;
  };

  const stats = getStaffStats();

  const handleAddStaff = () => {
    const staffToAdd = {
      id: Date.now(),
      ...newStaff,
      salary: parseInt(newStaff.salary),
      hireDate: new Date().toISOString().split('T')[0],
      status: 'probation',
      avatar: '',
      skills: []
    };
    
    setStaff([...staff, staffToAdd]);
    setNewStaff({
      name: '',
      email: '',
      phone: '',
      position: '',
      department: '',
      salary: '',
      schedule: '',
      emergencyContact: ''
    });
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-bakery-brown">Staff</h1>
          <p className="text-muted-foreground">Manage your SE Bakers team members</p>
        </div>
        
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Add Staff Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
              <DialogDescription>
                Add a new team member to your bakery staff
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newStaff.name}
                    onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newStaff.email}
                    onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                    placeholder="Enter email address"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newStaff.phone}
                    onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})}
                    placeholder="+94 77 123 4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Annual Salary (LKR)</Label>
                  <Input
                    id="salary"
                    type="number"
                    value={newStaff.salary}
                    onChange={(e) => setNewStaff({...newStaff, salary: e.target.value})}
                    placeholder="50000"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Select value={newStaff.position} onValueChange={(value) => setNewStaff({...newStaff, position: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map(position => (
                        <SelectItem key={position} value={position}>{position}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select value={newStaff.department} onValueChange={(value) => setNewStaff({...newStaff, department: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(department => (
                        <SelectItem key={department} value={department}>{department}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="schedule">Schedule</Label>
                <Input
                  id="schedule"
                  value={newStaff.schedule}
                  onChange={(e) => setNewStaff({...newStaff, schedule: e.target.value})}
                  placeholder="Monday - Friday, 9:00 AM - 5:00 PM"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  value={newStaff.emergencyContact}
                  onChange={(e) => setNewStaff({...newStaff, emergencyContact: e.target.value})}
                  placeholder="Name - Phone Number"
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleAddStaff}
                  className="bg-gradient-to-r from-orange-400 to-amber-500"
                >
                  Add Staff Member
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="bakery-card">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <p className="text-sm text-muted-foreground">Total Staff</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bakery-card">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
              <p className="text-sm text-muted-foreground">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bakery-card">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.probation}</div>
              <p className="text-sm text-muted-foreground">Probation</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bakery-card">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.kitchen}</div>
              <p className="text-sm text-muted-foreground">Kitchen</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bakery-card">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.frontOfHouse}</div>
              <p className="text-sm text-muted-foreground">Front House</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bakery-card">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{formatSalary(stats.totalPayroll)}</div>
              <p className="text-sm text-muted-foreground">Total Payroll</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bakery-card">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-orange-400" />
              <Input
                placeholder="Search staff members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(department => (
                  <SelectItem key={department} value={department}>{department}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((member) => (
          <Card key={member.id} className="bakery-card hover-lift">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Staff Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-gradient-to-br from-orange-400 to-amber-500 text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-bakery-brown">{member.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        {getPositionIcon(member.position)}
                        {member.position}
                      </div>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(member.status)} capitalize`}>
                    {member.status}
                  </Badge>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Hired: {formatDate(member.hireDate)}</span>
                  </div>
                </div>

                {/* Department & Salary */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-orange-100">
                  <div>
                    <p className="text-xs text-muted-foreground">Department</p>
                    <p className="font-medium text-sm">{member.department}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Salary</p>
                    <p className="font-medium text-sm text-green-600">{formatSalary(member.salary)}</p>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <p className="text-sm font-medium text-bakery-brown mb-2">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {member.skills.slice(0, 2).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {member.skills.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{member.skills.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Schedule */}
                <div className="bg-orange-50/50 p-3 rounded-lg border border-orange-100">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span className="text-orange-800">{member.schedule}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => setSelectedStaff(member)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Staff Details - {selectedStaff?.name}</DialogTitle>
                        <DialogDescription>
                          Complete staff member profile and information
                        </DialogDescription>
                      </DialogHeader>
                      {selectedStaff && (
                        <div className="space-y-6">
                          {/* Staff Profile */}
                          <div className="flex items-start gap-4">
                            <Avatar className="w-16 h-16">
                              <AvatarImage src={selectedStaff.avatar} alt={selectedStaff.name} />
                              <AvatarFallback className="bg-gradient-to-br from-orange-400 to-amber-500 text-white text-lg">
                                {selectedStaff.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-xl font-semibold text-bakery-brown">{selectedStaff.name}</h3>
                                <Badge className={`${getStatusColor(selectedStaff.status)} capitalize`}>
                                  {selectedStaff.status}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 mb-3">
                                {getPositionIcon(selectedStaff.position)}
                                <span className="font-medium">{selectedStaff.position}</span>
                                <span className="text-muted-foreground">•</span>
                                <span className="text-muted-foreground">{selectedStaff.department}</span>
                              </div>
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                  <Mail className="w-4 h-4" />
                                  {selectedStaff.email}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="w-4 h-4" />
                                  {selectedStaff.phone}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4" />
                                  Hired: {formatDate(selectedStaff.hireDate)}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Employment Details */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                              <div className="text-2xl font-bold text-green-600">{formatSalary(selectedStaff.salary)}</div>
                              <p className="text-sm text-muted-foreground">Annual Salary</p>
                            </div>
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                              <div className="text-2xl font-bold text-blue-600">
                                {Math.floor((new Date() - new Date(selectedStaff.hireDate)) / (1000 * 60 * 60 * 24 * 30))}
                              </div>
                              <p className="text-sm text-muted-foreground">Months Employed</p>
                            </div>
                          </div>

                          {/* Skills */}
                          <div>
                            <h4 className="font-semibold mb-3">Skills & Expertise</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedStaff.skills.map((skill, index) => (
                                <Badge key={index} variant="secondary" className="text-sm">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Schedule */}
                          <div>
                            <h4 className="font-semibold mb-3">Work Schedule</h4>
                            <div className="bg-orange-50/50 p-3 rounded-lg border border-orange-100">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-orange-600" />
                                <span className="text-orange-800">{selectedStaff.schedule}</span>
                              </div>
                            </div>
                          </div>

                          {/* Emergency Contact */}
                          <div>
                            <h4 className="font-semibold mb-3">Emergency Contact</h4>
                            <div className="text-sm text-muted-foreground">
                              <p>{selectedStaff.emergencyContact}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStaff.length === 0 && (
        <Card className="bakery-card">
          <CardContent className="pt-6 text-center">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-lg font-semibold text-bakery-brown mb-2">No staff members found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
