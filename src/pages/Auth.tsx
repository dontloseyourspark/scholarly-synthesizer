
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Auth = () => {
  const { user, signIn, signUp, loading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [isScholar, setIsScholar] = useState(false);
  const [academicTitle, setAcademicTitle] = useState('');
  const [institution, setInstitution] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [step, setStep] = useState(1); // Step 1: Basic Info, Step 2: Scholar Verification

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    try {
      setIsSubmitting(true);
      await signIn(email, password);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isScholar && step === 1) {
      setStep(2);
      return;
    }

    if (!email || !password) return;
    
    try {
      setIsSubmitting(true);
      
      // Include scholar credentials in metadata if applicable
      const metadata = isScholar ? {
        is_scholar: true,
        academic_title: academicTitle,
        institution: institution,
        field_of_study: fieldOfStudy,
        verification_status: 'pending' // Will require admin verification
      } : {
        is_scholar: false
      };
      
      await signUp(email, password, metadata);
      
      // Reset form and go back to login tab
      setActiveTab('login');
      setStep(1);
      setIsScholar(false);
      setAcademicTitle('');
      setInstitution('');
      setFieldOfStudy('');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Redirect if user is already logged in
  if (user && !loading) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center bg-scholarly-lightGray py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 flex flex-col items-center">
            <div className="w-12 h-12 bg-scholarly-blue bg-opacity-10 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-scholarly-blue" />
            </div>
            <CardTitle className="text-2xl font-serif text-center">Welcome to ScholarSphere</CardTitle>
            <CardDescription className="text-center">
              {activeTab === 'login' ? 'Sign in to your account' : 'Create an account to join the community'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your.email@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-scholarly-blue hover:bg-scholarly-accent"
                    disabled={isSubmitting || loading}
                  >
                    {isSubmitting ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleSignUp} className="space-y-4">
                  {step === 1 && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="register-email">Email</Label>
                        <Input 
                          id="register-email" 
                          type="email" 
                          placeholder="your.email@example.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-password">Password</Label>
                        <Input 
                          id="register-password" 
                          type="password" 
                          placeholder="••••••••" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex items-center space-x-2 py-2">
                        <Checkbox 
                          id="is-scholar" 
                          checked={isScholar} 
                          onCheckedChange={(checked) => {
                            setIsScholar(checked === true);
                          }} 
                        />
                        <label
                          htmlFor="is-scholar"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I am a scholar or academic researcher
                        </label>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-scholarly-blue hover:bg-scholarly-accent"
                        disabled={isSubmitting || loading}
                      >
                        {isScholar ? 'Next: Academic Credentials' : 'Create Account'}
                      </Button>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="academic-title">Academic Title</Label>
                        <Input 
                          id="academic-title" 
                          type="text" 
                          placeholder="e.g., Professor, PhD, Researcher" 
                          value={academicTitle}
                          onChange={(e) => setAcademicTitle(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="institution">Institution</Label>
                        <Input 
                          id="institution" 
                          type="text" 
                          placeholder="University or Research Institute" 
                          value={institution}
                          onChange={(e) => setInstitution(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="field-of-study">Field of Study</Label>
                        <Input 
                          id="field-of-study" 
                          type="text" 
                          placeholder="e.g., Physics, Computer Science, Medicine" 
                          value={fieldOfStudy}
                          onChange={(e) => setFieldOfStudy(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex justify-between gap-4 mt-6">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setStep(1)}
                          className="flex-1"
                        >
                          Back
                        </Button>
                        <Button 
                          type="submit" 
                          className="flex-1 bg-scholarly-blue hover:bg-scholarly-accent"
                          disabled={isSubmitting || loading}
                        >
                          {isSubmitting ? 'Creating account...' : 'Complete Sign Up'}
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground text-center mt-4">
                        Your academic credentials will need verification before you can publish as a scholar.
                      </p>
                    </>
                  )}
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <p className="text-center text-sm text-muted-foreground px-6 w-full">
              By continuing, you agree to ScholarSphere's Terms of Service and Privacy Policy.
            </p>
          </CardFooter>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
