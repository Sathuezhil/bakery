import { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Search } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Eye, Phone, Mail, Calendar, Briefcase, ChefHat, User, Users } from 'lucide-react';

// Jaffna staff data
const jaffnaStaff = [
  { id: 1, name: 'Sathuryan Ezhil', email: 'ezhil@sweetdreams.com', phone: '+94 77 123 4567', position: 'Manager', department: 'Management', hireDate: '2022-03-15', salary: 55000, status: 'active', avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100', skills: ['Leadership', 'Customer Service', 'Inventory Management'], schedule: 'Monday - Friday, 8:00 AM - 6:00 PM', emergencyContact: 'Sathuryan - +94 77 987 6543', branch: 'Jaffna' },
  { id: 2, name: 'Marcus Rodriguez', email: 'marcus.rodriguez@sweetdreams.com', phone: '+94 76 234 5678', position: 'Pastry Chef', department: 'Kitchen', hireDate: '2021-07-22', salary: 48000, status: 'active', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100', skills: ['French Pastries', 'Cake Design', 'Recipe Development'], schedule: 'Tuesday - Saturday, 5:00 AM - 2:00 PM', emergencyContact: 'Maria Rodriguez - +94 76 876 5432', branch: 'Jaffna' },
  { id: 3, name: 'Emma Chen', email: 'emma.chen@sweetdreams.com', phone: '+94 71 345 6789', position: 'Baker', department: 'Kitchen', hireDate: '2023-01-10', salary: 42000, status: 'active', avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100', skills: ['Bread Making', 'Sourdough', 'Early Morning Prep'], schedule: 'Monday - Friday, 4:00 AM - 1:00 PM', emergencyContact: 'David Chen - +94 71 765 4321', branch: 'Jaffna' },
  { id: 4, name: 'Alex Thompson', email: 'alex.thompson@sweetdreams.com', phone: '+94 72 456 7890', position: 'Sales Associate', department: 'Front of House', hireDate: '2023-06-05', salary: 32000, status: 'active', avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100', skills: ['Customer Service', 'POS Systems', 'Product Knowledge'], schedule: 'Wednesday - Sunday, 7:00 AM - 4:00 PM', emergencyContact: 'Lisa Thompson - +94 72 654 3210', branch: 'Jaffna' },
  { id: 5, name: 'Isabella Martinez', email: 'isabella.martinez@sweetdreams.com', phone: '+94 75 567 8901', position: 'Decorator', department: 'Decoration', hireDate: '2022-11-18', salary: 38000, status: 'active', avatar: 'https://images.pexels.com/photos/1130624/pexels-photo-1130624.jpeg?auto=compress&cs=tinysrgb&w=100', skills: ['Cake Decorating', 'Fondant Work', 'Artistic Design'], schedule: 'Monday - Friday, 9:00 AM - 6:00 PM', emergencyContact: 'Carlos Martinez - +94 75 543 2109', branch: 'Jaffna' },
  { id: 6, name: 'James Wilson', email: 'james.wilson@sweetdreams.com', phone: '+94 78 678 9012', position: 'Assistant', department: 'Kitchen', hireDate: '2023-09-12', salary: 28000, status: 'probation', avatar: 'https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg?auto=compress&cs=tinysrgb&w=100', skills: ['Food Prep', 'Cleaning', 'Basic Baking'], schedule: 'Monday - Friday, 6:00 AM - 3:00 PM', emergencyContact: 'Mary Wilson - +94 78 432 1098', branch: 'Jaffna' }
];

// Colombo staff data
const colomboStaff = [
  { id: 101, name: 'Nimal Perera', email: 'nimal.perera@colombobakery.com', phone: '+94 11 123 4567', position: 'Manager', department: 'Management', hireDate: '2021-02-10', salary: 60000, status: 'active', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', skills: ['Leadership', 'Operations', 'Inventory Management'], schedule: 'Monday - Friday, 8:00 AM - 6:00 PM', emergencyContact: 'Kumari Perera - +94 11 987 6543', branch: 'Colombo' },
  { id: 102, name: 'Dilani Fernando', email: 'dilani.fernando@colombobakery.com', phone: '+94 11 234 5678', position: 'Pastry Chef', department: 'Kitchen', hireDate: '2020-06-15', salary: 50000, status: 'active', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', skills: ['Pastry', 'Cake Design', 'Recipe Development'], schedule: 'Tuesday - Saturday, 5:00 AM - 2:00 PM', emergencyContact: 'Ruwan Fernando - +94 11 876 5432', branch: 'Colombo' },
  { id: 103, name: 'Suresh De Silva', email: 'suresh.desilva@colombobakery.com', phone: '+94 11 345 6789', position: 'Baker', department: 'Kitchen', hireDate: '2022-09-01', salary: 43000, status: 'active', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', skills: ['Bread Making', 'Sourdough', 'Morning Prep'], schedule: 'Monday - Friday, 4:00 AM - 1:00 PM', emergencyContact: 'Anoma De Silva - +94 11 765 4321', branch: 'Colombo' },
  { id: 104, name: 'Harsha Jayawardena', email: 'harsha.jayawardena@colombobakery.com', phone: '+94 11 456 7890', position: 'Sales Associate', department: 'Front of House', hireDate: '2023-03-20', salary: 35000, status: 'active', avatar: 'https://randomuser.me/api/portraits/men/46.jpg', skills: ['Customer Service', 'POS Systems', 'Product Knowledge'], schedule: 'Wednesday - Sunday, 7:00 AM - 4:00 PM', emergencyContact: 'Nadeesha Jayawardena - +94 11 654 3210', branch: 'Colombo' },
  { id: 105, name: 'Rashmi Gunasekara', email: 'rashmi.gunasekara@colombobakery.com', phone: '+94 11 567 8901', position: 'Decorator', department: 'Decoration', hireDate: '2021-12-10', salary: 39000, status: 'active', avatar: 'https://randomuser.me/api/portraits/women/47.jpg', skills: ['Cake Decorating', 'Fondant Work', 'Artistic Design'], schedule: 'Monday - Friday, 9:00 AM - 6:00 PM', emergencyContact: 'Sunil Gunasekara - +94 11 543 2109', branch: 'Colombo' },
  { id: 106, name: 'Janith Abeysekara', email: 'janith.abeysekara@colombobakery.com', phone: '+94 11 678 9012', position: 'Assistant', department: 'Kitchen', hireDate: '2023-08-05', salary: 30000, status: 'probation', avatar: 'https://randomuser.me/api/portraits/men/48.jpg', skills: ['Food Prep', 'Cleaning', 'Basic Baking'], schedule: 'Monday - Friday, 6:00 AM - 3:00 PM', emergencyContact: 'Nimali Abeysekara - +94 11 432 1098', branch: 'Colombo' }
];

const combinedStaff = [...jaffnaStaff, ...colomboStaff];

export default function CombinedStaff() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedStaff, setSelectedStaff] = useState(null);

  const filteredStaff = combinedStaff.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.phone.includes(searchTerm) ||
      s.email.includes(searchTerm);
    const matchesBranch = selectedBranch === 'all' || s.branch === selectedBranch;
    return matchesSearch && matchesBranch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-bakery-brown">Combined Staff</h1>
        <p className="text-muted-foreground">View staff from both Jaffna and Colombo branches</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-orange-400" />
          <Input
            placeholder="Search staff by name, position, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-orange-50/50 border-orange-200 focus:border-orange-400 focus:ring-orange-200"
          />
        </div>
        <Select value={selectedBranch} onValueChange={setSelectedBranch}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All Branches" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Branches</SelectItem>
            <SelectItem value="Jaffna">Jaffna</SelectItem>
            <SelectItem value="Colombo">Colombo</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-bakery-brown mb-2">No staff found</h3>
            <p className="text-gray-500">Try adjusting your search terms or branch filter.</p>
          </div>
        ) : (
          filteredStaff.map((staff) => (
            <Card key={staff.id} className="bakery-card hover-lift group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={staff.avatar} alt={staff.name} />
                      <AvatarFallback className="bg-orange-100 text-orange-600">
                        {staff.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-bakery-brown group-hover:text-orange-600 transition-colors">
                        {staff.name}
                      </h3>
                      <p className="text-sm text-gray-500">{staff.position} - {staff.department}</p>
                    </div>
                  </div>
                  <Badge className={`text-xs ${staff.status === 'active' ? 'bg-green-100 text-green-800 border-green-200' : staff.status === 'probation' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
                    <span className="capitalize">{staff.status}</span>
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-orange-500" />
                    <span>{staff.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-orange-500" />
                    <span>{staff.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    <span>Hired {staff.hireDate}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>Salary:</span>
                    <span>LKR {staff.salary.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>Branch:</span>
                    <span className={staff.branch === 'Jaffna' ? 'text-orange-600 font-semibold' : 'text-blue-600 font-semibold'}>{staff.branch}</span>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 border-orange-200 text-orange-600 hover:bg-orange-50"
                        onClick={() => setSelectedStaff(staff)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-xl text-bakery-brown">Staff Details</DialogTitle>
                        <DialogDescription>
                          Complete information about {selectedStaff?.name}
                        </DialogDescription>
                      </DialogHeader>
                      {selectedStaff && (
                        <div className="space-y-6">
                          <div className="flex items-center space-x-4">
                            <Avatar className="w-16 h-16">
                              <AvatarImage src={selectedStaff.avatar} alt={selectedStaff.name} />
                              <AvatarFallback className="bg-orange-100 text-orange-600 text-lg">
                                {selectedStaff.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-xl font-semibold text-bakery-brown">{selectedStaff.name}</h3>
                              <p className="text-gray-600">{selectedStaff.position} - {selectedStaff.department}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4 text-orange-500" />
                                <span className="text-sm">{selectedStaff.phone}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4 text-orange-500" />
                                <span className="text-sm">{selectedStaff.email}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-orange-500" />
                                <span className="text-sm">Hired {selectedStaff.hireDate}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold">Branch:</span>
                                <span className={selectedStaff.branch === 'Jaffna' ? 'text-orange-600 font-semibold' : 'text-blue-600 font-semibold'}>{selectedStaff.branch}</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold">Salary:</span>
                                <span>LKR {selectedStaff.salary.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold">Status:</span>
                                <span>{selectedStaff.status}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold">Schedule:</span>
                                <span>{selectedStaff.schedule}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold">Emergency Contact:</span>
                                <span>{selectedStaff.emergencyContact}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-bakery-brown mb-2">Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedStaff.skills.map((skill, index) => (
                                <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-700">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
} 