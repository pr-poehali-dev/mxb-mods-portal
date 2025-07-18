import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import ModCard from "@/components/ModCard";
import AuthModal from "@/components/AuthModal";
import { Link } from "react-router-dom";

const sampleMods = [
  {
    id: "1",
    title: "KTM 450 SX-F 2024",
    author: "MXRider_Pro",
    authorId: "author1",
    category: "Байки",
    downloads: 1547,
    rating: 4.8,
    image: "/img/2e3842b6-a225-483a-bba0-e39a3cfd209a.jpg",
    description: "Полностью детализированный KTM 450 SX-F 2024 с реалистичной физикой и звуком двигателя",
    fileSize: "25.6 MB",
    isNew: true,
    isPremium: false,
    price: 299,
    modType: "paid" as const
  },
  {
    id: "2",
    title: "Pro Racing Gear Pack",
    author: "GearMaster",
    authorId: "author2",
    category: "Экипировка",
    downloads: 892,
    rating: 4.6,
    image: "/img/faf1c4aa-cac8-48f3-8385-510386a8ab8e.jpg",
    description: "Набор профессиональной экипировки с реальными брендами и кастомизацией",
    fileSize: "18.2 MB",
    isNew: false,
    isPremium: true,
    price: 150,
    modType: "donation" as const
  },
  {
    id: "3",
    title: "Supercross Arena 2024",
    author: "TrackBuilder",
    authorId: "author3",
    category: "Трассы",
    downloads: 2341,
    rating: 4.9,
    image: "/img/ce82c04b-ecd6-4800-bd22-28329f38fb34.jpg",
    description: "Официальная арена супермотокросса с реалистичными препятствиями и атмосферой",
    fileSize: "45.8 MB",
    isNew: true,
    isPremium: false,
    price: 0,
    modType: "free" as const
  },
  {
    id: 4,
    title: "Yamaha YZ450F Factory",
    author: "YamahaFan",
    category: "Байки",
    downloads: 1823,
    rating: 4.7,
    image: "/img/2e3842b6-a225-483a-bba0-e39a3cfd209a.jpg",
    description: "Заводская модель Yamaha YZ450F с оригинальными настройками",
    fileSize: "22.4 MB",
    isNew: false,
    isPremium: false
  },
  {
    id: 5,
    title: "Desert Canyon Track",
    author: "DesertRider",
    category: "Трассы",
    downloads: 1456,
    rating: 4.5,
    image: "/img/ce82c04b-ecd6-4800-bd22-28329f38fb34.jpg",
    description: "Трасса в каньоне с техническими участками и живописными видами",
    fileSize: "38.1 MB",
    isNew: false,
    isPremium: false
  },
  {
    id: 6,
    title: "Elite Rider Suit",
    author: "StyleMaster",
    category: "Экипировка",
    downloads: 734,
    rating: 4.8,
    image: "/img/faf1c4aa-cac8-48f3-8385-510386a8ab8e.jpg",
    description: "Эксклюзивная экипировка с металлическими элементами и LED подсветкой",
    fileSize: "15.7 MB",
    isNew: true,
    isPremium: true
  }
];

