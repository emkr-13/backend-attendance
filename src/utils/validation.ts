// Validasi input untuk login
export const validateLoginInput = (username: string, password: string) => {
  if (!username || !password) {
    throw new Error("Username and password are required");
  }
  if (username.length < 3 || password.length < 6) {
    throw new Error(
      "Username must be at least 3 characters and password must be at least 6 characters"
    );
  }
};

// Validasi input untuk register
export const validateRegisterInput = (
  username: string,
  password: string,
  fullName: string
) => {
  if (!username || !password || !fullName) {
    throw new Error("All fields are required");
  }
  if (username.length < 3 || password.length < 6 || fullName.length < 3) {
    throw new Error(
      "Username, password, and full name must meet minimum length requirements"
    );
  }
};

// Validasi email (opsional)
export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }
};
