/**
 * Базовые функции безопасности для защиты от взлома
 */

// Проверка на подозрительные символы в пользовательском вводе
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Убираем потенциальные XSS теги
    .replace(/javascript:/gi, '') // Убираем javascript: протокол
    .replace(/on\w+=/gi, '') // Убираем обработчики событий
    .trim();
};

// Проверка на SQL инъекции (базовая)
export const isValidInput = (input: string): boolean => {
  const dangerousPatterns = [
    /['";]/g, // кавычки
    /union\s+select/gi, // UNION SELECT
    /insert\s+into/gi, // INSERT INTO
    /delete\s+from/gi, // DELETE FROM
    /drop\s+table/gi, // DROP TABLE
    /script/gi, // script теги
    /eval\s*\(/gi, // eval функции
  ];
  
  return !dangerousPatterns.some(pattern => pattern.test(input));
};

// Генерация случайного токена для защиты от CSRF
export const generateCSRFToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Проверка силы пароля
export const isStrongPassword = (password: string): boolean => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return password.length >= minLength && 
         hasUpperCase && 
         hasLowerCase && 
         hasNumbers && 
         hasSpecialChar;
};

// Ограничение попыток входа
export const rateLimiter = {
  attempts: new Map<string, { count: number; lastAttempt: number }>(),
  
  isAllowed(ip: string): boolean {
    const now = Date.now();
    const userAttempts = this.attempts.get(ip);
    
    if (!userAttempts) {
      this.attempts.set(ip, { count: 1, lastAttempt: now });
      return true;
    }
    
    // Сброс после 15 минут
    if (now - userAttempts.lastAttempt > 15 * 60 * 1000) {
      this.attempts.set(ip, { count: 1, lastAttempt: now });
      return true;
    }
    
    // Максимум 5 попыток за 15 минут
    if (userAttempts.count >= 5) {
      return false;
    }
    
    userAttempts.count++;
    userAttempts.lastAttempt = now;
    return true;
  }
};

// Проверка на подозрительные файлы
export const isValidFileUpload = (file: File): boolean => {
  const allowedTypes = [
    'application/zip',
    'application/x-zip-compressed',
    'application/x-rar-compressed',
    'application/x-7z-compressed'
  ];
  
  const allowedExtensions = ['.zip', '.rar', '.7z'];
  const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
  
  return allowedTypes.includes(file.type) && 
         allowedExtensions.includes(fileExtension) &&
         file.size <= 100 * 1024 * 1024; // Максимум 100MB
};

// Очистка данных формы
export const sanitizeFormData = (data: Record<string, any>): Record<string, any> => {
  const cleaned: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      cleaned[key] = sanitizeInput(value);
    } else if (typeof value === 'number') {
      cleaned[key] = Math.max(0, Math.min(value, 999999)); // Ограничиваем числа
    } else {
      cleaned[key] = value;
    }
  }
  
  return cleaned;
};

// Генерация безопасного ID
export const generateSecureId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};