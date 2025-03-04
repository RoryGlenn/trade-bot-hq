
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Shield, Bell, Lock, User, Save } from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings Updated",
      description: "Your account settings have been successfully updated.",
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gradient">Account Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account preferences and security settings</p>
      </div>

      <div className="glass-morphism rounded-xl p-8 animate-slide-in">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-secondary/50">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User size={16} /> Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield size={16} /> Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell size={16} /> Notifications
            </TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSaveSettings}>
            <TabsContent value="profile" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    defaultValue="John Doe" 
                    className="bg-secondary border-white/10"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email"
                    defaultValue="john.doe@example.com" 
                    className="bg-secondary border-white/10"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username" 
                    defaultValue="johndoe" 
                    className="bg-secondary border-white/10"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc-5">
                    <SelectTrigger id="timezone" className="bg-secondary border-white/10">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                      <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                      <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                      <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                      <SelectItem value="utc+0">UTC</SelectItem>
                      <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea 
                  id="bio" 
                  rows={3}
                  className="w-full rounded-md bg-secondary border-white/10 p-3 text-sm"
                  placeholder="Tell us a bit about yourself"
                ></textarea>
              </div>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Change Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input 
                      id="currentPassword" 
                      type="password"
                      className="bg-secondary border-white/10"
                    />
                  </div>
                  
                  <div className="hidden md:block"></div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      id="newPassword" 
                      type="password"
                      className="bg-secondary border-white/10"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password"
                      className="bg-secondary border-white/10"
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Two-Factor Authentication</div>
                    <div className="text-sm text-muted-foreground">Add an extra layer of security to your account</div>
                  </div>
                  <Switch 
                    checked={twoFactorAuth} 
                    onCheckedChange={setTwoFactorAuth} 
                  />
                </div>
              </div>
              
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-lg font-medium mb-4">API Keys</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-secondary border border-white/10 rounded-lg flex justify-between items-center">
                    <div>
                      <div className="font-medium">Trading API Key</div>
                      <div className="text-sm text-muted-foreground">Created 3 months ago</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-white/10">
                        <Lock size={14} className="mr-1" /> View
                      </Button>
                      <Button variant="outline" size="sm" className="border-white/10 text-red-400 hover:text-red-300">
                        Revoke
                      </Button>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="border-white/10">
                    Generate New API Key
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Bot Activity Notifications</div>
                    <div className="text-sm text-muted-foreground">Receive notifications for bot activity and transactions</div>
                  </div>
                  <Switch 
                    checked={notifications} 
                    onCheckedChange={setNotifications} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Email Alerts</div>
                    <div className="text-sm text-muted-foreground">Receive email notifications for important events</div>
                  </div>
                  <Switch 
                    checked={emailAlerts} 
                    onCheckedChange={setEmailAlerts} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Price Alerts</div>
                    <div className="text-sm text-muted-foreground">Get notified about significant price changes</div>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Security Alerts</div>
                    <div className="text-sm text-muted-foreground">Receive notifications about security-related events</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="p-4 bg-purple/10 border border-purple/20 rounded-lg flex">
                <AlertCircle size={20} className="text-purple shrink-0 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-purple mb-1">Stay Updated</h4>
                  <p className="text-sm text-muted-foreground">
                    We recommend keeping security alerts enabled to stay informed about important security events related to your account.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-white/10">
              <Button
                type="button"
                variant="outline"
                className="border-white/10"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-purple hover:bg-purple-light">
                <Save size={16} className="mr-2" /> Save Changes
              </Button>
            </div>
          </form>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
