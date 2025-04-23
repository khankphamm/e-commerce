import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { Separator } from '@/components/ui/separator';
import { User } from 'lucide-react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AuthDialog = ({ open, onOpenChange }: AuthDialogProps) => {
  const [activeTab, setActiveTab] = useState<string>("login");
  const { t } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-center">
          <div className="mx-auto bg-muted w-12 h-12 flex items-center justify-center rounded-full mb-4">
            <User className="w-6 h-6" />
          </div>
          <div className="flex items-center justify-between mb-2">
            <DialogTitle className="text-xl">{t('auth.login')}</DialogTitle>
            <LanguageSwitcher />
          </div>
          <DialogDescription>
            {t('auth.login')} {t('auth.orContinueWith')} {t('auth.register')}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">{t('auth.login')}</TabsTrigger>
            <TabsTrigger value="register">{t('auth.register')}</TabsTrigger>  
          </TabsList>
          
          <TabsContent value="login" className="mt-4">
            <LoginForm onSuccess={() => onOpenChange(false)} switchToRegister={() => setActiveTab("register")} />
          </TabsContent>
          
          <TabsContent value="register" className="mt-4">
            <RegisterForm onSuccess={() => onOpenChange(false)} switchToLogin={() => setActiveTab("login")} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
