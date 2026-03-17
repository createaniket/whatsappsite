import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { DataPrivacyInfo } from './DataPrivacyInfo';
import { Shield, Users, MessageCircle, CheckCircle, Lock, Heart, Database, AlertTriangle } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl mb-4 text-whatsapp-green">About WhatsApp University</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          The official platform for discovering verified WhatsApp groups for university students across the UK.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <Card className="text-center border-whatsapp-green/10">
          <CardHeader>
            <div className="w-16 h-16 bg-whatsapp-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-whatsapp-green" />
            </div>
            <h3 className="text-whatsapp-green">University Verified</h3>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              All groups are verified by university administrators to ensure authentic, safe communities for students.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center border-whatsapp-green/10">
          <CardHeader>
            <div className="w-16 h-16 bg-whatsapp-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-whatsapp-green" />
            </div>
            <h3 className="text-whatsapp-green">Official WhatsApp</h3>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Direct integration with WhatsApp for seamless joining of groups through official invite links.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center border-whatsapp-green/10">
          <CardHeader>
            <div className="w-16 h-16 bg-whatsapp-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-whatsapp-green" />
            </div>
            <h3 className="text-whatsapp-green">Student Community</h3>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Connect with fellow students in your field, share resources, and build lasting academic relationships.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-4xl mx-auto mb-12">
        <h2 className="text-3xl text-center mb-8 text-whatsapp-green">Our Mission</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl mb-4 flex items-center">
              <Lock className="w-5 h-5 mr-2 text-whatsapp-green" />
              Privacy &amp; Security
            </h3>
            <p className="text-muted-foreground mb-6">
              We prioritize student privacy and security. All groups are moderated by university staff and 
              follow strict guidelines to maintain a safe learning environment.
            </p>

            <h3 className="text-xl mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-whatsapp-green" />
              Verified Communities
            </h3>
            <p className="text-muted-foreground">
              Every group is verified by university administrators to ensure you're connecting with genuine 
              students and academic staff from your institution.
            </p>
          </div>

          <div>
            <h3 className="text-xl mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-whatsapp-green" />
              Academic Success
            </h3>
            <p className="text-muted-foreground mb-6">
              Our platform is designed to enhance your academic journey by connecting you with peers who 
              share your subjects, interests, and academic goals.
            </p>

            <h3 className="text-xl mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-whatsapp-green" />
              Inclusive Environment
            </h3>
            <p className="text-muted-foreground">
              We foster an inclusive environment where all students can participate, learn, and grow together 
              regardless of their background or experience level.
            </p>
          </div>
        </div>
      </div>

      {/* Data Collection Section */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl mb-4 text-whatsapp-green flex items-center justify-center">
            <Database className="w-8 h-8 mr-3" />
            How We Collect Data
          </h2>
          <div className="flex justify-center">
            <DataPrivacyInfo />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-yellow-200 bg-yellow-50/50">
            <CardHeader>
              <h3 className="text-lg font-medium flex items-center text-yellow-700">
                <AlertTriangle className="w-5 h-5 mr-2" />
                WhatsApp Limitations
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                WhatsApp doesn't provide public APIs for group discovery or member counts. This is by design 
                to protect user privacy and group security.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• No official WhatsApp Business API for group data</li>
                <li>• Group information is intentionally private</li>
                <li>• Member counts not accessible through any API</li>
                <li>• Group discovery requires manual processes</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50/50">
            <CardHeader>
              <h3 className="text-lg font-medium flex items-center text-green-700">
                <Shield className="w-5 h-5 mr-2" />
                Our Solution
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                We work directly with universities and group administrators to collect data ethically 
                and transparently, respecting privacy at every step.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• University partnership agreements</li>
                <li>• Admin consent for all data collection</li>
                <li>• Regular verification of group status</li>
                <li>• No automated scraping or data mining</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="bg-whatsapp-green/5 p-6 rounded-lg text-center">
          <h4 className="font-medium mb-3 text-whatsapp-green">Transparency Promise</h4>
          <p className="text-muted-foreground">
            We believe students deserve to know exactly how we collect and use data. Our methods 
            prioritize consent, accuracy, and privacy while providing valuable information to help 
            you find the right academic communities.
          </p>
        </div>
      </div>
    </div>
  );
}