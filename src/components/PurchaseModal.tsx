import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { processPurchase, calculatePaymentDistribution, PurchaseDetails } from '@/lib/payment';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  mod: {
    id: string;
    title: string;
    author: string;
    authorId: string;
    price: number;
    type: 'paid' | 'donation';
    image: string;
  };
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose, mod }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const { toast } = useToast();

  const handlePurchase = async () => {
    setIsProcessing(true);
    
    try {
      const amount = mod.type === 'paid' ? mod.price : parseFloat(donationAmount);
      
      if (mod.type === 'donation' && (!donationAmount || amount < 50)) {
        toast({
          title: "Ошибка",
          description: "Минимальная сумма доната 50 ₽",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }
      
      const purchaseDetails: PurchaseDetails = {
        modId: mod.id,
        modTitle: mod.title,
        authorId: mod.authorId,
        authorName: mod.author,
        purchaseAmount: amount,
        purchaseType: mod.type,
        buyerId: 'user123', // В реальной системе это ID текущего пользователя
        buyerName: 'Текущий пользователь',
        timestamp: new Date(),
      };
      
      // Обрабатываем покупку
      await processPurchase(purchaseDetails);
      
      const distribution = calculatePaymentDistribution(amount, mod.type);
      
      toast({
        title: "Покупка успешна! 🎉",
        description: `Мод "${mod.title}" добавлен в вашу библиотеку. Автор получит ${distribution.authorEarnings} ₽`,
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при обработке платежа",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const distribution = calculatePaymentDistribution(
    mod.type === 'paid' ? mod.price : parseFloat(donationAmount) || 0,
    mod.type
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Icon name={mod.type === 'paid' ? 'ShoppingCart' : 'Gift'} size={20} />
            <span>
              {mod.type === 'paid' ? 'Покупка мода' : 'Поддержать автора'}
            </span>
          </DialogTitle>
          <DialogDescription>
            {mod.type === 'paid' 
              ? 'Подтвердите покупку платного мода' 
              : 'Поддержите автора донатом'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Информация о моде */}
          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <img 
              src={mod.image} 
              alt={mod.title}
              className="w-12 h-12 rounded object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{mod.title}</h3>
              <p className="text-sm text-muted-foreground">by {mod.author}</p>
            </div>
          </div>

          {/* Сумма */}
          <div className="space-y-2">
            {mod.type === 'paid' ? (
              <div className="flex justify-between items-center">
                <Label>Стоимость:</Label>
                <Badge className="bg-green-100 text-green-800 text-lg px-3 py-1">
                  {mod.price} ₽
                </Badge>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="donation">Сумма доната (₽):</Label>
                <Input
                  id="donation"
                  type="number"
                  min="50"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  placeholder="100"
                />
                <p className="text-xs text-muted-foreground">
                  Минимальная сумма: 50 ₽
                </p>
              </div>
            )}
          </div>

          {/* Распределение средств */}
          {(mod.type === 'paid' || (mod.type === 'donation' && donationAmount)) && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h4 className="font-semibold text-blue-900 mb-2">💰 Распределение средств:</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Автор получит:</span>
                  <span className="font-semibold text-green-600">
                    {distribution.authorEarnings.toFixed(0)} ₽
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Владелец платформы:</span>
                  <span className="font-semibold text-blue-600">
                    {distribution.platformFee.toFixed(0)} ₽
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Комиссия сервиса:</span>
                  <span className="font-semibold text-gray-600">
                    {distribution.serviceFee.toFixed(0)} ₽
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Важная информация */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-orange-600 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-orange-800">
                  Автоматическое распределение средств
                </p>
                <p className="text-xs text-orange-700">
                  10% от суммы автоматически переводится на номер +7 (912) 664-79-18 
                  как комиссия платформы. Остальные средства поступают автору.
                </p>
              </div>
            </div>
          </div>

          {/* Кнопки */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isProcessing}
            >
              Отмена
            </Button>
            <Button
              onClick={handlePurchase}
              disabled={isProcessing || (mod.type === 'donation' && !donationAmount)}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {isProcessing ? (
                <>
                  <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                  Обработка...
                </>
              ) : (
                <>
                  <Icon name={mod.type === 'paid' ? 'CreditCard' : 'Heart'} size={16} className="mr-2" />
                  {mod.type === 'paid' ? 'Купить' : 'Поддержать'}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseModal;