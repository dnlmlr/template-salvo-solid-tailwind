mod database;
mod static_assets;

use database::{initialize_db, get_db};
use salvo::prelude::*;
use static_assets::route_static_assets;

#[tokio::main]
pub async fn main() -> anyhow::Result<()> {
    tracing_subscriber::fmt().init();

    initialize_db().await.unwrap();
    get_db().await;

    let router = Router::new()
        .push(Router::with_path("/hello").get(get_hello_world))
        .push(route_static_assets());

    let listener = TcpListener::new("0.0.0.0:8080").bind().await;
    Server::new(listener).serve(router).await;
    Ok(())
}

#[handler]
async fn get_hello_world() -> &'static str {
    "Hello world"
}
