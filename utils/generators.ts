// utils/generators.ts
export function generateTestUser() {
    const timestamp = Date.now();
    return {
      email: `test${timestamp}@example.com`,
      password: `Pass${timestamp % 10000}`,
      firstName: `User${timestamp % 1000}`,
      phone: `+7999${timestamp.toString().slice(-7)}`
    };
  }