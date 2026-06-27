// seed-phones.ts
// Ejecutar con: npx ts-node seed-phones.ts
// O adaptar a tu método de seed favorito (prisma db seed, etc.)

import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
  ssl:
    process.env.NODE_ENV === 'production'
      ? {
          rejectUnauthorized: false,
        }
      : false,
});

const prisma = new PrismaClient({
  adapter,
});

// ⚠️ Ajusta estos valores a los que existan en tu DB
const USUARIO_ID = '3fbf8b6e-6b36-470c-8d7f-487c4b7df8ba';
const TENANT_ID = null; // o null si no aplica

const catalog: { marca: string; modelos: string[] }[] = [
  // ──────────────────────────────────────────────
  // SAMSUNG
  // ──────────────────────────────────────────────
  {
    marca: 'Samsung',
    modelos: [
      // Galaxy S
      'Galaxy S6', 'Galaxy S6 Edge', 'Galaxy S6 Edge+',
      'Galaxy S7', 'Galaxy S7 Edge',
      'Galaxy S8', 'Galaxy S8+',
      'Galaxy S9', 'Galaxy S9+',
      'Galaxy S10', 'Galaxy S10e', 'Galaxy S10+', 'Galaxy S10 5G',
      'Galaxy S20', 'Galaxy S20+', 'Galaxy S20 Ultra',
      'Galaxy S21', 'Galaxy S21+', 'Galaxy S21 Ultra',
      'Galaxy S22', 'Galaxy S22+', 'Galaxy S22 Ultra',
      'Galaxy S23', 'Galaxy S23+', 'Galaxy S23 Ultra',
      'Galaxy S24', 'Galaxy S24+', 'Galaxy S24 Ultra',
      'Galaxy S25', 'Galaxy S25+', 'Galaxy S25 Ultra',
      // Galaxy A
      'Galaxy A3 (2015)', 'Galaxy A5 (2015)', 'Galaxy A7 (2015)',
      'Galaxy A3 (2016)', 'Galaxy A5 (2016)', 'Galaxy A7 (2016)',
      'Galaxy A3 (2017)', 'Galaxy A5 (2017)', 'Galaxy A7 (2017)',
      'Galaxy A6', 'Galaxy A6+', 'Galaxy A8 (2018)', 'Galaxy A8+',
      'Galaxy A10', 'Galaxy A20', 'Galaxy A30', 'Galaxy A40',
      'Galaxy A50', 'Galaxy A60', 'Galaxy A70', 'Galaxy A80', 'Galaxy A90',
      'Galaxy A01', 'Galaxy A11', 'Galaxy A21', 'Galaxy A21s',
      'Galaxy A31', 'Galaxy A41', 'Galaxy A51', 'Galaxy A51 5G',
      'Galaxy A71', 'Galaxy A71 5G',
      'Galaxy A02', 'Galaxy A02s', 'Galaxy A12', 'Galaxy A22',
      'Galaxy A22 5G', 'Galaxy A32', 'Galaxy A32 5G', 'Galaxy A42 5G',
      'Galaxy A52', 'Galaxy A52 5G', 'Galaxy A52s 5G', 'Galaxy A72',
      'Galaxy A03', 'Galaxy A03s', 'Galaxy A03 Core',
      'Galaxy A13', 'Galaxy A13 5G', 'Galaxy A23', 'Galaxy A23 5G',
      'Galaxy A33 5G', 'Galaxy A53 5G', 'Galaxy A73 5G',
      'Galaxy A14', 'Galaxy A14 5G', 'Galaxy A24',
      'Galaxy A34 5G', 'Galaxy A54 5G',
      'Galaxy A15', 'Galaxy A15 5G', 'Galaxy A25 5G',
      'Galaxy A35 5G', 'Galaxy A55 5G',
      // Galaxy M
      'Galaxy M10', 'Galaxy M20', 'Galaxy M30', 'Galaxy M40',
      'Galaxy M11', 'Galaxy M21', 'Galaxy M31', 'Galaxy M31s', 'Galaxy M51',
      'Galaxy M12', 'Galaxy M22', 'Galaxy M32', 'Galaxy M42 5G', 'Galaxy M52 5G',
      'Galaxy M13', 'Galaxy M23 5G', 'Galaxy M33 5G', 'Galaxy M53 5G',
      'Galaxy M14 5G', 'Galaxy M34 5G', 'Galaxy M54 5G',
      // Galaxy Note
      'Galaxy Note 5', 'Galaxy Note 7',
      'Galaxy Note 8', 'Galaxy Note 9', 'Galaxy Note 10', 'Galaxy Note 10+',
      'Galaxy Note 20', 'Galaxy Note 20 Ultra',
      // Galaxy Z
      'Galaxy Z Fold 2', 'Galaxy Z Fold 3', 'Galaxy Z Fold 4',
      'Galaxy Z Fold 5', 'Galaxy Z Fold 6',
      'Galaxy Z Flip', 'Galaxy Z Flip 3', 'Galaxy Z Flip 4',
      'Galaxy Z Flip 5', 'Galaxy Z Flip 6',
      // Galaxy F & Others
      'Galaxy F12', 'Galaxy F22', 'Galaxy F23', 'Galaxy F34', 'Galaxy F54',
      'Galaxy Xcover 5', 'Galaxy Xcover 6 Pro',
    ],
  },

  // ──────────────────────────────────────────────
  // APPLE
  // ──────────────────────────────────────────────
  {
    marca: 'Apple',
    modelos: [
      'iPhone 6s', 'iPhone 6s Plus',
      'iPhone SE (1st gen)',
      'iPhone 7', 'iPhone 7 Plus',
      'iPhone 8', 'iPhone 8 Plus', 'iPhone X',
      'iPhone XS', 'iPhone XS Max', 'iPhone XR',
      'iPhone 11', 'iPhone 11 Pro', 'iPhone 11 Pro Max',
      'iPhone SE (2nd gen)',
      'iPhone 12 mini', 'iPhone 12', 'iPhone 12 Pro', 'iPhone 12 Pro Max',
      'iPhone 13 mini', 'iPhone 13', 'iPhone 13 Pro', 'iPhone 13 Pro Max',
      'iPhone SE (3rd gen)',
      'iPhone 14', 'iPhone 14 Plus', 'iPhone 14 Pro', 'iPhone 14 Pro Max',
      'iPhone 15', 'iPhone 15 Plus', 'iPhone 15 Pro', 'iPhone 15 Pro Max',
      'iPhone 16', 'iPhone 16 Plus', 'iPhone 16 Pro', 'iPhone 16 Pro Max',
      'iPhone 16e',
      'iPhone 17', 'iPhone 17 Plus', 'iPhone 17 Pro', 'iPhone 17 Pro Max',
    ],
  },

  // ──────────────────────────────────────────────
  // MOTOROLA
  // ──────────────────────────────────────────────
  {
    marca: 'Motorola',
    modelos: [
      // Moto G
      'Moto G3', 'Moto G4', 'Moto G4 Plus', 'Moto G4 Play',
      'Moto G5', 'Moto G5 Plus', 'Moto G5s', 'Moto G5s Plus',
      'Moto G6', 'Moto G6 Play', 'Moto G6 Plus',
      'Moto G7', 'Moto G7 Play', 'Moto G7 Plus', 'Moto G7 Power',
      'Moto G8', 'Moto G8 Play', 'Moto G8 Plus', 'Moto G8 Power',
      'Moto G8 Power Lite', 'Moto G Fast', 'Moto G Pro',
      'Moto G9', 'Moto G9 Play', 'Moto G9 Plus', 'Moto G9 Power',
      'Moto G Stylus', 'Moto G Stylus 5G', 'Moto G Power',
      'Moto G10', 'Moto G20', 'Moto G30', 'Moto G40 Fusion',
      'Moto G50', 'Moto G60', 'Moto G60s',
      'Moto G71 5G', 'Moto G82 5G', 'Moto G200 5G',
      'Moto G13', 'Moto G23', 'Moto G53', 'Moto G73',
      'Moto G14', 'Moto G24', 'Moto G34', 'Moto G54', 'Moto G84',
      'Moto G Stylus (2021)', 'Moto G Stylus 5G (2022)',
      'Moto G Stylus (2023)', 'Moto G Stylus (2024)',
      'Moto G Power (2021)', 'Moto G Power (2022)',
      'Moto G Power 5G (2023)', 'Moto G Power 5G (2024)',
      // Moto E
      'Moto E2', 'Moto E3', 'Moto E4', 'Moto E4 Plus',
      'Moto E5', 'Moto E5 Play', 'Moto E5 Plus',
      'Moto E6', 'Moto E6 Play', 'Moto E6 Plus', 'Moto E6s',
      'Moto E7', 'Moto E7 Plus', 'Moto E7 Power',
      'Moto E20', 'Moto E30', 'Moto E40',
      'Moto E13', 'Moto E14',
      // Moto Edge / Razr
      'Motorola Edge', 'Motorola Edge+', 'Motorola Edge 20', 'Motorola Edge 20 Lite',
      'Motorola Edge 20 Pro', 'Motorola Edge 30', 'Motorola Edge 30 Fusion',
      'Motorola Edge 30 Neo', 'Motorola Edge 30 Pro', 'Motorola Edge 30 Ultra',
      'Motorola Edge 40', 'Motorola Edge 40 Neo', 'Motorola Edge 40 Pro',
      'Motorola Edge 50', 'Motorola Edge 50 Fusion', 'Motorola Edge 50 Neo',
      'Motorola Edge 50 Pro', 'Motorola Edge 50 Ultra',
      'Motorola Razr (2019)', 'Motorola Razr 5G',
      'Motorola Razr (2022)', 'Motorola Razr 40', 'Motorola Razr 40 Ultra',
      'Motorola Razr 50', 'Motorola Razr 50 Ultra',
      // Moto X / Z
      'Moto X Style', 'Moto X Play', 'Moto X Force',
      'Moto Z', 'Moto Z Play', 'Moto Z2 Force', 'Moto Z2 Play',
      'Moto Z3', 'Moto Z3 Play', 'Moto Z4',
      // ThinkPhone
      'ThinkPhone by Motorola',
    ],
  },

  // ──────────────────────────────────────────────
  // XIAOMI
  // ──────────────────────────────────────────────
  {
    marca: 'Xiaomi',
    modelos: [
      // Mi series
      'Mi 4', 'Mi 4i', 'Mi 4c', 'Mi 5', 'Mi 5s', 'Mi 5s Plus',
      'Mi 6', 'Mi 6X', 'Mi 8', 'Mi 8 Lite', 'Mi 8 Pro',
      'Mi 9', 'Mi 9 Lite', 'Mi 9 Pro', 'Mi 9 SE', 'Mi 9T', 'Mi 9T Pro',
      'Mi 10', 'Mi 10 Lite', 'Mi 10 Pro', 'Mi 10 Ultra', 'Mi 10T', 'Mi 10T Lite', 'Mi 10T Pro',
      'Mi 11', 'Mi 11 Lite', 'Mi 11 Lite 5G', 'Mi 11i', 'Mi 11 Pro', 'Mi 11 Ultra', 'Mi 11X', 'Mi 11X Pro',
      // Xiaomi 12/13/14
      'Xiaomi 12', 'Xiaomi 12 Lite', 'Xiaomi 12 Pro', 'Xiaomi 12 Ultra', 'Xiaomi 12X',
      'Xiaomi 12S', 'Xiaomi 12S Pro', 'Xiaomi 12S Ultra',
      'Xiaomi 13', 'Xiaomi 13 Lite', 'Xiaomi 13 Pro', 'Xiaomi 13 Ultra', 'Xiaomi 13C', 'Xiaomi 13T', 'Xiaomi 13T Pro',
      'Xiaomi 14', 'Xiaomi 14 Lite', 'Xiaomi 14 Pro', 'Xiaomi 14 Ultra', 'Xiaomi 14C', 'Xiaomi 14T', 'Xiaomi 14T Pro',
      'Xiaomi 15', 'Xiaomi 15 Pro', 'Xiaomi 15 Ultra',
      // Redmi Note
      'Redmi Note 3', 'Redmi Note 4', 'Redmi Note 5', 'Redmi Note 5 Pro',
      'Redmi Note 6 Pro', 'Redmi Note 7', 'Redmi Note 7 Pro',
      'Redmi Note 8', 'Redmi Note 8 Pro', 'Redmi Note 8T',
      'Redmi Note 9', 'Redmi Note 9 Pro', 'Redmi Note 9 Pro Max', 'Redmi Note 9S', 'Redmi Note 9T',
      'Redmi Note 10', 'Redmi Note 10 Pro', 'Redmi Note 10 Pro Max', 'Redmi Note 10S', 'Redmi Note 10T',
      'Redmi Note 11', 'Redmi Note 11 Pro', 'Redmi Note 11 Pro+', 'Redmi Note 11S', 'Redmi Note 11T',
      'Redmi Note 12', 'Redmi Note 12 Pro', 'Redmi Note 12 Pro+', 'Redmi Note 12S', 'Redmi Note 12 4G',
      'Redmi Note 12 Turbo', 'Redmi Note 13', 'Redmi Note 13 Pro', 'Redmi Note 13 Pro+',
      'Redmi Note 14', 'Redmi Note 14 Pro', 'Redmi Note 14 Pro+',
      // Redmi
      'Redmi 3', 'Redmi 3S', 'Redmi 4', 'Redmi 4A', 'Redmi 4X',
      'Redmi 5', 'Redmi 5A', 'Redmi 5 Plus',
      'Redmi 6', 'Redmi 6A', 'Redmi 6 Pro',
      'Redmi 7', 'Redmi 7A', 'Redmi 8', 'Redmi 8A', 'Redmi 8A Pro',
      'Redmi 9', 'Redmi 9A', 'Redmi 9C', 'Redmi 9T',
      'Redmi 10', 'Redmi 10A', 'Redmi 10C', 'Redmi 10 2022',
      'Redmi 12', 'Redmi 12C', 'Redmi 13', 'Redmi 13C', 'Redmi 14C',
      // POCO
      'POCO F1', 'POCO X2', 'POCO X3', 'POCO X3 Pro', 'POCO X3 NFC',
      'POCO F3', 'POCO M3', 'POCO M3 Pro', 'POCO F3 GT',
      'POCO X4 Pro 5G', 'POCO X4 GT', 'POCO M4 Pro', 'POCO M4 5G',
      'POCO F4', 'POCO F4 GT', 'POCO C50',
      'POCO X5', 'POCO X5 Pro', 'POCO M5', 'POCO M5s', 'POCO C55',
      'POCO F5', 'POCO F5 Pro', 'POCO X6', 'POCO X6 Pro', 'POCO M6 Pro',
      'POCO F6', 'POCO F6 Pro', 'POCO X7', 'POCO X7 Pro',
    ],
  },

  // ──────────────────────────────────────────────
  // HUAWEI
  // ──────────────────────────────────────────────
  {
    marca: 'Huawei',
    modelos: [
      'P8', 'P8 Lite', 'P9', 'P9 Lite', 'P9 Plus',
      'P10', 'P10 Lite', 'P10 Plus',
      'P20', 'P20 Lite', 'P20 Pro',
      'P30', 'P30 Lite', 'P30 Pro',
      'P40', 'P40 Lite', 'P40 Lite E', 'P40 Pro', 'P40 Pro+',
      'P50', 'P50 Pro', 'P50 Pocket',
      'P60', 'P60 Pro', 'P60 Art',
      'Mate 8', 'Mate 9', 'Mate 10', 'Mate 10 Pro',
      'Mate 20', 'Mate 20 Lite', 'Mate 20 Pro', 'Mate 20 X',
      'Mate 30', 'Mate 30 Lite', 'Mate 30 Pro',
      'Mate 40', 'Mate 40 Pro', 'Mate 40 Pro+', 'Mate 40 RS',
      'Mate 50', 'Mate 50 Pro', 'Mate 50 RS',
      'Mate 60', 'Mate 60 Pro', 'Mate 60 Pro+', 'Mate 60 RS',
      'Nova 3', 'Nova 3i', 'Nova 5T', 'Nova 7', 'Nova 8', 'Nova 9', 'Nova 10', 'Nova 11',
      'Y5 (2019)', 'Y6 (2019)', 'Y7 (2019)', 'Y9 (2019)',
      'Y5p', 'Y6p', 'Y7a', 'Y8p', 'Y9a',
      'Pura 70', 'Pura 70 Pro', 'Pura 70 Ultra',
    ],
  },

  // ──────────────────────────────────────────────
  // LG
  // ──────────────────────────────────────────────
  {
    marca: 'LG',
    modelos: [
      'G4', 'G5', 'G6', 'G7 ThinQ', 'G8 ThinQ', 'G8X ThinQ',
      'V10', 'V20', 'V30', 'V35 ThinQ', 'V40 ThinQ', 'V50 ThinQ', 'V60 ThinQ',
      'K4 (2016)', 'K7 (2016)', 'K10 (2016)',
      'K8 (2017)', 'K10 (2017)',
      'K9', 'K11', 'K11+',
      'K20', 'K30', 'K40', 'K40s', 'K50', 'K50s', 'K61',
      'Q60', 'Q70', 'Q92 5G',
      'Velvet', 'Velvet 5G',
      'Wing 5G',
      'Stylo 4', 'Stylo 5', 'Stylo 6', 'Stylo 7',
      'X Power', 'X Power 2', 'X Power 3',
      'Nexus 5X',
    ],
  },

  // ──────────────────────────────────────────────
  // SONY
  // ──────────────────────────────────────────────
  {
    marca: 'Sony',
    modelos: [
      'Xperia Z3', 'Xperia Z3+', 'Xperia Z3 Compact',
      'Xperia Z5', 'Xperia Z5 Compact', 'Xperia Z5 Premium',
      'Xperia X', 'Xperia X Compact', 'Xperia X Performance',
      'Xperia XZ', 'Xperia XZ Premium', 'Xperia XZ1', 'Xperia XZ1 Compact', 'Xperia XZ2', 'Xperia XZ2 Compact', 'Xperia XZ3',
      'Xperia 1', 'Xperia 1 II', 'Xperia 1 III', 'Xperia 1 IV', 'Xperia 1 V', 'Xperia 1 VI',
      'Xperia 5', 'Xperia 5 II', 'Xperia 5 III', 'Xperia 5 IV', 'Xperia 5 V',
      'Xperia 10', 'Xperia 10 II', 'Xperia 10 III', 'Xperia 10 IV', 'Xperia 10 V', 'Xperia 10 VI',
      'Xperia L3', 'Xperia L4',
      'Xperia Pro', 'Xperia Pro-I',
    ],
  },

  // ──────────────────────────────────────────────
  // ONEPLUS
  // ──────────────────────────────────────────────
  {
    marca: 'OnePlus',
    modelos: [
      'OnePlus 2', 'OnePlus 3', 'OnePlus 3T',
      'OnePlus 5', 'OnePlus 5T',
      'OnePlus 6', 'OnePlus 6T',
      'OnePlus 7', 'OnePlus 7 Pro', 'OnePlus 7T', 'OnePlus 7T Pro',
      'OnePlus 8', 'OnePlus 8 Pro', 'OnePlus 8T',
      'OnePlus 9', 'OnePlus 9 Pro', 'OnePlus 9R', 'OnePlus 9RT',
      'OnePlus 10 Pro', 'OnePlus 10R', 'OnePlus 10T',
      'OnePlus 11', 'OnePlus 11R',
      'OnePlus 12', 'OnePlus 12R',
      'OnePlus 13', 'OnePlus 13R',
      'OnePlus Nord', 'OnePlus Nord CE', 'OnePlus Nord CE 2', 'OnePlus Nord CE 2 Lite',
      'OnePlus Nord 2', 'OnePlus Nord 2T',
      'OnePlus Nord 3', 'OnePlus Nord CE 3', 'OnePlus Nord CE 3 Lite',
      'OnePlus Nord 4', 'OnePlus Nord CE 4', 'OnePlus Nord CE 4 Lite',
      'OnePlus Open',
    ],
  },

  // ──────────────────────────────────────────────
  // GOOGLE
  // ──────────────────────────────────────────────
  {
    marca: 'Google',
    modelos: [
      'Nexus 6', 'Nexus 6P',
      'Pixel', 'Pixel XL',
      'Pixel 2', 'Pixel 2 XL',
      'Pixel 3', 'Pixel 3 XL', 'Pixel 3a', 'Pixel 3a XL',
      'Pixel 4', 'Pixel 4 XL', 'Pixel 4a', 'Pixel 4a 5G',
      'Pixel 5', 'Pixel 5a',
      'Pixel 6', 'Pixel 6 Pro', 'Pixel 6a',
      'Pixel 7', 'Pixel 7 Pro', 'Pixel 7a', 'Pixel 7 Fold',
      'Pixel 8', 'Pixel 8 Pro', 'Pixel 8a', 'Pixel 8 Fold',
      'Pixel 9', 'Pixel 9 Pro', 'Pixel 9 Pro XL', 'Pixel 9 Pro Fold', 'Pixel 9a',
    ],
  },

  // ──────────────────────────────────────────────
  // OPPO
  // ──────────────────────────────────────────────
  {
    marca: 'OPPO',
    modelos: [
      'Find 7', 'Find X', 'Find X2', 'Find X2 Pro', 'Find X2 Neo', 'Find X2 Lite',
      'Find X3', 'Find X3 Pro', 'Find X3 Neo', 'Find X3 Lite',
      'Find X5', 'Find X5 Pro', 'Find X5 Lite',
      'Find X6', 'Find X6 Pro',
      'Find X7', 'Find X7 Ultra',
      'Reno', 'Reno Z', 'Reno 2', 'Reno 2Z',
      'Reno 3', 'Reno 3 Pro', 'Reno 4', 'Reno 4 Pro',
      'Reno 5', 'Reno 5 Pro', 'Reno 5 Lite',
      'Reno 6', 'Reno 6 Pro', 'Reno 6 Lite',
      'Reno 7', 'Reno 7 Pro', 'Reno 7 Lite',
      'Reno 8', 'Reno 8 Pro', 'Reno 8 Lite', 'Reno 8T',
      'Reno 10', 'Reno 10 Pro', 'Reno 10 Pro+',
      'Reno 12', 'Reno 12 Pro',
      'A9 (2020)', 'A15', 'A16', 'A17', 'A54', 'A74', 'A76',
      'A78 5G', 'A98 5G',
    ],
  },

  // ──────────────────────────────────────────────
  // VIVO
  // ──────────────────────────────────────────────
  {
    marca: 'vivo',
    modelos: [
      'V5', 'V7', 'V9', 'V11', 'V11i', 'V15', 'V15 Pro',
      'V17', 'V17 Pro', 'V19', 'V20', 'V20 Pro', 'V20 SE',
      'V21', 'V21e', 'V23', 'V23e', 'V25', 'V25e', 'V25 Pro',
      'V27', 'V27e', 'V27 Pro', 'V29', 'V29e', 'V29 Pro',
      'V30', 'V30e', 'V30 Pro', 'V40', 'V40 Lite', 'V40 Pro',
      'X50', 'X50 Pro', 'X51 5G', 'X60', 'X60 Pro', 'X60 Pro+',
      'X70', 'X70 Pro', 'X70 Pro+',
      'X80', 'X80 Lite', 'X80 Pro',
      'X90', 'X90 Pro', 'X90 Pro+',
      'X100', 'X100 Pro', 'X100 Ultra',
      'X200', 'X200 Pro', 'X200 Ultra',
      'Y51', 'Y53s', 'Y55', 'Y72', 'Y76',
    ],
  },

  // ──────────────────────────────────────────────
  // REALME
  // ──────────────────────────────────────────────
  {
    marca: 'realme',
    modelos: [
      'Realme 1', 'Realme 2', 'Realme 2 Pro', 'Realme 3', 'Realme 3 Pro',
      'Realme 5', 'Realme 5 Pro', 'Realme 5i', 'Realme 5s',
      'Realme 6', 'Realme 6 Pro', 'Realme 6i', 'Realme 6s',
      'Realme 7', 'Realme 7 Pro', 'Realme 7i',
      'Realme 8', 'Realme 8 Pro', 'Realme 8i', 'Realme 8s 5G',
      'Realme 9', 'Realme 9 Pro', 'Realme 9 Pro+', 'Realme 9i',
      'Realme 10', 'Realme 10 Pro', 'Realme 10 Pro+', 'Realme 10s',
      'Realme 11', 'Realme 11 Pro', 'Realme 11 Pro+', 'Realme 11x',
      'Realme 12', 'Realme 12 Pro', 'Realme 12 Pro+', 'Realme 12x',
      'Realme 13', 'Realme 13 Pro', 'Realme 13 Pro+',
      'Realme GT', 'Realme GT Neo', 'Realme GT Neo 2',
      'Realme GT 2', 'Realme GT 2 Pro',
      'Realme GT 3', 'Realme GT 5', 'Realme GT 6', 'Realme GT 7',
      'Realme GT Master Edition', 'Realme GT Neo 3',
      'Realme C3', 'Realme C11', 'Realme C15', 'Realme C21', 'Realme C25',
      'Realme C30', 'Realme C33', 'Realme C35', 'Realme C51', 'Realme C55', 'Realme C65',
      'Realme Narzo 20', 'Realme Narzo 30', 'Realme Narzo 50',
    ],
  },

  // ──────────────────────────────────────────────
  // NOKIA
  // ──────────────────────────────────────────────
  {
    marca: 'Nokia',
    modelos: [
      'Nokia 3', 'Nokia 5', 'Nokia 6', 'Nokia 8',
      'Nokia 6.1', 'Nokia 6.1 Plus', 'Nokia 7.1', 'Nokia 8.1',
      'Nokia 3.2', 'Nokia 4.2', 'Nokia 6.2', 'Nokia 7.2', 'Nokia 9 PureView',
      'Nokia 2.3', 'Nokia 3.4', 'Nokia 5.4', 'Nokia 8.3 5G',
      'Nokia G20', 'Nokia G50', 'Nokia X20', 'Nokia X10',
      'Nokia G10', 'Nokia C10', 'Nokia C20',
      'Nokia G21', 'Nokia G11', 'Nokia C21',
      'Nokia G400 5G', 'Nokia X30 5G', 'Nokia G60 5G',
      'Nokia C12', 'Nokia C22', 'Nokia C32', 'Nokia G22',
      'Nokia G42 5G', 'Nokia XR21',
    ],
  },

  // ──────────────────────────────────────────────
  // ASUS
  // ──────────────────────────────────────────────
  {
    marca: 'ASUS',
    modelos: [
      'Zenfone 2', 'Zenfone 3', 'Zenfone 4', 'Zenfone 5', 'Zenfone 5Z',
      'Zenfone 6', 'Zenfone 7', 'Zenfone 7 Pro',
      'Zenfone 8', 'Zenfone 8 Flip',
      'Zenfone 9', 'Zenfone 10', 'Zenfone 11 Ultra',
      'ROG Phone', 'ROG Phone II', 'ROG Phone 3',
      'ROG Phone 5', 'ROG Phone 5s', 'ROG Phone 5 Pro', 'ROG Phone 5 Ultimate',
      'ROG Phone 6', 'ROG Phone 6D', 'ROG Phone 6 Pro',
      'ROG Phone 7', 'ROG Phone 7 Ultimate',
      'ROG Phone 8', 'ROG Phone 8 Pro',
    ],
  },

  // ──────────────────────────────────────────────
  // NOTHING
  // ──────────────────────────────────────────────
  {
    marca: 'Nothing',
    modelos: [
      'Nothing Phone (1)',
      'Nothing Phone (2)', 'Nothing Phone (2a)', 'Nothing Phone (2a) Plus',
      'Nothing Phone (3a)', 'Nothing Phone (3a) Pro',
    ],
  },

  // ──────────────────────────────────────────────
  // TCLS / BLACKBERRY / HTC (menos comunes)
  // ──────────────────────────────────────────────
  {
    marca: 'TCL',
    modelos: [
      'TCL 10 Pro', 'TCL 10 Lite', 'TCL 10 5G',
      'TCL 20 Pro 5G', 'TCL 20s', 'TCL 20 SE', 'TCL 20 5G',
      'TCL 30', 'TCL 30+', 'TCL 30 5G', 'TCL 30 SE',
      'TCL 40 SE', 'TCL 40 NxtPaper 5G',
      'TCL Plex',
    ],
  },
  {
    marca: 'BlackBerry',
    modelos: [
      'BlackBerry Priv', 'BlackBerry DTEK50', 'BlackBerry DTEK60',
      'BlackBerry KEYone', 'BlackBerry Motion',
      'BlackBerry KEY2', 'BlackBerry KEY2 LE',
      'BlackBerry Evolve', 'BlackBerry Evolve X',
    ],
  },
  {
    marca: 'HTC',
    modelos: [
      'HTC One M9', 'HTC One A9', 'HTC 10',
      'HTC U Ultra', 'HTC U Play', 'HTC U11', 'HTC U11+', 'HTC U11 Life',
      'HTC U12+', 'HTC U19e', 'HTC Desire 21 Pro 5G',
      'HTC Wildfire E3', 'HTC Wildfire E Plus',
    ],
  },

  // ──────────────────────────────────────────────
  // ZTE / nubia
  // ──────────────────────────────────────────────
  {
    marca: 'ZTE',
    modelos: [
      'Axon 7', 'Axon 9 Pro', 'Axon 10 Pro', 'Axon 11 SE',
      'Axon 20 5G', 'Axon 30 Pro', 'Axon 40 Ultra',
      'Blade A5 (2020)', 'Blade A51', 'Blade A71',
      'ZTE Nubia Z11', 'ZTE Nubia Z17', 'ZTE Nubia Z18',
      'ZTE Nubia Red Magic', 'ZTE Nubia Red Magic 5G', 'ZTE Nubia Red Magic 6 Pro',
      'ZTE Nubia Red Magic 7 Pro', 'ZTE Nubia Red Magic 8 Pro', 'ZTE Nubia Red Magic 9 Pro',
    ],
  },

  // ──────────────────────────────────────────────
  // HONOR
  // ──────────────────────────────────────────────
  {
    marca: 'Honor',
    modelos: [
      'Honor 8', 'Honor 9', 'Honor 10', 'Honor 10 Lite',
      'Honor 20', 'Honor 20 Pro', 'Honor View 20',
      'Honor 50', 'Honor 50 Pro', 'Honor 60', 'Honor 70', 'Honor 80',
      'Honor 90', 'Honor 90 Pro', 'Honor 100', 'Honor 100 Pro',
      'Honor 200', 'Honor 200 Pro', 'Honor 200 Lite',
      'Honor Magic 4', 'Honor Magic 4 Pro', 'Honor Magic 4 Ultimate',
      'Honor Magic 5', 'Honor Magic 5 Pro', 'Honor Magic 5 Ultimate',
      'Honor Magic 6', 'Honor Magic 6 Pro', 'Honor Magic 6 RSR',
      'Honor Magic V', 'Honor Magic V2', 'Honor Magic V3',
      'Honor X7', 'Honor X8', 'Honor X9', 'Honor X9a',
      'Honor X9b', 'Honor X9c',
    ],
  },
];

async function main() {
  console.log('🌱 Iniciando seed de catálogo de teléfonos...\n');

  let totalMarcas = 0;
  let totalModelos = 0;

  for (const item of catalog) {
    const brand = await prisma.brands.create({
      data: {
        marca: item.marca,
        usuario: USUARIO_ID,
        tenantId: TENANT_ID,
        Modelos: {
          create: item.modelos.map((nombre) => ({
            nombre,
            usuarioId: USUARIO_ID,
            tenantId: TENANT_ID,
          })),
        },
      },
      include: { Modelos: true },
    });

    totalMarcas++;
    totalModelos += brand.Modelos.length;
    console.log(`✅ ${brand.marca} — ${brand.Modelos.length} modelos`);
  }

  console.log(`\n🎉 Seed completado:`);
  console.log(`   Marcas:  ${totalMarcas}`);
  console.log(`   Modelos: ${totalModelos}`);
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());