use once_cell::sync::OnceCell;
use sqlx::{sqlite::SqliteConnectOptions, SqlitePool};

pub static DATABASE: OnceCell<sqlx::SqlitePool> = OnceCell::new();

pub async fn get_db() -> &'static sqlx::SqlitePool {
    DATABASE.get().unwrap()
}

pub async fn initialize_db() -> anyhow::Result<()> {
    let database_file = std::env::var("DB_PATH").unwrap_or_else(|_| "database.db".to_string());

    let opts = SqliteConnectOptions::default()
        .filename(&database_file)
        .create_if_missing(true)
        .foreign_keys(true)
        .journal_mode(sqlx::sqlite::SqliteJournalMode::Wal)
        .synchronous(sqlx::sqlite::SqliteSynchronous::Normal)
        .page_size(8192)
        .pragma("temp_store", "MEMORY")
        .pragma("mmap_size", "8589934592");

    let db = SqlitePool::connect_with(opts).await?;
    sqlx::migrate!("./db-migrations").run(&db).await?;

    DATABASE
        .set(db)
        .map_err(|_| anyhow::anyhow!("Couldn't set DATABASE. OnceCell is full already!"))?;

    Ok(())
}
