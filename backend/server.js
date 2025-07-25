const app = require('./src/app');
const { createUsersTable } = require('./src/utils/database');

const PORT = process.env.PORT || 5000;

const initDatabase = async () => {
  try {
    await createUsersTable();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    process.exit(1);
  }
};

const startServer = async () => {
  await initDatabase();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
  });
};

startServer();