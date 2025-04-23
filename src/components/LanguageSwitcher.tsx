import React from 'react';
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'vi' : 'en');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className="relative p-2 rounded-full hover:bg-secondary button-transition"
    >
      <Globe className="h-5 w-5" />
      <span className="sr-only">
        {language === 'en' ? 'Switch to Vietnamese' : 'Chuyển sang tiếng Anh'}
      </span>
      <span className="absolute -top-1 -right-1 text-xs font-bold">
        {language === 'en' ? 'VN' : 'EN'}
      </span>
    </Button>
  );
};
