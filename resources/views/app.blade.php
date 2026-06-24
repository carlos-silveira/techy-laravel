<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'TechyNews') }}</title>
    <meta name="description" content="Plataforma líder en periodismo tecnológico impulsado por Inteligencia Artificial. IA, startups, ciberseguridad y el futuro de la tecnología." />
    <meta name="description" inertia content="TechyNews: Inteligencia Artificial y Periodismo Tecnológico" />
    <meta name="google-site-verification" content="COpjFK5aGPvLfkTW5lZCSaAtmjDfxJMEsLS3XcwMYw8" />

    @if(isset($meta))
        <meta property="og:title" content="{{ $meta['title'] }}">
        <meta property="og:description" content="{{ $meta['description'] }}">
        <meta property="og:url" content="{{ $meta['url'] }}">
        <meta property="og:type" content="article">
        <meta name="twitter:card" content="summary_large_image">
        @if(!empty($meta['image']))
            <meta property="og:image" content="{!! $meta['image'] !!}">
        @endif
    @else
        <meta property="og:title" content="TechyNews — Noticias de Tecnología con IA">
        <meta property="og:description" content="Plataforma líder en periodismo tecnológico impulsado por Inteligencia Artificial. IA, startups, ciberseguridad y el futuro de la tecnología.">
        <meta property="og:type" content="website">
        <meta property="og:image" content="https://techynews.lat/img/logo_wbc.png">
        <meta property="og:site_name" content="TechyNews">
        <meta name="twitter:card" content="summary">
        <meta name="twitter:site" content="@TechyNewsLat">
        <meta name="twitter:title" content="TechyNews — Noticias de Tecnología con IA">
        <meta name="twitter:description" content="Plataforma líder en periodismo tecnológico impulsado por Inteligencia Artificial.">
    @endif

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-PJF86HK6PG"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-PJF86HK6PG');
    </script>
    <!-- Favicons & App Icons (Optimized for Google Search) -->
    <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png?v=2">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=2">
    <link rel="icon" type="image/x-icon" href="/favicon.ico?v=2">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2">
    <link rel="manifest" href="/manifest.webmanifest">

    <!-- Fonts (Non-blocking) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" media="print" onload="this.media='all'">
    <noscript>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap">
    </noscript>


    <!-- Global Error Catcher / Theme Init -->
    <script>
        // Theme initialization
        (function() {
            const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        })();

        // Fallback friendly error logging without breaking UI
        window.onerror = function(message, source, lineno, colno, error) {
            console.error("[Global Error]", message, error);
        };
        window.addEventListener('unhandledrejection', function(event) {
            console.error("[Promise Rejection]", event.reason);
        });
    </script>

    <!-- Monetization (Google AdSense) -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6228787275246149" crossorigin="anonymous"></script>

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>