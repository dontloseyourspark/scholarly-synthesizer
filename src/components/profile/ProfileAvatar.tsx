
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types/auth';

interface ProfileAvatarProps {
  userProfile: UserProfile | null;
  user: { id: string; email?: string } | null;
  onAvatarChange: (url: string) => void;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ userProfile, user, onAvatarChange }) => {
  const [uploadLoading, setUploadLoading] = useState(false);
  
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !user) {
      return;
    }
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
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
      
      // Update the avatar URL via the callback
      onAvatarChange(data.publicUrl);
      
      toast.success('Avatar uploaded successfully');
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      toast.error(error.message || 'Error uploading avatar');
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <CardTitle className="text-xl">Profile Picture</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <Avatar className="h-32 w-32 mb-4">
          <AvatarImage src={userProfile?.avatar_url || ''} alt={userProfile?.username || 'User'} />
          <AvatarFallback className="text-2xl">
            {userProfile?.username 
              ? userProfile.username[0].toUpperCase() 
              : user?.email?.[0].toUpperCase()}
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
  );
};

export default ProfileAvatar;
