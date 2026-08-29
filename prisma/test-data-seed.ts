import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcrypt';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL no está configurada');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString,
    ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
  }),
});

const TEST_TENANT_ID = '10000000-0000-4000-8000-000000000001';
const TEST_USER_ID = '20000000-0000-4000-8000-000000000001';
const TEST_EMAIL = 'admin.pruebas@tstools.local';
const TEST_USERNAME = 'admin_pruebas';
const TEST_PASSWORD = 'Pruebas123!';
const TEST_TRACKING_TOKEN = 'test-order-iphone-15-screen';

async function findOrCreateBrand(marca: string) {
  const existing = await prisma.brands.findFirst({
    where: { marca, tenantId: null },
  });

  return (
    existing ??
    prisma.brands.create({
      data: { marca, usuario: TEST_USER_ID, tenantId: null },
    })
  );
}

async function findOrCreateModel(brandId: number, nombre: string) {
  const existing = await prisma.models.findFirst({
    where: { brandId, nombre, tenantId: null },
  });

  return (
    existing ??
    prisma.models.create({
      data: {
        brandId,
        nombre,
        usuarioId: TEST_USER_ID,
        tenantId: null,
      },
    })
  );
}

async function main() {
  console.log('Preparando datos de prueba completos...');

  await prisma.tenant.upsert({
    where: { id: TEST_TENANT_ID },
    update: { nombre: 'TSTools Sucursal de Pruebas' },
    create: {
      id: TEST_TENANT_ID,
      nombre: 'TSTools Sucursal de Pruebas',
    },
  });

  const password = await bcrypt.hash(TEST_PASSWORD, 10);
  const user = await prisma.user.upsert({
    where: { email: TEST_EMAIL },
    update: {
      usuario: TEST_USERNAME,
      password,
      activo: true,
      tenantId: TEST_TENANT_ID,
      login_intentos: 0,
      bloqueado_hasta: null,
    },
    create: {
      id: TEST_USER_ID,
      usuario: TEST_USERNAME,
      email: TEST_EMAIL,
      password,
      activo: true,
      tenantId: TEST_TENANT_ID,
    },
  });

  const apple = await findOrCreateBrand('Apple');
  const samsung = await findOrCreateBrand('Samsung');
  const iphone15 = await findOrCreateModel(apple.id, 'iPhone 15');
  const iphone14 = await findOrCreateModel(apple.id, 'iPhone 14');
  const galaxyS24 = await findOrCreateModel(samsung.id, 'Galaxy S24');

  const device =
    (await prisma.devices.findFirst({ where: { nombre: 'Celular' } })) ??
    (await prisma.devices.create({ data: { nombre: 'Celular' } }));

  const serviceType =
    (await prisma.serviceTypes.findFirst({
      where: { nombre: 'Reparación' },
    })) ??
    (await prisma.serviceTypes.create({
      data: {
        nombre: 'Reparación',
        descripcion: 'Reparaciones físicas y electrónicas',
        activo: true,
      },
    }));

  const screenConcept =
    (await prisma.concept.findFirst({
      where: {
        nombre: 'Cambio de pantalla',
        serviceTypeId: serviceType.id,
      },
    })) ??
    (await prisma.concept.create({
      data: {
        nombre: 'Cambio de pantalla',
        serviceTypeId: serviceType.id,
      },
    }));

  const existingService = await prisma.services.findFirst({
    where: {
      tenantId: TEST_TENANT_ID,
      tipo_servicio: serviceType.id,
      equipoId: device.id,
      conceptoId: screenConcept.id,
      marcaId: apple.id,
      modeloId: iphone15.id,
    },
  });

  const serviceData = {
    garantia: '30 días',
    precio_publico: '2499.00',
    precio_mayorista: '2199.00',
    notas: 'Servicio generado por la semilla de pruebas',
    proceso: 'Diagnóstico, desmontaje, reemplazo y pruebas funcionales',
    activo: true,
  };

  const service = existingService
    ? await prisma.services.update({
        where: { id: existingService.id },
        data: serviceData,
      })
    : await prisma.services.create({
        data: {
          ...serviceData,
          tenantId: TEST_TENANT_ID,
          tipo_servicio: serviceType.id,
          equipoId: device.id,
          conceptoId: screenConcept.id,
          marcaId: apple.id,
          modeloId: iphone15.id,
        },
      });

  const client =
    (await prisma.clients.findFirst({
      where: { telefono: '5550001000', tenantId: TEST_TENANT_ID },
    })) ??
    (await prisma.clients.create({
      data: {
        nombre: 'Cliente de Pruebas',
        telefono: '5550001000',
        segundoTelefono: '5550001001',
        direccion: 'Av. Pruebas 100, Ciudad de México',
        tipo: 'PUBLICO',
        creador: user.id,
        tenantId: TEST_TENANT_ID,
      },
    }));

  const technical =
    (await prisma.technical.findFirst({
      where: { nombre: 'Técnico de Pruebas', tenantId: TEST_TENANT_ID },
    })) ??
    (await prisma.technical.create({
      data: {
        nombre: 'Técnico de Pruebas',
        usuarioId: user.id,
        tenantId: TEST_TENANT_ID,
      },
    }));

  const order = await prisma.orders.upsert({
    where: { trackingToken: TEST_TRACKING_TOKEN },
    update: {
      clienteId: client.id,
      marcaId: apple.id,
      modeloId: iphone15.id,
      servicioId: service.id,
      atendio: user.id,
      tecnicoId: technical.id,
      tenantId: TEST_TENANT_ID,
      estado: 'ENPROCESO',
      estado_pago: 'DEBE',
      total: '2499.00',
      totalPagado: '1000.00',
    },
    create: {
      clienteId: client.id,
      marcaId: apple.id,
      modeloId: iphone15.id,
      servicioId: service.id,
      atendio: user.id,
      tecnicoId: technical.id,
      tenantId: TEST_TENANT_ID,
      estado: 'ENPROCESO',
      estado_pago: 'DEBE',
      total: '2499.00',
      totalPagado: '1000.00',
      descripcion: 'Pantalla rota; el táctil responde parcialmente',
      imei: '356789012345678',
      enciende: true,
      bateria: true,
      bandejaSim: true,
      golpes: true,
      mojado: false,
      garantia: 30,
      trackingToken: TEST_TRACKING_TOKEN,
    },
  });

  await prisma.$transaction([
    prisma.observaciones.deleteMany({ where: { ordenId: order.id } }),
    prisma.comentarios.deleteMany({ where: { ordenId: order.id } }),
    prisma.imagesObservations.deleteMany({ where: { ordenId: order.id } }),
    prisma.imagesComments.deleteMany({ where: { ordenId: order.id } }),
  ]);

  await prisma.$transaction([
    prisma.observaciones.create({
      data: {
        ordenId: order.id,
        observacion: 'Equipo recibido con cristal estrellado.',
      },
    }),
    prisma.comentarios.create({
      data: {
        ordenId: order.id,
        comentario: 'Refacción solicitada; pendiente de instalación.',
      },
    }),
    prisma.imagesObservations.create({
      data: {
        ordenId: order.id,
        imageURL: 'https://placehold.co/800x600?text=Equipo+recibido',
      },
    }),
    prisma.imagesComments.create({
      data: {
        ordenId: order.id,
        imageURL: 'https://placehold.co/800x600?text=Diagnostico',
      },
    }),
  ]);

  const products = [
    {
      sku: 'GLOBAL-MICA-IP15',
      nombre: 'Mica de cristal iPhone 15',
      descripcion: 'Protector de pantalla de cristal templado',
      categoria: 'Protección',
      costo: '45.00',
      precio_publico: '149.00',
      precio_mayorista: '99.00',
      stock: 30,
      stockMinimo: 8,
      activo: true,
      marcaId: apple.id,
      modeloId: iphone15.id,
    },
    {
      sku: 'GLOBAL-FUNDA-IP14',
      nombre: 'Funda antigolpes iPhone 14',
      descripcion: 'Funda transparente reforzada',
      categoria: 'Fundas',
      costo: '80.00',
      precio_publico: '249.00',
      precio_mayorista: '179.00',
      stock: 4,
      stockMinimo: 5,
      activo: true,
      marcaId: apple.id,
      modeloId: iphone14.id,
    },
    {
      sku: 'GLOBAL-CARGADOR-25W',
      nombre: 'Cargador USB-C 25W',
      descripcion: 'Adaptador de carga rápida',
      categoria: 'Cargadores',
      costo: '180.00',
      precio_publico: '399.00',
      precio_mayorista: '319.00',
      stock: 18,
      stockMinimo: 5,
      activo: true,
      marcaId: samsung.id,
      modeloId: galaxyS24.id,
    },
    {
      sku: 'GLOBAL-CABLE-USBC-1M',
      nombre: 'Cable USB-C de 1 metro',
      descripcion: 'Cable de carga y transferencia de datos',
      categoria: 'Cables',
      costo: '35.00',
      precio_publico: '129.00',
      precio_mayorista: '89.00',
      stock: 0,
      stockMinimo: 10,
      activo: false,
      marcaId: null,
      modeloId: null,
    },
  ];

  for (const product of products) {
    await prisma.products.upsert({
      where: { sku: product.sku },
      update: { ...product, creadorId: user.id },
      create: { ...product, creadorId: user.id },
    });
  }

  console.log('Semilla completada correctamente.');
  console.log(`Usuario: ${TEST_USERNAME}`);
  console.log(`Contraseña: ${TEST_PASSWORD}`);
  console.log(`Tenant: ${TEST_TENANT_ID}`);
  console.log(`Seguimiento: ${TEST_TRACKING_TOKEN}`);
  console.log(`Productos globales: ${products.length}`);
}

main()
  .catch((error: unknown) => {
    console.error('No fue posible ejecutar la semilla:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
