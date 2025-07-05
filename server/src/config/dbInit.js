const sequelize = require('./db');

const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized');
  } catch (error) {
    console.error('Unable to sync database:', error);
    throw error;
  }
};

const resetIdSequences = async () => {
  try {
    await sequelize.query(
      `SELECT setval('"Quotes_id_seq"', (SELECT MAX(id) FROM "Quotes"));`
    );
    await sequelize.query(
      `SELECT setval('"Categories_id_seq"', (SELECT MAX(id) FROM "Categories"));`
    );
    console.log('Quotes and Categories ID Sequences reset');
  } catch (error) {
    console.error('Unable to reset ID sequences:', error);
    throw error;
  }
};

const dbInit = async () => {
  await syncDatabase();
  await resetIdSequences();
};

module.exports = dbInit;
