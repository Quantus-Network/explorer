'use client';

import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

export interface CopyrightProps {
  variants: Variants;
  className?: string;
}

export const Copyright: React.FC<CopyrightProps> = ({
  className,
  variants
}) => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <motion.div variants={variants} className={className}>
      © {year} Quantus Explorer. All rights reserved.
    </motion.div>
  );
};
