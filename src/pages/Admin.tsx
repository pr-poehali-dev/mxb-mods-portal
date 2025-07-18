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
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  username: string;
  email: string;
  balance: number;
  role: 'admin' | 'user';
  status: 'active' | 'banned' | 'pending';
  joinDate: string;
  totalDownloads: number;
  totalUploads: number;
}

interface ModItem {
  id: string;
  title: string;
  author: string;
  category: string;
  downloads: number;
  earnings: number;
  status: 'active' | 'pending' | 'rejected';
  uploadDate: string;
}

export default function Admin() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedMod, setSelectedMod] = useState<ModItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const users: User[] = [
    {
      id: '1',
      username: 'admin',
      email: 'admin@mxbikes.com',
      balance: 1500.00,
      role: 'admin',
      status: 'active',
      joinDate: '2023-01-15',
      totalDownloads: 234,
      totalUploads: 18
    },
    {
      id: '2',
      username: 'MXRider_Pro',
      email: 'rider@example.com',
      balance: 850.50,
      role: 'user',
      status: 'active',
      joinDate: '2023-03-22',
      totalDownloads: 156,
      totalUploads: 8
    },
    {
      id: '3',
      username: 'TrackBuilder',
      email: 'builder@example.com',
      balance: 2100.00,
      role: 'user',
      status: 'active',
      joinDate: '2023-02-10',
      totalDownloads: 89,
      totalUploads: 25
    }
  ];

  const mods: ModItem[] = [
    {
      id: '1',
      title: 'KTM 450 SX-F 2024',
      author: 'MXRider_Pro',
      category: 'Байки',
      downloads: 1547,
      earnings: 773.50,
      status: 'active',
      uploadDate: '2024-01-10'
    },
    {
      id: '2',
      title: 'Pro Racing Gear Pack',
      author: 'GearMaster',
      category: 'Экипировка',
      downloads: 892,
      earnings: 446.00,
      status: 'pending',
      uploadDate: '2024-01-18'
    },
    {
      id: '3',
      title: 'Supercross Arena 2024',
      author: 'TrackBuilder',
      category: 'Трассы',
      downloads: 2341,
      earnings: 1170.50,
      status: 'active',
      uploadDate: '2024-01-05'
    }
  ];

  const systemStats = {
    totalUsers: 1204,
    totalMods: 2547,
    totalDownloads: 89231,
    totalEarnings: 45678.90,
    pendingMods: 23,
    reportedMods: 7,
    bannedUsers: 12,
    activeUsers: 1192
  };

  const handleUserAction = (userId: string, action: string) => {
    toast({
      title: "Действие выполнено",
      description: `Пользователь ${action === 'ban' ? 'заблокирован' : action === 'unban' ? 'разблокирован' : 'обновлен'}`,
    });
  };

  const handleModAction = (modId: string, action: string) => {
    toast({
      title: "Действие выполнено",
      description: `Мод ${action === 'approve' ? 'одобрен' : action === 'reject' ? 'отклонен' : 'удален'}`,
    });
  };

  const handleBalanceUpdate = (userId: string, amount: number) => {
    toast({
      title: "Баланс обновлен",
      description: `Баланс пользователя изменен на ${amount} ₽`,
    });
  };

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
              <h1 className="font-orbitron font-bold text-2xl bg-gradient-to-r from-red-400 to-orange bg-clip-text text-transparent">
                Админ-панель
              </h1>
            </div>
            <Badge className="bg-red-500/20 text-red-400">
              <Icon name="Shield" size={14} className="mr-1" />
              Полный доступ
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card/80 backdrop-blur border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <Icon name="Users" size={16} className="mr-2 text-blue-400" />
                Пользователи
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-orbitron font-bold text-blue-400">
                {systemStats.totalUsers.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Активных: {systemStats.activeUsers}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <Icon name="Package" size={16} className="mr-2 text-green-400" />
                Моды
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-orbitron font-bold text-green-400">
                {systemStats.totalMods.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                На модерации: {systemStats.pendingMods}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <Icon name="Download" size={16} className="mr-2 text-purple-400" />
                Скачивания
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-orbitron font-bold text-purple-400">
                {systemStats.totalDownloads.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Всего загрузок
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center">
                <Icon name="DollarSign" size={16} className="mr-2 text-yellow-400" />
                Доходы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-orbitron font-bold text-yellow-400">
                {systemStats.totalEarnings.toLocaleString()} ₽
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Общий доход
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">Пользователи</TabsTrigger>
            <TabsTrigger value="mods">Моды</TabsTrigger>
            <TabsTrigger value="payments">Платежи</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="mt-6">
            <Card className="bg-card/80 backdrop-blur border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-orbitron">Управление пользователями</CardTitle>
                    <CardDescription>Просмотр и управление учетными записями</CardDescription>
                  </div>
                  <Input 
                    placeholder="Поиск пользователей..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Пользователь</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Баланс</TableHead>
                      <TableHead>Роль</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} />
                              <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.username}</div>
                              <div className="text-sm text-muted-foreground">
                                {user.totalUploads} модов
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell className="font-orbitron">{user.balance.toFixed(2)} ₽</TableCell>
                        <TableCell>
                          <Badge variant={user.role === 'admin' ? 'destructive' : 'secondary'}>
                            {user.role === 'admin' ? 'Админ' : 'Пользователь'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                            {user.status === 'active' ? 'Активен' : 'Заблокирован'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                                  <Icon name="Edit" size={14} className="mr-1" />
                                  Изменить
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Редактирование пользователя</DialogTitle>
                                  <DialogDescription>
                                    Изменение данных пользователя {user.username}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <Label>Баланс</Label>
                                    <Input 
                                      type="number" 
                                      defaultValue={user.balance}
                                      onChange={(e) => handleBalanceUpdate(user.id, parseFloat(e.target.value))}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Роль</Label>
                                    <Select defaultValue={user.role}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="user">Пользователь</SelectItem>
                                        <SelectItem value="admin">Администратор</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="flex space-x-2">
                                    <Button 
                                      variant="destructive" 
                                      size="sm"
                                      onClick={() => handleUserAction(user.id, 'ban')}
                                    >
                                      Заблокировать
                                    </Button>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => handleUserAction(user.id, 'unban')}
                                    >
                                      Разблокировать
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mods" className="mt-6">
            <Card className="bg-card/80 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="font-orbitron">Управление модами</CardTitle>
                <CardDescription>Модерация и управление загруженными модами</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Мод</TableHead>
                      <TableHead>Автор</TableHead>
                      <TableHead>Категория</TableHead>
                      <TableHead>Скачивания</TableHead>
                      <TableHead>Доходы</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mods.map((mod) => (
                      <TableRow key={mod.id}>
                        <TableCell>
                          <div className="font-medium">{mod.title}</div>
                          <div className="text-sm text-muted-foreground">{mod.uploadDate}</div>
                        </TableCell>
                        <TableCell>{mod.author}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{mod.category}</Badge>
                        </TableCell>
                        <TableCell>{mod.downloads.toLocaleString()}</TableCell>
                        <TableCell className="font-orbitron">{mod.earnings.toFixed(2)} ₽</TableCell>
                        <TableCell>
                          <Badge variant={
                            mod.status === 'active' ? 'default' :
                            mod.status === 'pending' ? 'secondary' : 'destructive'
                          }>
                            {mod.status === 'active' ? 'Активен' : 
                             mod.status === 'pending' ? 'На модерации' : 'Отклонен'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {mod.status === 'pending' && (
                              <>
                                <Button 
                                  variant="default" 
                                  size="sm"
                                  onClick={() => handleModAction(mod.id, 'approve')}
                                >
                                  <Icon name="Check" size={14} className="mr-1" />
                                  Одобрить
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => handleModAction(mod.id, 'reject')}
                                >
                                  <Icon name="X" size={14} className="mr-1" />
                                  Отклонить
                                </Button>
                              </>
                            )}
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleModAction(mod.id, 'delete')}
                            >
                              <Icon name="Trash2" size={14} className="mr-1" />
                              Удалить
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="mt-6">
            <Card className="bg-card/80 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="font-orbitron">Управление платежами</CardTitle>
                <CardDescription>Транзакции и выплаты</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Icon name="CreditCard" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-orbitron font-bold text-xl mb-2">Платежная система</h3>
                  <p className="text-muted-foreground">Управление транзакциями и выплатами авторам</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card className="bg-card/80 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="font-orbitron">Настройки системы</CardTitle>
                <CardDescription>Общие настройки платформы</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Комиссия платформы (%)</Label>
                    <Input type="number" defaultValue="30" />
                  </div>
                  <div className="space-y-2">
                    <Label>Минимальная сумма вывода</Label>
                    <Input type="number" defaultValue="1000" />
                  </div>
                  <div className="space-y-2">
                    <Label>Сообщение дня</Label>
                    <Textarea placeholder="Добро пожаловать на лучшую платформу модов MX Bikes!" />
                  </div>
                  <Button className="bg-orange hover:bg-orange-600">
                    Сохранить настройки
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}