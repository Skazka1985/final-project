// Фиксированные тестовые данные
export const TestUsers = {
  registered: {
    email: 'reg@test.ru',
    password: 'RegPassword',
    firstName: 'Liss',
    lastName: 'Fox',
    phone: '+7 (978) 000-00-00'
  },
  unregistered: {
    email: 'unregistered@test.ru',
    password: 'UnRegPass',
    firstName: 'UnReg',
    lastName: 'Unregistered',
    phone: '+7 (978) 111-11-11'
  }, 
  invalid: {
    email: 'reg',
    password: '123',
    firstName: '123123',
    lastName: '*^&%*',
    phone: '+7 (978) '
  }
};

// Генератор случайных пользователей
export const generateRandomUser = () => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  
  return {
    email: `testuser+${timestamp}@test.com`,
    password: `Pass${timestamp % 10000}!`, // Добавлен спецсимвол
    firstName: `User${randomString}`,
    lastName: `Last${randomString}`,
    phone: `+7${Math.floor(9000000000 + Math.random() * 1000000000)}`
  };
};

// Форматирование телефона (если нужно)
// export const formatPhone = (phone: string) => {
//   const digits = phone.replace(/\D/g, '');
//   return `+${digits[0]} (${digits.substring(1, 4)}) ${digits.substring(4, 7)}-${digits.substring(7, 9)}-${digits.substring(9)}`;
// };