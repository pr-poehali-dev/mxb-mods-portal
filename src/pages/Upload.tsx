import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import { sanitizeInput, isValidInput, isValidFileUpload, sanitizeFormData } from "@/utils/security";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [modType, setModType] = useState("free"); // free, paid, donation
  const [modPrice, setModPrice] = useState("");
  const [minDonation, setMinDonation] = useState("50");
  const [allowReviews, setAllowReviews] = useState(true);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handlePreviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setPreview(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверка безопасности данных
    if (!title || !description || !category || !file || !preview || !agreeTerms) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля и согласитесь с условиями",
        variant: "destructive",
      });
      return;
    }

    // Валидация входных данных
    if (!isValidInput(title) || !isValidInput(description) || !isValidInput(tags)) {
      toast({
        title: "Ошибка безопасности",
        description: "Обнаружены подозрительные символы в данных",
        variant: "destructive",
      });
      return;
    }

    // Проверка файла
    if (!isValidFileUpload(file)) {
      toast({
        title: "Ошибка файла",
        description: "Недопустимый тип файла или размер превышает 100MB",
        variant: "destructive",
      });
      return;
    }

    // Очистка данных
    const cleanData = sanitizeFormData({
      title,
      description,
      tags,
      category,
      modPrice: parseFloat(modPrice) || 0,
      minDonation
    });

    setIsUploading(true);
    setUploadProgress(0);

    // Симуляция загрузки
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast({
            title: "Успех!",
            description: "Мод успешно загружен и отправлен на модерацию",
          });
          // Сброс формы
          setTitle("");
          setDescription("");
          setCategory("");
          setTags("");
          setFile(null);
          setPreview(null);
          setAgreeTerms(false);
          setModType("free");
          setModPrice("");
          setMinDonation("50");
          setAllowReviews(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
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
              <h1 className="font-orbitron font-bold text-2xl bg-gradient-to-r from-orange to-blue bg-clip-text text-transparent">
                Загрузка мода
              </h1>
            </div>
            <Button variant="outline" size="sm" onClick={() => window.location.href = '/'}>
              <Icon name="Home" size={16} className="mr-2" />
              На главную
            </Button>
            <Badge className="bg-blue/20 text-blue">
              Загрузка мода
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-card/80 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="font-orbitron text-xl">Загрузить новый мод</CardTitle>
              <CardDescription>
                Поделитесь своим творением с сообществом MX Bikes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Основная информация */}
                <div className="space-y-4">
                  <h3 className="font-orbitron font-semibold text-lg">Основная информация</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Название мода *</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Например: KTM 450 SX-F 2024"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Категория *</Label>
                      <Select value={category} onValueChange={setCategory} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bikes">Байки</SelectItem>
                          <SelectItem value="gear">Экипировка</SelectItem>
                          <SelectItem value="tracks">Трассы</SelectItem>
                          <SelectItem value="sounds">Звуки</SelectItem>
                          <SelectItem value="other">Другое</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Описание мода *</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Подробное описание вашего мода, особенности, инструкции по установке..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Теги (через запятую)</Label>
                    <Input
                      id="tags"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="ktm, 450, 2024, racing, professional"
                    />
                  </div>
                </div>

                {/* Файлы */}
                <div className="space-y-4">
                  <h3 className="font-orbitron font-semibold text-lg">Файлы</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="file">Файл мода (.zip, .rar) *</Label>
                      <div className="border-2 border-dashed border-border/50 rounded-lg p-4 text-center hover:border-orange/50 transition-colors">
                        <input
                          id="file"
                          type="file"
                          accept=".zip,.rar"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('file')?.click()}
                          className="w-full"
                        >
                          <Icon name="Upload" size={16} className="mr-2" />
                          {file ? file.name : "Выбрать файл"}
                        </Button>
                        {file && (
                          <div className="mt-2 text-sm text-muted-foreground">
                            Размер: {(file.size / 1024 / 1024).toFixed(1)} MB
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preview">Превью изображение *</Label>
                      <div className="border-2 border-dashed border-border/50 rounded-lg p-4 text-center hover:border-orange/50 transition-colors">
                        <input
                          id="preview"
                          type="file"
                          accept="image/*"
                          onChange={handlePreviewChange}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('preview')?.click()}
                          className="w-full"
                        >
                          <Icon name="Image" size={16} className="mr-2" />
                          {preview ? preview.name : "Выбрать изображение"}
                        </Button>
                        {preview && (
                          <div className="mt-2 text-sm text-muted-foreground">
                            {preview.type} - {(preview.size / 1024).toFixed(1)} KB
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Монетизация */}
                <div className="space-y-4">
                  <h3 className="font-orbitron font-semibold text-lg">Монетизация</h3>
                  
                  <Tabs value={modType} onValueChange={setModType}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="free">Бесплатно</TabsTrigger>
                      <TabsTrigger value="paid">Платно</TabsTrigger>
                      <TabsTrigger value="donation">Донаты</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="free" className="space-y-3">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Icon name="Heart" size={16} className="text-green-600" />
                          <span className="font-medium text-green-800">Бесплатный мод</span>
                        </div>
                        <p className="text-sm text-green-700">
                          Мод будет доступен для скачивания всем пользователям бесплатно.
                          Вы получите репутацию в сообществе и обратную связь от игроков.
                        </p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="paid" className="space-y-3">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Icon name="DollarSign" size={16} className="text-blue-600" />
                          <span className="font-medium text-blue-800">Платный мод</span>
                        </div>
                        <p className="text-sm text-blue-700 mb-3">
                          Пользователи смогут скачать мод только после оплаты.
                          Вы получите 90% от стоимости, 10% — комиссия платформы.
                        </p>
                        <div className="space-y-2">
                          <Label htmlFor="price">Цена мода (₽)</Label>
                          <Input
                            id="price"
                            type="number"
                            min="50"
                            max="5000"
                            value={modPrice}
                            onChange={(e) => setModPrice(e.target.value)}
                            placeholder="199"
                          />
                          <p className="text-xs text-blue-600">
                            Минимальная цена: 50 ₽ • Максимальная цена: 5000 ₽
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="donation" className="space-y-3">
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Icon name="Gift" size={16} className="text-purple-600" />
                          <span className="font-medium text-purple-800">Донаты</span>
                        </div>
                        <p className="text-sm text-purple-700 mb-3">
                          Мод бесплатен, но пользователи могут поддержать вас донатом.
                          Вы получите 90% от суммы доната, 10% — комиссия платформы.
                        </p>
                        <div className="space-y-2">
                          <Label htmlFor="minDonation">Минимальная сумма доната (₽)</Label>
                          <Select value={minDonation} onValueChange={setMinDonation}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="50">50 ₽</SelectItem>
                              <SelectItem value="100">100 ₽</SelectItem>
                              <SelectItem value="200">200 ₽</SelectItem>
                              <SelectItem value="500">500 ₽</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Отзывы и рейтинг */}
                <div className="space-y-4">
                  <h3 className="font-orbitron font-semibold text-lg">Отзывы и рейтинг</h3>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-3">
                      <Checkbox 
                        id="reviews" 
                        checked={allowReviews}
                        onCheckedChange={setAllowReviews}
                      />
                      <Label htmlFor="reviews" className="font-medium">
                        Разрешить отзывы и рейтинг
                      </Label>
                    </div>
                    
                    {allowReviews && (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Icon name="MessageSquare" size={16} className="text-blue-500" />
                          <span className="text-sm">Пользователи смогут оставлять отзывы</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="Star" size={16} className="text-yellow-500" />
                          <span className="text-sm">Пользователи смогут оценивать мод от 1 до 5 звёзд</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="TrendingUp" size={16} className="text-green-500" />
                          <span className="text-sm">Рейтинг влияет на позицию в поиске</span>
                        </div>
                      </div>
                    )}
                    
                    {!allowReviews && (
                      <div className="text-sm text-muted-foreground">
                        Отзывы будут отключены. Пользователи не смогут оставлять комментарии и оценки.
                      </div>
                    )}
                  </div>
                </div>

                {/* Правила и условия */}
                <div className="space-y-4">
                  <h3 className="font-orbitron font-semibold text-lg">Правила публикации</h3>
                  
                  <div className="bg-muted/30 p-4 rounded-lg space-y-2">
                    <div className="flex items-start space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-green-500 mt-0.5" />
                      <span className="text-sm">Убедитесь, что мод работает корректно</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-green-500 mt-0.5" />
                      <span className="text-sm">Не нарушайте авторские права</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-green-500 mt-0.5" />
                      <span className="text-sm">Добавьте подробное описание и инструкции</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-green-500 mt-0.5" />
                      <span className="text-sm">Используйте качественные превью изображения</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="terms" 
                      checked={agreeTerms}
                      onCheckedChange={setAgreeTerms}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      Я согласен с <a href="#" className="text-orange hover:underline">правилами публикации</a> и 
                      <a href="#" className="text-orange hover:underline"> условиями использования</a>
                    </Label>
                  </div>
                </div>

                {/* Прогресс загрузки */}
                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Загрузка...</span>
                      <span className="text-sm">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="w-full" />
                  </div>
                )}

                {/* Кнопка отправки */}
                <Button 
                  type="submit" 
                  className="w-full bg-orange hover:bg-orange-600 text-white font-orbitron font-medium"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                      Загрузка...
                    </>
                  ) : (
                    <>
                      <Icon name="Upload" size={16} className="mr-2" />
                      Загрузить мод
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Советы */}
          <Card className="mt-6 bg-card/50 backdrop-blur border-border/30">
            <CardHeader>
              <CardTitle className="font-orbitron text-lg flex items-center">
                <Icon name="Lightbulb" size={20} className="mr-2 text-yellow-500" />
                Советы для успешной публикации
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-muted-foreground">
                • Используйте понятные названия и подробные описания
              </div>
              <div className="text-sm text-muted-foreground">
                • Добавляйте скриншоты или видео вашего мода в действии
              </div>
              <div className="text-sm text-muted-foreground">
                • Указывайте версию игры, для которой предназначен мод
              </div>
              <div className="text-sm text-muted-foreground">
                • Активно отвечайте на комментарии и обновляйте мод при необходимости
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}