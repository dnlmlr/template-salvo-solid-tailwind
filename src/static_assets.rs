use salvo::{hyper::header, prelude::*};

#[derive(rust_embed::RustEmbed)]
#[folder = "frontend/dist"]
struct Asset;

/// Serve the static assets in a catch-all route. This needs to be pushed as the last router in
/// order to not block other routes
pub fn route_static_assets() -> Router {
    Router::with_path("/<**>")
        .get(get_static_embed)
        .hoop(
            Compression::new()
                .enable_gzip(CompressionLevel::Fastest)
                .enable_brotli(CompressionLevel::Fastest)
                .enable_deflate(CompressionLevel::Fastest)
                .enable_zstd(CompressionLevel::Fastest),
        )
        .hoop(CachingHeaders::new())
}

#[handler]
async fn get_static_embed(req: &mut Request, res: &mut Response) {
    let path: String = req.param("**").unwrap_or_default();
    let path = match path.as_ref() {
        "" => "index.html",
        _ => path.as_ref(),
    };

    match Asset::get(&path) {
        Some(content) => {
            let body: Vec<u8> = content.data.into();
            let mime = mime_guess::from_path(path).first_or_octet_stream();

            res.add_header(header::CONTENT_TYPE, mime.as_ref(), true)
                .unwrap();
            res.write_body(body).unwrap();
        }
        None => {
            res.status_code(StatusCode::NOT_FOUND);
        }
    }
}
