import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { GoogleLogin } from "./GoogleLogin";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import axios from "axios";
import Cookies from "js-cookie";

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSuccess: () => void;
  switchToLogin: () => void;
}

export function RegisterForm({ onSuccess, switchToLogin }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useLanguage();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);
    
    try {
      // Call the registration API
      const response = await axios.post('http://26.233.64.87:8080/api/register', {
        name: data.name,
        email: data.email,
        password: data.password
      });

      const userData = response.data;
      
      // Store user data in cookies
      Cookies.set('user', JSON.stringify(userData), { expires: 7 }); // Cookie expires in 7 days

      // Login the user using our AuthContext
      login(userData);
      
      toast({
        title: t('auth.registerSuccess'),
        description: t('auth.accountCreated'),
      });
      
      onSuccess();
      
      // Redirect based on user role
      if (userData.role === 'admin') {
        navigate("/admin");
      } else {
        navigate("/account");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: t('auth.registerFailed'),
        description: error.response?.data?.message || t('auth.tryAgain'),
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('auth.name')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('auth.namePlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('auth.email')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('auth.emailPlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('auth.password')}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder={t('auth.passwordPlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? t('auth.creatingAccount') : t('auth.createAccount')}
          </Button>
        </form>
      </Form>
      
      <div className="text-center text-sm">
        <button 
          type="button" 
          onClick={switchToLogin}
          className="text-primary underline-offset-4 hover:underline"
        >
          {t('auth.haveAccount')}
        </button>
      </div>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {t('auth.orContinueWith')}
          </span>
        </div>
      </div>
      
      <GoogleLogin onSuccess={onSuccess} />
    </div>
  );
}
