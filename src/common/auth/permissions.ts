export const PERMISSIONS = [
  'view_dashboard', 'view_orders', 'create_orders', 'edit_orders', 'delete_orders',
  'view_services', 'create_services', 'edit_services', 'delete_services',
  'view_inventory', 'create_inventory', 'edit_inventory', 'delete_inventory',
  'view_sales', 'create_sales', 'edit_sales', 'delete_sales',
  'view_finances', 'create_finances', 'edit_finances', 'delete_finances',
  'view_reports', 'export_reports', 'view_clients', 'create_clients',
  'edit_clients', 'delete_clients', 'view_appointments', 'create_appointments',
  'edit_appointments', 'delete_appointments', 'view_users', 'create_users',
  'edit_users', 'delete_users', 'manage_roles', 'view_settings', 'edit_settings',
] as const;

export type Permission = (typeof PERMISSIONS)[number];
