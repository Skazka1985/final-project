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

// test-data.ts
export const generateRandomAd = () => {
  const categories = ['Одежда', 'Техника', 'Спорт', 'Услуги'];
  const materials = ['Хлопок', 'Шерсть', 'Синтетика', 'Кожа'];
  const colors = ['Красные', 'Синие', 'Черные', 'Белые', 'Зеленые'];
  const types = ['Шорты', 'Брюки', 'Футболка', 'Куртка', 'Платье'];
  
  const randomType = types[Math.floor(Math.random() * types.length)];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomMaterial = materials[Math.floor(Math.random() * materials.length)];

  return {
    title: `${randomColor} ${randomType} из ${randomMaterial}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    description: `Стильные ${randomColor.toLowerCase()} ${randomType.toLowerCase()} из ${randomMaterial.toLowerCase()}. ${['Идеально для лета.', 'Подойдет для офиса.', 'Удобная модель.'][Math.floor(Math.random() * 3)]}`,
    price: (Math.floor(Math.random() * 900) + 100) // Случайная цена от 100 до 1000
  };
};