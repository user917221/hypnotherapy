const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const users = await prisma.user.findMany({ take: 1 });
        console.log('Connexion réussie ! Premier utilisateur trouvé :', users[0]?.email || 'Aucun utilisateur');
    } catch (e) {
        console.error('Erreur de connexion Prisma :', e.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
