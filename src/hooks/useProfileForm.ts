import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/auth';
import { useAuth } from '@/contexts/AuthContext';
import { profileSchema } from '@/lib/validation/schemas';
import { toast } from 'sonner';

export const useProfileForm = () => {
  const { user, userProfile, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    username: '',
    bio: '',
    academic_title: '',
    institution: '',
    field_of_study: '',
    avatar_url: '',
  });

  // Function to initialize form data manually
  const initializeForm = (profile: UserProfile) => {
    setFormData({
      username: profile.username || '',
      bio: profile.bio || '',
      academic_title: profile.academic_title || '',
      institution: profile.institution || '',
      field_of_study: profile.field_of_study || '',
      avatar_url: profile.avatar_url || '',
    });
  };

  // Auto-initialize form when userProfile changes
  useEffect(() => {
    if (userProfile && !formData.username) {
      initializeForm(userProfile);
    }
  }, [userProfile]); // Runs only when `userProfile` changes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (url: string) => {
    setFormData(prev => ({
      ...prev,
      avatar_url: url
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate profile data before submitting
      profileSchema.parse(formData);
      await updateProfile(formData);
    } catch (err: any) {
      const errorMessage = err.errors ? err.errors.map((e: any) => e.message).join(', ') : err.message;
      toast.error(errorMessage || 'Invalid profile data');
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    userProfile,
    formData,
    loading,
    initializeForm, // Keep for other pages
    handleChange,
    handleSubmit,
    handleAvatarChange
  };
};
