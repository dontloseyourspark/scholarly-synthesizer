
import { useState } from 'react';
import { UserProfile } from '@/types/auth';
import { useAuth } from '@/contexts/AuthContext';

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
  
  // Load profile data when available
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
      await updateProfile(formData);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return {
    user,
    userProfile,
    formData,
    loading,
    initializeForm,
    handleChange,
    handleSubmit,
    handleAvatarChange
  };
};
