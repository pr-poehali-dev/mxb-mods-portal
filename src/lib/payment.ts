// Система платежей и комиссий
export interface PlatformConfig {
  ownerPhoneNumber: string;
  commissionRate: number; // 0.1 = 10%
  authorCommissionRate: number; // 0.7 = 70% для автора
  donationCommissionRate: number; // 0.85 = 85% для автора при донатах
}

export const PLATFORM_CONFIG: PlatformConfig = {
  ownerPhoneNumber: '+79126647918',
  commissionRate: 0.1, // 10% владельцу платформы
  authorCommissionRate: 0.7, // 70% автору
  donationCommissionRate: 0.85, // 85% автору при донатах
};

export interface PurchaseDetails {
  modId: string;
  modTitle: string;
  authorId: string;
  authorName: string;
  purchaseAmount: number;
  purchaseType: 'paid' | 'donation';
  buyerId: string;
  buyerName: string;
  timestamp: Date;
}

export interface PaymentDistribution {
  platformFee: number;
  authorEarnings: number;
  serviceFee: number;
}

export function calculatePaymentDistribution(
  amount: number, 
  type: 'paid' | 'donation'
): PaymentDistribution {
  const platformFee = amount * PLATFORM_CONFIG.commissionRate; // 10%
  const authorEarnings = amount - platformFee; // 90%
  const serviceFee = 0; // Убираем комиссию сервиса
  
  return {
    platformFee,
    authorEarnings,
    serviceFee
  };
}

export async function processPurchase(purchase: PurchaseDetails): Promise<void> {
  const distribution = calculatePaymentDistribution(
    purchase.purchaseAmount, 
    purchase.purchaseType
  );
  
  // Логируем транзакцию
  console.log('=== ОБРАБОТКА ПОКУПКИ ===');
  console.log(`Мод: ${purchase.modTitle}`);
  console.log(`Автор: ${purchase.authorName}`);
  console.log(`Покупатель: ${purchase.buyerName}`);
  console.log(`Сумма: ${purchase.purchaseAmount} ₽`);
  console.log(`Тип: ${purchase.purchaseType}`);
  console.log('');
  console.log('=== РАСПРЕДЕЛЕНИЕ СРЕДСТВ ===');
  console.log(`Владелец платформы (${PLATFORM_CONFIG.ownerPhoneNumber}): ${distribution.platformFee} ₽`);
  console.log(`Автор: ${distribution.authorEarnings} ₽`);
  
  // Здесь была бы интеграция с реальной платежной системой
  // Для демонстрации используем симуляцию
  await simulatePaymentProcessing(purchase, distribution);
}

async function simulatePaymentProcessing(
  purchase: PurchaseDetails, 
  distribution: PaymentDistribution
): Promise<void> {
  // Симуляция отправки денег владельцу платформы
  console.log(`\n💰 Отправка ${distribution.platformFee} ₽ на номер ${PLATFORM_CONFIG.ownerPhoneNumber}`);
  console.log(`📱 Комментарий: Комиссия с продажи "${purchase.modTitle}" - ${new Date().toLocaleString()}`);
  
  // Симуляция отправки денег автору
  console.log(`\n💵 Отправка ${distribution.authorEarnings} ₽ автору ${purchase.authorName}`);
  console.log(`📱 Комментарий: Продажа мода "${purchase.modTitle}" - ${new Date().toLocaleString()}`);
  
  // В реальной системе здесь были бы API-вызовы к банку или платежной системе
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('✅ Платеж обработан успешно');
}

export function generatePaymentComment(modTitle: string, type: 'platform' | 'author'): string {
  const timestamp = new Date().toLocaleString('ru-RU');
  
  if (type === 'platform') {
    return `Комиссия MX Bikes: "${modTitle}" - ${timestamp}`;
  } else {
    return `Продажа мода: "${modTitle}" - ${timestamp}`;
  }
}

// Функция для получения статистики доходов
export interface RevenueStats {
  totalPlatformRevenue: number;
  totalAuthorPayouts: number;
  totalTransactions: number;
  thisMonthRevenue: number;
}

export function getRevenueStats(): RevenueStats {
  // В реальной системе это была бы работа с базой данных
  return {
    totalPlatformRevenue: 25650,
    totalAuthorPayouts: 178550,
    totalTransactions: 1247,
    thisMonthRevenue: 8920
  };
}