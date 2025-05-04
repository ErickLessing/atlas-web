export const generateGrayscaleShades = (count: number): string[] => {
    const shades: string[] = [];
  
    for (let i = 0; i < count; i++) {
      const lightness = 20 + (i * 60) / Math.max(count - 1, 1); // from 20% to 80%
      shades.push(`hsl(0, 0%, ${lightness}%)`); // black → light gray
    }
  
    return shades;
  };
  