import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const PaymentInstructions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            💳 Инструкции по пополнению баланса
          </h1>
          <p className="text-gray-600 text-lg">
            Подробные инструкции для всех доступных способов пополнения
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Т-Банк */}
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="Phone" size={24} className="text-blue-600" />
                  <span>Т-Банк</span>
                </CardTitle>
                <Badge className="bg-green-100 text-green-800">
                  Рекомендуется
                </Badge>
              </div>
              <CardDescription>
                Перевод по номеру телефона через приложение Т-Банк
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">📱 Реквизиты для перевода</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Номер телефона:</span>
                    <span className="font-mono">+7 (912) 664-79-18</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Получатель:</span>
                    <span>Администрация MX Bikes Mods</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Комментарий:</span>
                    <span className="font-mono">Пополнение баланса #ВАШ_ID</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-blue-900">🔄 Пошаговая инструкция:</h4>
                <ol className="text-sm space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
                    <span>Откройте приложение Т-Банк</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
                    <span>Выберите "Переводы" → "По номеру телефона"</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">3</span>
                    <span>Введите номер: +7 (912) 664-79-18</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">4</span>
                    <span>Укажите сумму пополнения</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">5</span>
                    <span>В комментарии напишите: "Пополнение баланса #ВАШ_ID"</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">6</span>
                    <span>Подтвердите перевод</span>
                  </li>
                </ol>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="CheckCircle" size={16} className="text-green-600" />
                  <span className="text-sm font-medium text-green-800">Автоматическое зачисление</span>
                </div>
                <p className="text-xs text-green-700">
                  Баланс пополнится автоматически в течение 5-10 минут после перевода
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Банковская карта */}
          <Card className="border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon name="CreditCard" size={24} className="text-gray-600" />
                <span>Банковская карта</span>
              </CardTitle>
              <CardDescription>
                Оплата через банковскую карту любого банка
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">💳 Поддерживаемые карты</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-green-600" />
                    <span>Visa / MasterCard</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-green-600" />
                    <span>Мир</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-green-600" />
                    <span>Карты всех российских банков</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">🔄 Как пополнить:</h4>
                <ol className="text-sm space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="bg-gray-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
                    <span>Перейдите в раздел "Профиль"</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-gray-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
                    <span>Выберите "Пополнить баланс"</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-gray-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">3</span>
                    <span>Укажите сумму и выберите "Банковская карта"</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-gray-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">4</span>
                    <span>Введите данные карты и подтвердите</span>
                  </li>
                </ol>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Shield" size={16} className="text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Безопасность</span>
                </div>
                <p className="text-xs text-blue-700">
                  Все платежи защищены SSL-шифрованием и обрабатываются через secure платежные системы
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Криптовалюта */}
          <Card className="border-2 border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon name="Coins" size={24} className="text-purple-600" />
                <span>Криптовалюта</span>
              </CardTitle>
              <CardDescription>
                Пополнение через популярные криптовалюты
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <h3 className="font-semibold text-purple-900 mb-2">💎 Поддерживаемые валюты</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Icon name="Circle" size={12} className="text-orange-500" />
                    <span>Bitcoin (BTC)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Circle" size={12} className="text-blue-500" />
                    <span>Ethereum (ETH)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Circle" size={12} className="text-green-500" />
                    <span>USDT</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Circle" size={12} className="text-purple-500" />
                    <span>Litecoin (LTC)</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-purple-900">🔄 Как пополнить:</h4>
                <ol className="text-sm space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
                    <span>Выберите криптовалюту для пополнения</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
                    <span>Получите адрес кошелька</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">3</span>
                    <span>Отправьте нужную сумму на адрес</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">4</span>
                    <span>Дождитесь подтверждения сети</span>
                  </li>
                </ol>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Clock" size={16} className="text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800">Время зачисления</span>
                </div>
                <p className="text-xs text-yellow-700">
                  Зачисление происходит после 3-6 подтверждений сети (15-60 минут)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Электронные кошельки */}
          <Card className="border-2 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon name="Wallet" size={24} className="text-green-600" />
                <span>Электронные кошельки</span>
              </CardTitle>
              <CardDescription>
                Пополнение через популярные электронные кошельки
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2">💼 Поддерживаемые кошельки</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Icon name="Circle" size={12} className="text-blue-500" />
                    <span>ЮMoney</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Circle" size={12} className="text-orange-500" />
                    <span>QIWI</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Circle" size={12} className="text-green-500" />
                    <span>СберPay</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Circle" size={12} className="text-red-500" />
                    <span>WebMoney</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-green-900">🔄 Как пополнить:</h4>
                <ol className="text-sm space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
                    <span>Выберите электронный кошелек</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
                    <span>Войдите в аккаунт кошелька</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">3</span>
                    <span>Подтвердите платеж</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">4</span>
                    <span>Баланс пополнится мгновенно</span>
                  </li>
                </ol>
              </div>
              
              <div className="bg-green-100 border border-green-300 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Zap" size={16} className="text-green-600" />
                  <span className="text-sm font-medium text-green-800">Мгновенное зачисление</span>
                </div>
                <p className="text-xs text-green-700">
                  Средства поступают на баланс сразу после подтверждения платежа
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Общая информация */}
        <Card className="mt-8 border-2 border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-orange-900">
              <Icon name="Info" size={24} className="text-orange-600" />
              <span>Важная информация</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-orange-900">💰 Минимальные суммы:</h3>
                <ul className="text-sm space-y-1">
                  <li>• Т-Банк: от 50 ₽</li>
                  <li>• Банковская карта: от 100 ₽</li>
                  <li>• Криптовалюта: от 500 ₽</li>
                  <li>• Электронные кошельки: от 50 ₽</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-orange-900">🔄 Время зачисления:</h3>
                <ul className="text-sm space-y-1">
                  <li>• Т-Банк: 5-10 минут</li>
                  <li>• Банковская карта: мгновенно</li>
                  <li>• Криптовалюта: 15-60 минут</li>
                  <li>• Электронные кошельки: мгновенно</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-orange-200">
              <h3 className="font-semibold text-orange-900 mb-2">🆘 Нужна помощь?</h3>
              <p className="text-sm text-orange-800 mb-2">
                Если у вас возникли проблемы с пополнением или у вас есть вопросы:
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="text-orange-700 border-orange-300">
                  <Icon name="MessageCircle" size={16} className="mr-1" />
                  Telegram поддержка
                </Button>
                <Button variant="outline" size="sm" className="text-orange-700 border-orange-300">
                  <Icon name="Mail" size={16} className="mr-1" />
                  Email: support@mxbikes.ru
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Кнопка возврата */}
        <div className="text-center mt-8">
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/profile">
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Вернуться к профилю
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentInstructions;