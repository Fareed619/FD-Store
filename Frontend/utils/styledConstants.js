const breakpoints = {
    xs: "450px",
    sm: "600px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  }
  
  export const devices = {
    xs: `(max-width: ${breakpoints.xs})`,
    sm: `(max-width: ${breakpoints.sm})`,
    md: `(max-width: ${breakpoints.md})`,
    lg: `(max-width: ${breakpoints.lg})`,
    xl: `(max-width: ${breakpoints.xl})`,
    "2xl": `(max-width: ${breakpoints["2xl"]})`,
  }