const Index = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("popular");

  const filteredMods = sampleMods.filter(mod => {
    const matchesSearch = mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mod.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || mod.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedMods = [...filteredMods].sort((a, b) => {
    switch (selectedSort) {
      case "popular":
        return b.downloads - a.downloads;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.id - a.id;
      default:
        return 0;
    }
  });



  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="font-orbitron font-bold text-2xl bg-gradient-to-r from-orange to-blue bg-clip-text text-transparent">
                MXB SHOP RUSSIA
              </h1>
              <Badge variant="secondary" className="bg-orange/20 text-orange">
                Beta
              </Badge>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="font-orbitron text-sm hover:text-orange transition-colors">
                Главная
              </Link>
              <Link to="/upload" className="font-orbitron text-sm hover:text-orange transition-colors">
                Загрузить
              </Link>
              <Link to="/profile" className="font-orbitron text-sm hover:text-orange transition-colors">
                Профиль
              </Link>
              <Link to="/payment-instructions" className="font-orbitron text-sm hover:text-orange transition-colors">
                💳 Пополнение
              </Link>
              <Link to="/admin" className="font-orbitron text-sm hover:text-orange transition-colors">
                Админ
              </Link>
            </nav>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAuthModalOpen(true)}
                className="font-orbitron"
              >
                <Icon name="LogIn" size={16} className="mr-2" />
                Вход
              </Button>
              <Button
                className="bg-orange hover:bg-orange-600 text-white font-orbitron font-medium"
                size="sm"
                onClick={() => window.location.href = '/upload'}
              >
                <Icon name="Upload" size={16} className="mr-2" />
                Загрузить мод
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange/10 via-background to-blue/10" />
        <div className="absolute inset-0 bg-[url('https://cdn.poehali.dev/files/2301781c-3a41-4aea-96b0-50ddd5cc78b4.JPG')] bg-cover bg-center opacity-20" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="font-orbitron font-bold text-5xl md:text-6xl mb-6 bg-gradient-to-r from-orange via-white to-blue bg-clip-text text-transparent">
            ЛУЧШИЕ МОДЫ ДЛЯ MX BIKES
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Скачивайте и делитесь лучшими модами: байки, экипировка, трассы и многое другое
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button
              size="lg"
              className="bg-orange hover:bg-orange-600 text-white font-orbitron font-medium"
            >
              <Icon name="Download" size={20} className="mr-2" />
              Скачать моды
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue text-blue hover:bg-blue hover:text-white font-orbitron font-medium"
              onClick={() => window.location.href = '/upload'}
            >
              <Icon name="Upload" size={20} className="mr-2" />
              Загрузить мод
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-orbitron font-bold text-orange mb-2">2,547</div>
              <div className="text-sm text-muted-foreground">Всего модов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-orbitron font-bold text-blue mb-2">89,231</div>
              <div className="text-sm text-muted-foreground">Скачиваний</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-orbitron font-bold text-orange mb-2">1,204</div>
              <div className="text-sm text-muted-foreground">Создателей</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-orbitron font-bold text-blue mb-2">4.8</div>
              <div className="text-sm text-muted-foreground">Средний рейтинг</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <Input
                placeholder="Поиск модов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все категории</SelectItem>
                  <SelectItem value="Байки">Байки</SelectItem>
                  <SelectItem value="Экипировка">Экипировка</SelectItem>
                  <SelectItem value="Трассы">Трассы</SelectItem>
                  <SelectItem value="Звуки">Звуки</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-4">
              <Select value={selectedSort} onValueChange={setSelectedSort}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Сортировка" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Популярные</SelectItem>
                  <SelectItem value="rating">По рейтингу</SelectItem>
                  <SelectItem value="newest">Новые</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>Найдено: {sortedMods.length}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mods Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedMods.map((mod) => (
              <ModCard 
                key={mod.id} 
                id={mod.id}
                title={mod.title}
                author={mod.author}
                authorId={mod.authorId}
                category={mod.category}
                downloads={mod.downloads}
                rating={mod.rating}
                image={mod.image}
                description={mod.description}
                fileSize={mod.fileSize}
                isNew={mod.isNew}
                isPremium={mod.isPremium}
                price={mod.price}
                modType={mod.modType}
              />
            ))}
          </div>
          
          {sortedMods.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-orbitron font-bold text-xl mb-2">Моды не найдены</h3>
              <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-orbitron font-bold text-lg mb-4">MX BIKES MODS</h3>
              <p className="text-sm text-muted-foreground">
                Лучшая платформа для модов MX Bikes. Скачивайте, создавайте и делитесь контентом.
              </p>
            </div>
            <div>
              <h4 className="font-orbitron font-semibold mb-4">Категории</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-orange">Байки</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-orange">Экипировка</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-orange">Трассы</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-orange">Звуки</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-orbitron font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-orange">Помощь</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-orange">FAQ</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-orange">Контакты</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-orange">Обратная связь</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-orbitron font-semibold mb-4">Сообщество</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-orange">Discord</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-orange">Reddit</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-orange">YouTube</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-orange">Twitter</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 MX BIKES MODS. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  );
}

export default Index;