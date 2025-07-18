import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { mockUser, updateBalance } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const [user, setUser] = useState(mockUser);
  const [topupAmount, setTopupAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleTopup = async () => {
    if (!topupAmount || !paymentMethod) {
      toast({
        title: "Ошибка",
        description: "Выберите сумму и способ оплаты",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Симуляция обработки платежа
    setTimeout(() => {
      const amount = parseFloat(topupAmount);
      updateBalance(amount);
      setUser(prev => ({
        ...prev,
        balance: prev.balance + amount
      }));
      
      toast({
        title: "Успех!",
        description: `Баланс пополнен на ${amount} ₽`,
      });
      
      setTopupAmount("");
      setPaymentMethod("");
      setIsProcessing(false);
    }, 2000);
  };

  const recentTransactions = [
    { id: 1, type: "topup", amount: 500, date: "2024-01-15", description: "Пополнение через карту" },
    { id: 2, type: "purchase", amount: -50, date: "2024-01-14", description: "Покупка премиум мода" },
    { id: 3, type: "earning", amount: 150, date: "2024-01-13", description: "Продажа мода KTM 450" },
    { id: 4, type: "topup", amount: 1000, date: "2024-01-10", description: "Пополнение через PayPal" }
  ];

  const userMods = [
    { id: 1, title: "KTM 450 SX-F Pro", downloads: 1547, earnings: 773.50, status: "active" },
    { id: 2, title: "Racing Gear Pack", downloads: 892, earnings: 446.00, status: "active" },
    { id: 3, title: "Desert Track V2", downloads: 2341, earnings: 1170.50, status: "pending" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => window.history.back()}>
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Назад
              </Button>
              <h1 className="font-orbitron font-bold text-2xl bg-gradient-to-r from-orange to-blue bg-clip-text text-transparent">
                Профиль
              </h1>
            </div>
            {user.role === 'admin' && (
              <Badge className="bg-red-500/20 text-red-400">
                <Icon name="Shield" size={14} className="mr-1" />
                Администратор
              </Badge>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card className="bg-card/80 backdrop-blur border-border/50">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={user.avatar} alt={user.username} />
                  <AvatarFallback className="text-2xl font-orbitron">
                    {user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="font-orbitron text-xl">{user.username}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
                <div className="flex justify-center gap-2 mt-2">
                  {user.premium && (
                    <Badge className="bg-yellow-500/20 text-yellow-400">
                      <Icon name="Crown" size={12} className="mr-1" />
                      Premium
                    </Badge>
                  )}
                  <Badge variant="secondary">
                    {user.role === 'admin' ? 'Администратор' : 'Пользователь'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Дата регистрации</span>
                    <span className="text-sm font-medium">
                      {user.joinDate.toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Скачиваний</span>
                    <span className="text-sm font-medium">{user.totalDownloads}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Загружено модов</span>
                    <span className="text-sm font-medium">{user.totalUploads}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Balance Card */}
            <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="font-orbitron text-lg flex items-center">
                  <Icon name="Wallet" size={20} className="mr-2 text-green-500" />
                  Баланс
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-orbitron font-bold text-green-500 mb-4">
                  {user.balance.toFixed(2)} ₽
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      <Icon name="Plus" size={16} className="mr-2" />
                      Пополнить баланс
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="font-orbitron">Пополнение баланса</DialogTitle>
                      <DialogDescription>
                        Выберите сумму и способ оплаты
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Сумма пополнения</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="1000"
                          value={topupAmount}
                          onChange={(e) => setTopupAmount(e.target.value)}
                        />
                        <div className="flex gap-2">
                          {[500, 1000, 2000, 5000].map(amount => (
                            <Button
                              key={amount}
                              variant="outline"
                              size="sm"
                              onClick={() => setTopupAmount(amount.toString())}
                            >
                              {amount} ₽
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="payment">Способ оплаты</Label>
                        <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите способ оплаты" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="card">Банковская карта</SelectItem>
                            <SelectItem value="paypal">PayPal</SelectItem>
                            <SelectItem value="crypto">Криптовалюта</SelectItem>
                            <SelectItem value="qiwi">QIWI</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        onClick={handleTopup}
                        className="w-full bg-green-600 hover:bg-green-700"
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                            Обработка...
                          </>
                        ) : (
                          <>
                            <Icon name="CreditCard" size={16} className="mr-2" />
                            Пополнить на {topupAmount} ₽
                          </>
                        )}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="transactions" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="transactions">Транзакции</TabsTrigger>
                <TabsTrigger value="mods">Мои моды</TabsTrigger>
                <TabsTrigger value="settings">Настройки</TabsTrigger>
              </TabsList>
              
              <TabsContent value="transactions" className="mt-6">
                <Card className="bg-card/80 backdrop-blur border-border/50">
                  <CardHeader>
                    <CardTitle className="font-orbitron">История транзакций</CardTitle>
                    <CardDescription>
                      Последние операции с вашим балансом
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentTransactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className={`p-2 rounded-full ${
                              transaction.type === 'topup' ? 'bg-green-500/20' :
                              transaction.type === 'purchase' ? 'bg-red-500/20' :
                              'bg-blue-500/20'
                            }`}>
                              <Icon 
                                name={
                                  transaction.type === 'topup' ? 'ArrowUp' :
                                  transaction.type === 'purchase' ? 'ArrowDown' :
                                  'DollarSign'
                                } 
                                size={16} 
                                className={
                                  transaction.type === 'topup' ? 'text-green-400' :
                                  transaction.type === 'purchase' ? 'text-red-400' :
                                  'text-blue-400'
                                }
                              />
                            </div>
                            <div>
                              <p className="font-medium">{transaction.description}</p>
                              <p className="text-sm text-muted-foreground">{transaction.date}</p>
                            </div>
                          </div>
                          <div className={`font-orbitron font-bold ${
                            transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {transaction.amount > 0 ? '+' : ''}{transaction.amount} ₽
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="mods" className="mt-6">
                <Card className="bg-card/80 backdrop-blur border-border/50">
                  <CardHeader>
                    <CardTitle className="font-orbitron">Мои моды</CardTitle>
                    <CardDescription>
                      Управление вашими загруженными модами
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userMods.map((mod) => (
                        <div key={mod.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                          <div>
                            <h3 className="font-orbitron font-medium">{mod.title}</h3>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center">
                                <Icon name="Download" size={14} className="mr-1" />
                                {mod.downloads}
                              </span>
                              <span className="flex items-center">
                                <Icon name="DollarSign" size={14} className="mr-1" />
                                {mod.earnings} ₽
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={mod.status === 'active' ? 'default' : 'secondary'}>
                              {mod.status === 'active' ? 'Активен' : 'На модерации'}
                            </Badge>
                            <Button variant="outline" size="sm">
                              <Icon name="Edit" size={14} className="mr-1" />
                              Редактировать
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings" className="mt-6">
                <Card className="bg-card/80 backdrop-blur border-border/50">
                  <CardHeader>
                    <CardTitle className="font-orbitron">Настройки профиля</CardTitle>
                    <CardDescription>
                      Управление настройками аккаунта
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="username">Имя пользователя</Label>
                        <Input id="username" value={user.username} readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={user.email} readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Изменить пароль</Label>
                        <Input id="password" type="password" placeholder="••••••••" />
                      </div>
                      <Button className="bg-orange hover:bg-orange-600">
                        Сохранить изменения
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}