import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import { sanitizeInput, isValidInput, isStrongPassword, rateLimiter, generateCSRFToken } from "@/utils/security";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [csrfToken] = useState(generateCSRFToken());

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    // Проверка безопасности
    if (!email || !password) {
      alert('Заполните все поля');
      return;
    }
    
    if (!isValidInput(email) || !isValidInput(password)) {
      alert('Обнаружены подозрительные символы в данных');
      return;
    }
    
    if (!rateLimiter.isAllowed('user-ip')) {
      alert('Слишком много попыток входа. Попробуйте через 15 минут');
      return;
    }
    
    setIsLoading(true);
    setLoginAttempts(prev => prev + 1);
    
    // Имитация авторизации
    setTimeout(() => {
      setIsLoading(false);
      onOpenChange(false);
      // Перенаправляем на профиль после входа
      window.location.href = '/profile';
    }, 2000);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    
    // Проверка безопасности
    if (!email || !password || !confirmPassword) {
      alert('Заполните все поля');
      return;
    }
    
    if (!isValidInput(email) || !isValidInput(password)) {
      alert('Обнаружены подозрительные символы в данных');
      return;
    }
    
    if (!isStrongPassword(password)) {
      alert('Пароль должен содержать минимум 8 символов, включая заглавные и строчные буквы, цифры и специальные символы');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }
    
    setIsLoading(true);
    
    // Имитация регистрации
    setTimeout(() => {
      setIsLoading(false);
      onOpenChange(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur border-border/50">
        <DialogHeader className="text-center space-y-2">
          <DialogTitle className="font-orbitron font-bold text-2xl bg-gradient-to-r from-orange to-blue bg-clip-text text-transparent">
            MXB SHOP RUSSIA
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Войдите в свой аккаунт или создайте новый для загрузки модов
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50">
            <TabsTrigger value="login" className="font-orbitron">Вход</TabsTrigger>
            <TabsTrigger value="register" className="font-orbitron">Регистрация</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-4 mt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-orbitron">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your@email.com"
                  className="bg-background/50 border-border/50 focus:border-orange"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="font-orbitron">Пароль</Label>
                <Input 
                  id="password" 
                  type="password"
                  className="bg-background/50 border-border/50 focus:border-orange"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm text-muted-foreground">
                  Запомнить меня
                </Label>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-orange hover:bg-orange-600 text-white font-orbitron font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                    ВХОД...
                  </>
                ) : (
                  <>
                    <Icon name="LogIn" size={16} className="mr-2" />
                    ВОЙТИ
                  </>
                )}
              </Button>
              <Button 
                type="button" 
                variant="link" 
                className="w-full text-blue hover:text-blue-600"
              >
                Забыли пароль?
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="register" className="space-y-4 mt-6">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="font-orbitron">Имя пользователя</Label>
                <Input 
                  id="username" 
                  placeholder="username"
                  className="bg-background/50 border-border/50 focus:border-orange"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email" className="font-orbitron">Email</Label>
                <Input 
                  id="reg-email" 
                  type="email" 
                  placeholder="your@email.com"
                  className="bg-background/50 border-border/50 focus:border-orange"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-password" className="font-orbitron">Пароль</Label>
                <Input 
                  id="reg-password" 
                  type="password"
                  className="bg-background/50 border-border/50 focus:border-orange"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="font-orbitron">Подтвердите пароль</Label>
                <Input 
                  id="confirm-password" 
                  type="password"
                  className="bg-background/50 border-border/50 focus:border-orange"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-sm text-muted-foreground">
                  Я согласен с условиями использования
                </Label>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-blue hover:bg-blue-600 text-white font-orbitron font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                    РЕГИСТРАЦИЯ...
                  </>
                ) : (
                  <>
                    <Icon name="UserPlus" size={16} className="mr-2" />
                    ЗАРЕГИСТРИРОВАТЬСЯ
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}