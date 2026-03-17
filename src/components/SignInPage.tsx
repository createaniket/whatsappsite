import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { MessageCircle, Shield, CheckCircle } from 'lucide-react';

export function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would handle authentication
    console.log('Sign in attempted with:', { email, password });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-whatsapp-green rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl mb-2 text-whatsapp-green">Sign In</h1>
          <p className="text-muted-foreground">
            Access your verified student account to join WhatsApp groups
          </p>
        </div>

        <Card className="border-whatsapp-green/20">
          <CardHeader>
            <CardTitle className="text-center text-whatsapp-green">Student Portal</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">University Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.name@university.ac.uk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-whatsapp-green/20 focus:border-whatsapp-green"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-whatsapp-green/20 focus:border-whatsapp-green"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-whatsapp-green hover:bg-whatsapp-dark text-white"
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 space-y-3">
              <div className="flex items-center text-sm text-muted-foreground">
                <Shield className="w-4 h-4 mr-2 text-whatsapp-green" />
                <span>Secure university authentication</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 mr-2 text-whatsapp-green" />
                <span>Access to verified student groups</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <button className="text-whatsapp-green hover:underline">
                  Request university verification
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}