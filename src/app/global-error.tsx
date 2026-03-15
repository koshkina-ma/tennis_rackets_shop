"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ru">
      <body>
        <main
          style={{
            maxWidth: "1100px",
            margin: "40px auto",
            padding: "0 20px",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <section style={{ marginBottom: "40px" }}>
            <h1 style={{ marginBottom: "16px" }}>Что-то пошло не так</h1>
            <p>Критическая ошибка приложения. Попробуйте обновить страницу.</p>
            <button
              type="button"
              onClick={() => reset()}
              style={{
                marginTop: "16px",
                padding: "8px 16px",
                cursor: "pointer",
              }}
            >
              Попробовать снова
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
