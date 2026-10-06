const fs = require('fs');
const path = require('path');

const dir = path.join('d:', 'Zenstay', 'zenstay', 'apps', 'api', 'src', 'controllers');
const map = {
  'invoice': 'invoice',
  'lead': 'lead',
  'maintenance': 'maintenanceRequest',
  'owner': 'owner',
  'payment': 'payment',
  'task': 'task',
  'tenant': 'tenant',
  'traveler': 'traveler',
  'user': 'user'
};

fs.readdirSync(dir).forEach(f => {
  if (!f.endsWith('.controller.ts')) return;
  const key = f.replace('.controller.ts', '');
  let content = fs.readFileSync(path.join(dir, f), 'utf8');
  if (content.includes('prisma..')) {
    if (map[key]) {
      content = content.replace('prisma..', `prisma.${map[key]}.`);
    } else {
      content = content.replace('const data = await prisma..findMany({ where: { tenantId } });\n      return res.json(data);', "return res.json({ message: 'Not implemented' });");
    }
    fs.writeFileSync(path.join(dir, f), content);
  }
});

console.log('Done');
