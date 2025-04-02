
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserProfile } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const ProfilePage = () => {
  const { user, userProfile, updateProfile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    username: '',
    bio: '',
    academic_title: '',
    institution: '',
    field_of_study: '',
    avatar_url: '',
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  // Load profile data when available
  useEffect(() => {
    if (userProfile) {
      setFormData({
        username: userProfile.username || '',
        bio: userProfile.bio || '',
        academic_title: userProfile.academic_title || '',
        institution: userProfile.institution || '',
        field_of_study: userProfile.field_of_study || '',
        avatar_url: userProfile.avatar_url || '',
      });
    }
  }, [userProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await updateProfile(formData);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${user?.id}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `avatars/${fileName}`;
    
    setUploadLoading(true);
    
    try {
      // Create a bucket if it doesn't exist (this step might fail if you don't have permissions)
      try {
        const { error: bucketError } = await supabase.storage.createBucket('avatars', {
          public: true,
          fileSizeLimit: 1024 * 1024 * 2, // 2MB
          allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif']
        });
        
        if (bucketError && bucketError.message !== 'Bucket already exists') {
          console.error('Error creating bucket:', bucketError);
        }
      } catch (bucketError) {
        // Bucket probably already exists, continue with upload
      }
      
      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);
      
      if (uploadError) {
        throw uploadError;
      }
      
      // Get the public URL
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      
      // Update the avatar URL in the form state
      setFormData(prev => ({
        ...prev,
        avatar_url: data.publicUrl
      }));
      
      toast.success('Avatar uploaded successfully');
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      toast.error(error.message || 'Error uploading avatar');
    } finally {
      setUploadLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-scholarly-blue" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12 px-4 bg-scholarly-lightGray">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-serif mb-8 text-center">Your Profile</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Avatar Section */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="text-xl">Profile Picture</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src={formData.avatar_url || ''} alt={formData.username || 'User'} />
                  <AvatarFallback className="text-2xl">
                    {formData.username ? formData.username[0].toUpperCase() : user?.email?.[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <Label 
                  htmlFor="avatar" 
                  className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-scholarly-blue text-white hover:bg-scholarly-accent h-10 px-4 py-2 w-full text-center"
                >
                  {uploadLoading ? 'Uploading...' : 'Upload New Picture'}
                </Label>
                <Input 
                  id="avatar" 
                  type="file" 
                  accept="image/*"
                  className="hidden" 
                  onChange={handleAvatarUpload}
                  disabled={uploadLoading}
                />
                
                <p className="text-sm text-muted-foreground mt-2 text-center">
                  Recommended: Square image, max 2MB
                </p>
              </CardContent>
            </Card>
            
            {/* Profile Details Form */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl">Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Display Name</Label>
                      <Input 
                        id="username"
                        name="username"
                        value={formData.username || ''}
                        onChange={handleChange}
                        placeholder="Your display name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio"
                        name="bio"
                        value={formData.bio || ''}
                        onChange={handleChange}
                        placeholder="Tell us about yourself"
                        rows={4}
                      />
                    </div>
                    
                    {userProfile?.is_scholar && (
                      <>
                        <Separator className="my-4" />
                        <h3 className="text-lg font-medium mb-4">Academic Information</h3>
                        
                        <div className="space-y-2">
                          <Label htmlFor="academic_title">Academic Title</Label>
                          <Input 
                            id="academic_title"
                            name="academic_title"
                            value={formData.academic_title || ''}
                            onChange={handleChange}
                            placeholder="Professor, PhD, Researcher"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="institution">Institution</Label>
                          <Input 
                            id="institution"
                            name="institution"
                            value={formData.institution || ''}
                            onChange={handleChange}
                            placeholder="University or Research Institute"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="field_of_study">Field of Study</Label>
                          <Input 
                            id="field_of_study"
                            name="field_of_study"
                            value={formData.field_of_study || ''}
                            onChange={handleChange}
                            placeholder="E.g., Physics, Computer Science"
                          />
                        </div>
                        
                        <div className="p-3 bg-scholarly-blue bg-opacity-10 rounded-md text-sm">
                          <p className="font-medium">Verification Status: <span className="font-bold capitalize">{userProfile?.verification_status}</span></p>
                          <p className="mt-1 text-muted-foreground">
                            {userProfile?.verification_status === 'pending' ? 
                              'Your academic credentials are awaiting verification by an administrator.' : 
                              userProfile?.verification_status === 'verified' ? 
                              'Your academic credentials have been verified.' : 
                              'Your academic credentials have been rejected. Please update them and contact support.'}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-scholarly-blue hover:bg-scholarly-accent"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Save Changes'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
