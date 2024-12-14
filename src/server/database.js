const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "jakko",
  database: "testWad",
  host: "localhost",
  port: "5432",
});

const execute = async (query1, query2) => {
  try {
    await pool.connect();
    await pool.query(query1);
    await pool.query(query2);
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  }
};

const createTblQuery1 = `
    CREATE TABLE IF NOT EXISTS "posttable" (
	    "id" SERIAL PRIMARY KEY,         
	    "title" VARCHAR(200) NOT NULL,
	    "body" VARCHAR(200) NOT NULL,
      "date" VARCHAR(200) NOT NULL,
      "urllink" VARCHAR(200)  
    );`;

const createTblQuery2 = `
    CREATE TABLE IF NOT EXISTS "users" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(200) NOT NULL UNIQUE,
        password VARCHAR(200) NOT NULL 
    );`;

// A function to execute the previous query
execute(createTblQuery1, createTblQuery2).then((result) => {
  if (result) {
    console.log(
      'If does not exists, table "users" and  table "posttable" are created'
    );
  }
});

module.exports = pool;
