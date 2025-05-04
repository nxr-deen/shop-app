export type Theme = {
  dark: boolean
  colors: {
    primary: string
    background: string
    card: string
    text: string
    border: string
    notification: string
    error: string
    success: string
    warning: string
    info: string
    secondary: string
    accent: string
    muted: string
  }
  spacing: {
    xs: number
    s: number
    m: number
    l: number
    xl: number
    xxl: number
  }
  borderRadius: {
    s: number
    m: number
    l: number
    xl: number
  }
  typography: {
    fontFamily: {
      regular: string
      medium: string
      bold: string
    }
    fontSize: {
      xs: number
      s: number
      m: number
      l: number
      xl: number
      xxl: number
    }
  }
}

export const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: "#FF6347", // Tomato
    background: "#FFFFFF",
    card: "#FFFFFF",
    text: "#1A1A1A",
    border: "#E0E0E0",
    notification: "#FF6347",
    error: "#FF3B30",
    success: "#34C759",
    warning: "#FFCC00",
    info: "#007AFF",
    secondary: "#5856D6",
    accent: "#FF9500",
    muted: "#8E8E93",
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    s: 4,
    m: 8,
    l: 16,
    xl: 24,
  },
  typography: {
    fontFamily: {
      regular: "System",
      medium: "System",
      bold: "System",
    },
    fontSize: {
      xs: 12,
      s: 14,
      m: 16,
      l: 18,
      xl: 20,
      xxl: 24,
    },
  },
}

export const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: "#FF6347", // Tomato
    background: "#1A1A1A",
    card: "#2C2C2C",
    text: "#FFFFFF",
    border: "#3A3A3A",
    notification: "#FF6347",
    error: "#FF453A",
    success: "#30D158",
    warning: "#FFD60A",
    info: "#0A84FF",
    secondary: "#5E5CE6",
    accent: "#FF9F0A",
    muted: "#8E8E93",
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    s: 4,
    m: 8,
    l: 16,
    xl: 24,
  },
  typography: {
    fontFamily: {
      regular: "System",
      medium: "System",
      bold: "System",
    },
    fontSize: {
      xs: 12,
      s: 14,
      m: 16,
      l: 18,
      xl: 20,
      xxl: 24,
    },
  },
}
