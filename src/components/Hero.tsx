import React from 'react';
import { Users, MessageSquare, Shield, CheckCircle, ArrowDown } from 'lucide-react';

export function Hero() {
  const scrollToGroups = () => {
    const groupsSection = document.querySelector('#browse');
    if (groupsSection) {
      groupsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="bg-gradient-to-br from-whatsapp-green/5 to-whatsapp-light/20 py-12 md:py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 bg-whatsapp-green rounded-full flex items-center justify-center mr-4">
            <MessageSquare className="w-10 h-10 text-white" />
          </div>
          <div className="text-left">
            <h1 className="text-3xl md:text-5xl mb-2">
              Official WhatsApp<br />University Groups
            </h1>
            <div className="flex items-center text-whatsapp-green">
              <Shield className="w-5 h-5 mr-2" />
              <span className="text-lg">Verified &amp; Secure Communities</span>
            </div>
          </div>
        </div>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Connect with verified students from your university through official WhatsApp groups. 
          Find study partners, get academic support, and build lasting friendships in secure, 
          university-moderated communities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg border border-whatsapp-green/10">
            <div className="bg-whatsapp-green/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-whatsapp-green" />
            </div>
            <h3 className="mb-2 text-whatsapp-green">University Verified</h3>
            <p className="text-sm text-muted-foreground">All groups verified by university admins for authenticity and safety</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg border border-whatsapp-green/10">
            <div className="bg-whatsapp-green/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-whatsapp-green" />
            </div>
            <h3 className="mb-2 text-whatsapp-green">500+ Active Groups</h3>
            <p className="text-sm text-muted-foreground">Join official WhatsApp communities for every subject and university</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg border border-whatsapp-green/10">
            <div className="bg-whatsapp-green/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-whatsapp-green" />
            </div>
            <h3 className="mb-2 text-whatsapp-green">15,000+ Students</h3>
            <p className="text-sm text-muted-foreground">Connect with verified students in your academic field</p>
          </div>
        </div>

        <button 
          onClick={scrollToGroups}
          className="inline-flex items-center text-whatsapp-green hover:text-whatsapp-dark transition-colors"
        >
          <span className="mr-2">Browse Groups</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}