
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { UserProfile } from '@/types/auth';

interface ProfileFormProps {
  formData: Partial<UserProfile>;
  userProfile: UserProfile | null;
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ 
  formData, 
  userProfile, 
  loading, 
  onChange, 
  onSubmit 
}) => {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="text-xl">Profile Information</CardTitle>
        <CardDescription>
          Update your personal information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Display Name</Label>
              <Input 
                id="username"
                name="username"
                value={formData.username || ''}
                onChange={onChange}
                placeholder="Your display name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea 
                id="bio"
                name="bio"
                value={formData.bio || ''}
                onChange={onChange}
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
                    onChange={onChange}
                    placeholder="Professor, PhD, Researcher"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution</Label>
                  <Input 
                    id="institution"
                    name="institution"
                    value={formData.institution || ''}
                    onChange={onChange}
                    placeholder="University or Research Institute"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="field_of_study">Field of Study</Label>
                  <Input 
                    id="field_of_study"
                    name="field_of_study"
                    value={formData.field_of_study || ''}
                    onChange={onChange}
                    placeholder="E.g., Physics, Computer Science"
                  />
                </div>
                
                <VerificationStatus status={userProfile?.verification_status} />
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
  );
};

// Small internal component for verification status display
const VerificationStatus: React.FC<{ status: string | null | undefined }> = ({ status }) => (
  <div className="p-3 bg-scholarly-blue bg-opacity-10 rounded-md text-sm">
    <p className="font-medium">Verification Status: <span className="font-bold capitalize">{status}</span></p>
    <p className="mt-1 text-muted-foreground">
      {status === 'pending' ? 
        'Your academic credentials are awaiting verification by an administrator.' : 
        status === 'verified' ? 
        'Your academic credentials have been verified.' : 
        'Your academic credentials have been rejected. Please update them and contact support.'}
    </p>
  </div>
);

export default ProfileForm;
