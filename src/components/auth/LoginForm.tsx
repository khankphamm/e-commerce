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
import Cookies from 'js-cookie';
import axios from 'axios';

const loginSchema = (t: (key: string) => string) => z.object({
  email: z.string().email({ message: t('auth.emailError') }),
  password: z.string().min(3, { message: t('auth.passwordError') }),
});

type LoginFormValues = z.infer<ReturnType<typeof loginSchema>>;

interface LoginFormProps {
  onSuccess: () => void;
  switchToRegister: () => void;
}

export function LoginForm({ onSuccess, switchToRegister }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useLanguage();
  
  // Khởi tạo form với useForm hook
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema(t)),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    
    try {
      // Call your login API using axios
      const response = await axios.post('http://26.233.64.87:8080/api/login', data);
      const userData = response.data;
      
      // Store user data in cookies
      Cookies.set('user', JSON.stringify(userData), { expires: 7 }); // Expires in 7 days
      
      // Login the user using our AuthContext
      login(userData);
      
      toast({
        title: t('auth.login'),
        description: t('auth.loginSuccess'),
      });
      
      onSuccess();
      
      // Redirect based on user role
      if (userData.role === 1 ) {
        navigate("/admin");
      } else {
        navigate("/account");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: t('auth.login'),
        description: error.response?.data?.message || t('auth.loginError'),
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
            {isLoading ? t('auth.loggingIn') : t('auth.login')}
          </Button>
        </form>
      </Form>
      
      <div className="text-center text-sm">
        <button 
          type="button" 
          onClick={switchToRegister}
          className="text-primary underline-offset-4 hover:underline"
        >
          {t('auth.noAccount')}
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
