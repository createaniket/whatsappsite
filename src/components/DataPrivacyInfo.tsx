import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Shield, Users, Clock, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export function DataPrivacyInfo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-whatsapp-green border-whatsapp-green/20">
          <Info className="w-4 h-4 mr-2" />
          How we collect data
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-whatsapp-green">Data Collection &amp; Privacy</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-whatsapp-green" />
              How We Get Member Counts
            </h3>
            <p className="text-muted-foreground mb-4">
              WhatsApp doesn't provide public APIs for group data. We collect member information through 
              privacy-respecting methods that comply with university policies and data protection regulations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center text-green-700">
                  <Shield className="w-4 h-4 mr-2" />
                  University System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Direct integration with university student management systems for official groups. 
                  Most accurate and up-to-date data.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center text-blue-700">
                  <Users className="w-4 h-4 mr-2" />
                  Admin Reported
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Group administrators voluntarily report member counts and group details. 
                  Updated regularly by trusted admins.
                </p>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center text-orange-700">
                  <Info className="w-4 h-4 mr-2" />
                  Self Reported
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Group creators provide initial information when listing their groups. 
                  May be less frequently updated.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center text-gray-700">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Estimated
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Based on group activity, engagement patterns, and historical data. 
                  Shown as approximate ranges.
                </p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-whatsapp-green" />
              Data Freshness
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                <span>University system data: Updated automatically</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                <span>Admin reported data: Updated weekly by group admins</span>
              </div>
              <div className="flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2 text-orange-600" />
                <span>Self-reported data: May be outdated, updated when possible</span>
              </div>
              <div className="flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2 text-gray-600" />
                <span>Estimated data: Recalculated monthly based on activity</span>
              </div>
            </div>
          </div>

          <div className="bg-whatsapp-green/5 p-4 rounded-lg">
            <h4 className="font-medium mb-2 text-whatsapp-green">Privacy Commitment</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• We never access private WhatsApp messages or personal data</li>
              <li>• Only public group information is collected (name, description, approximate size)</li>
              <li>• All data collection is done with university approval and admin consent</li>
              <li>• Member counts are shown as ranges to protect individual privacy</li>
              <li>• No personal student information is stored or shared</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2 text-blue-700">Why This Approach?</h4>
            <p className="text-sm text-muted-foreground">
              WhatsApp's privacy-first design means there's no official API for group discovery. 
              Our approach balances providing useful information to students while respecting 
              privacy and complying with data protection regulations. We work closely with 
              universities to ensure all data collection follows institutional policies.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}