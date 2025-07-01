import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '../../components/ui/dialog';
import { useState, useRef } from 'react';

export default function CustomerSettingsPage({ customer, onSignOut }) {
  const [showPwdDialog, setShowPwdDialog] = useState(false);
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [pwdChanged, setPwdChanged] = useState(false);

  // Profile picture
  const [profilePic, setProfilePic] = useState(customer.profilePic || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(customer.name));
  const fileInputRef = useRef();
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfilePic(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Editable name/email
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState(customer.name);
  const [editEmail, setEditEmail] = useState(customer.email || 'arun@example.com');
  const [editSaved, setEditSaved] = useState(false);
  const handleEditSave = () => {
    setEditMode(false);
    setEditSaved(true);
    setTimeout(() => setEditSaved(false), 1500);
  };
  const handleEditCancel = () => {
    setEditMode(false);
    setEditName(customer.name);
    setEditEmail(customer.email || 'arun@example.com');
  };

  // Notification preferences
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSMS, setNotifSMS] = useState(false);

  // Account deletion
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const handleDeleteAccount = () => {
    setDeleted(true);
    setTimeout(() => {
      setShowDeleteDialog(false);
      setDeleted(false);
      onSignOut && onSignOut();
    }, 1500);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPwd && newPwd === confirmPwd) {
      setPwdChanged(true);
      setTimeout(() => {
        setPwdChanged(false);
        setShowPwdDialog(false);
        setNewPwd('');
        setConfirmPwd('');
      }, 1500);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Settings</h3>
      <div className="space-y-4 max-w-md">
        {/* Profile Picture */}
        <div className="flex items-center gap-4 mb-2">
          <img src={profilePic} alt="Profile" className="w-16 h-16 rounded-full border-2 border-orange-300 shadow" />
          <button onClick={() => fileInputRef.current.click()} className="px-3 py-1 bg-orange-200 text-orange-800 rounded-lg text-sm hover:bg-orange-300">Change Photo</button>
          <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleProfilePicChange} />
        </div>
        {/* Editable Name/Email */}
        <div>
          <label className="block text-sm font-medium">Name</label>
          {editMode ? (
            <input className="w-full p-2 border rounded" value={editName} onChange={e => setEditName(e.target.value)} />
          ) : (
            <input className="w-full p-2 border rounded bg-gray-50" value={editName} readOnly />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          {editMode ? (
            <input className="w-full p-2 border rounded" value={editEmail} onChange={e => setEditEmail(e.target.value)} />
          ) : (
            <input className="w-full p-2 border rounded bg-gray-50" value={editEmail} readOnly />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          {editMode ? (
            <input className="w-full p-2 border rounded" value={customer.phone || '+94 77 123 4567'} readOnly />
          ) : (
            <input className="w-full p-2 border rounded bg-gray-50" value={customer.phone || '+94 77 123 4567'} readOnly />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">Address</label>
          {editMode ? (
            <input className="w-full p-2 border rounded" value={customer.address || '123 Main St, Jaffna'} readOnly />
          ) : (
            <input className="w-full p-2 border rounded bg-gray-50" value={customer.address || '123 Main St, Jaffna'} readOnly />
          )}
        </div>
        {editMode ? (
          <div className="flex gap-2">
            <button onClick={handleEditSave} className="px-4 py-2 bg-orange-500 text-white rounded-lg">Save</button>
            <button onClick={handleEditCancel} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
          </div>
        ) : (
          <button onClick={() => setEditMode(true)} className="px-4 py-2 bg-orange-400 text-white rounded-lg">Edit Profile</button>
        )}
        {editSaved && <div className="text-green-600 text-sm">Profile updated (local only)</div>}
        {/* Change Password */}
        <Dialog open={showPwdDialog} onOpenChange={setShowPwdDialog}>
          <DialogTrigger asChild>
            <button className="px-4 py-2 bg-orange-400 text-white rounded-lg w-full">Change Password</button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>Enter your new password below.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">New Password</label>
                <input type="password" className="w-full p-2 border rounded" value={newPwd} onChange={e => setNewPwd(e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-medium">Confirm Password</label>
                <input type="password" className="w-full p-2 border rounded" value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)} required />
              </div>
              {newPwd && confirmPwd && newPwd !== confirmPwd && (
                <div className="text-red-500 text-sm">Passwords do not match.</div>
              )}
              {pwdChanged && <div className="text-green-600 text-sm">Password changed successfully!</div>}
              <DialogFooter>
                <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded-lg">Change</button>
                <DialogClose asChild>
                  <button type="button" className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        {/* Notification Preferences */}
        <div className="border-t pt-4 mt-4">
          <div className="mb-2 font-semibold text-orange-700">Notification Preferences</div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={notifEmail} onChange={() => setNotifEmail(v => !v)} />
              <span>Email Notifications</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={notifSMS} onChange={() => setNotifSMS(v => !v)} />
              <span>SMS Notifications</span>
            </label>
          </div>
        </div>
        {/* Support Details */}
        <div className="border-t pt-4 mt-4">
          <div className="mb-2 font-semibold text-orange-700">Support</div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Phone:</span>
            <a href="tel:+94112223344" className="text-orange-600 hover:underline">+94 112 223344</a>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Email:</span>
            <a href="mailto:support@sebakers.com" className="text-orange-600 hover:underline">support@sebakers.com</a>
          </div>
        </div>
        {/* Account Deletion */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogTrigger asChild>
            <button className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-lg mt-4 hover:bg-red-200 font-semibold">Delete Account</button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Account</DialogTitle>
              <DialogDescription>Are you sure you want to delete your account? This action cannot be undone.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <button onClick={handleDeleteAccount} className="px-4 py-2 bg-red-500 text-white rounded-lg">Yes, Delete</button>
              <DialogClose asChild>
                <button className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
              </DialogClose>
            </DialogFooter>
            {deleted && <div className="text-green-600 text-sm mt-2">Account deleted (local only)</div>}
          </DialogContent>
        </Dialog>
        {/* Logout */}
        <button onClick={onSignOut} className="w-full px-4 py-2 bg-orange-100 text-orange-700 rounded-lg mt-4 hover:bg-orange-200 font-semibold">Logout</button>
      </div>
    </div>
  );
} 
