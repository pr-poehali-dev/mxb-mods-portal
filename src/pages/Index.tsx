import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"

const Index = () => {
  const mods = {
    bike: [
      {
        id: 1,
        title: "Yamaha YZ450F 2024",
        description: "Реалистичная модель Yamaha YZ450F с детализированной физикой",
        downloads: 1542,
        rating: 4.8,
        image: "/img/5c250c11-5dcd-4474-84e8-88f5d87595e2.jpg"
      },
      {
        id: 2,
        title: "KTM 450 SX-F Racing",
        description: "Заводская модель KTM для профессиональных соревнований",
        downloads: 2156,
        rating: 4.9,
        image: "/img/5c250c11-5dcd-4474-84e8-88f5d87595e2.jpg"
      },
      {
        id: 3,
        title: "Honda CRF450R Custom",
        description: "Кастомная Honda с уникальным дизайном и настройками",
        downloads: 984,
        rating: 4.7,
        image: "/img/5c250c11-5dcd-4474-84e8-88f5d87595e2.jpg"
      }
    ],
    rider: [
      {
        id: 4,
        title: "Профессиональный райдер",
        description: "Модель райдера с профессиональной экипировкой",
        downloads: 856,
        rating: 4.6,
        image: "/img/5c250c11-5dcd-4474-84e8-88f5d87595e2.jpg"
      },
      {
        id: 5,
        title: "Кастом райдер #1",
        description: "Уникальный дизайн экипировки и шлема",
        downloads: 1203,
        rating: 4.8,
        image: "/img/5c250c11-5dcd-4474-84e8-88f5d87595e2.jpg"
      }
    ],
    track: [
      {
        id: 6,
        title: "Supercross Arena 2024",
        description: "Реплика арены суперкросса с реалистичными препятствиями",
        downloads: 3421,
        rating: 4.9,
        image: "/img/5c250c11-5dcd-4474-84e8-88f5d87595e2.jpg"
      },
      {
        id: 7,
        title: "Desert Trail",
        description: "Длинная трасса по пустыне с разнообразным рельефом",
        downloads: 2789,
        rating: 4.7,
        image: "/img/5c250c11-5dcd-4474-84e8-88f5d87595e2.jpg"
      }
    ]
  }

  const ModCard = ({ mod }: { mod: any }) => (
    <Card className="group hover:scale-105 transition-all duration-300 bg-card/80 backdrop-blur-sm border-orange/20 hover:border-orange/40">
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={mod.image} 
          alt={mod.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Badge className="absolute top-3 right-3 bg-orange text-white">
          <Icon name="Star" size={12} className="mr-1" />
          {mod.rating}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="font-orbitron text-lg text-foreground group-hover:text-orange transition-colors">
          {mod.title}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {mod.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Icon name="Download" size={16} className="mr-1" />
            {mod.downloads.toLocaleString()}
          </div>
        </div>
        <Button className="w-full bg-orange hover:bg-orange-600 text-white font-medium">
          СКАЧАТЬ МОД
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Bike" size={32} className="text-orange" />
            <h1 className="font-orbitron font-bold text-2xl bg-gradient-to-r from-orange to-blue bg-clip-text text-transparent">
              MX BIKES MODS
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="font-orbitron font-medium text-foreground hover:text-orange transition-colors">
              ГЛАВНАЯ
            </a>
            <a href="#bikes" className="font-orbitron font-medium text-foreground hover:text-orange transition-colors">
              BIKES
            </a>
            <a href="#riders" className="font-orbitron font-medium text-foreground hover:text-orange transition-colors">
              RIDERS
            </a>
            <a href="#tracks" className="font-orbitron font-medium text-foreground hover:text-orange transition-colors">
              TRACKS
            </a>
          </nav>

          <div className="flex items-center space-x-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-orange text-orange hover:bg-orange hover:text-white">
                  ВОЙТИ
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-orbitron">Вход в аккаунт</DialogTitle>
                  <DialogDescription>
                    Войдите в свой аккаунт или создайте новый
                  </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Вход</TabsTrigger>
                    <TabsTrigger value="register">Регистрация</TabsTrigger>
                  </TabsList>
                  <TabsContent value="login" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Пароль</Label>
                      <Input id="password" type="password" />
                    </div>
                    <Button className="w-full bg-orange hover:bg-orange-600">
                      ВОЙТИ
                    </Button>
                  </TabsContent>
                  <TabsContent value="register" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Имя пользователя</Label>
                      <Input id="username" placeholder="username" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-email">Email</Label>
                      <Input id="reg-email" type="email" placeholder="your@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-password">Пароль</Label>
                      <Input id="reg-password" type="password" />
                    </div>
                    <Button className="w-full bg-orange hover:bg-orange-600">
                      ЗАРЕГИСТРИРОВАТЬСЯ
                    </Button>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
            <Button className="bg-orange hover:bg-orange-600 text-white font-orbitron font-medium">
              ЗАГРУЗИТЬ МОД
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange/20 via-background to-blue/20" />
        <div className="absolute inset-0 bg-[url('https://cdn.poehali.dev/files/2301781c-3a41-4aea-96b0-50ddd5cc78b4.JPG')] bg-cover bg-center opacity-30" />
        
        <div className="relative z-10 text-center space-y-6 max-w-4xl mx-auto px-4">
          <h2 className="font-orbitron font-bold text-5xl md:text-7xl bg-gradient-to-r from-orange via-white to-blue bg-clip-text text-transparent">
            ЛУЧШИЕ МОДЫ
          </h2>
          <h3 className="font-orbitron font-bold text-3xl md:text-5xl text-foreground">
            ДЛЯ MX BIKES
          </h3>
          <p className="font-roboto text-xl text-muted-foreground max-w-2xl mx-auto">
            Скачивайте и делитесь лучшими модами для MX Bikes. Байки, райдеры, трассы — всё для идеального мотокросса!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button size="lg" className="bg-orange hover:bg-orange-600 text-white font-orbitron font-medium px-8 py-6 text-lg">
              <Icon name="Download" size={20} className="mr-2" />
              СКАЧАТЬ МОДЫ
            </Button>
            <Button size="lg" variant="outline" className="border-blue text-blue hover:bg-blue hover:text-white font-orbitron font-medium px-8 py-6 text-lg">
              <Icon name="Upload" size={20} className="mr-2" />
              ЗАГРУЗИТЬ МОД
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="font-orbitron font-bold text-3xl text-orange">1,247</div>
              <div className="font-roboto text-muted-foreground">МОДОВ</div>
            </div>
            <div className="text-center space-y-2">
              <div className="font-orbitron font-bold text-3xl text-blue">156K</div>
              <div className="font-roboto text-muted-foreground">СКАЧИВАНИЙ</div>
            </div>
            <div className="text-center space-y-2">
              <div className="font-orbitron font-bold text-3xl text-orange">2,341</div>
              <div className="font-roboto text-muted-foreground">ПОЛЬЗОВАТЕЛЕЙ</div>
            </div>
            <div className="text-center space-y-2">
              <div className="font-orbitron font-bold text-3xl text-blue">98%</div>
              <div className="font-roboto text-muted-foreground">РЕЙТИНГ</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bikes Section */}
      <section id="bikes" className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-orbitron font-bold text-4xl mb-4 bg-gradient-to-r from-orange to-orange-600 bg-clip-text text-transparent">
              BIKES
            </h2>
            <p className="font-roboto text-muted-foreground text-lg">
              Модели мотоциклов с реалистичной физикой и детализацией
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mods.bike.map((mod) => (
              <ModCard key={mod.id} mod={mod} />
            ))}
          </div>
        </div>
      </section>

      {/* Riders Section */}
      <section id="riders" className="py-16 bg-card/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-orbitron font-bold text-4xl mb-4 bg-gradient-to-r from-blue to-blue-600 bg-clip-text text-transparent">
              RIDERS
            </h2>
            <p className="font-roboto text-muted-foreground text-lg">
              Модели райдеров с уникальной экипировкой и стилем
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mods.rider.map((mod) => (
              <ModCard key={mod.id} mod={mod} />
            ))}
          </div>
        </div>
      </section>

      {/* Tracks Section */}
      <section id="tracks" className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-orbitron font-bold text-4xl mb-4 bg-gradient-to-r from-orange to-blue bg-clip-text text-transparent">
              TRACKS
            </h2>
            <p className="font-roboto text-muted-foreground text-lg">
              Реалистичные трассы для незабываемых гонок
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mods.track.map((mod) => (
              <ModCard key={mod.id} mod={mod} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Icon name="Bike" size={24} className="text-orange" />
                <span className="font-orbitron font-bold text-lg">MX BIKES MODS</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Лучшая платформа для модов MX Bikes
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-orbitron font-medium">КАТЕГОРИИ</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-orange transition-colors">Bikes</a></li>
                <li><a href="#" className="hover:text-orange transition-colors">Riders</a></li>
                <li><a href="#" className="hover:text-orange transition-colors">Tracks</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-orbitron font-medium">ПОДДЕРЖКА</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-orange transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-orange transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-orange transition-colors">Помощь</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-orbitron font-medium">СООБЩЕСТВО</h4>
              <div className="flex space-x-4">
                <Icon name="MessageCircle" size={20} className="text-muted-foreground hover:text-orange transition-colors cursor-pointer" />
                <Icon name="Users" size={20} className="text-muted-foreground hover:text-orange transition-colors cursor-pointer" />
                <Icon name="Globe" size={20} className="text-muted-foreground hover:text-orange transition-colors cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 MX Bikes Mods. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Index