<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Favicons & App Icons -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap">


    <!-- Global Error Catcher -->
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

        window.onerror = function(message, source, lineno, colno, error) {
            const el = document.createElement('div');
            el.style = 'color:red; background:white; padding:20px; z-index:9999; position:fixed; top:0; left:0; width:100%; word-wrap: break-word;';
            el.innerHTML = '<h1>Global Error</h1><pre>' + message + '\n' + (error ? error.stack : '') + '</pre>';
            document.body.appendChild(el);
        };
        window.addEventListener('unhandledrejection', function(event) {
            const el = document.createElement('div');
            el.style = 'color:white; background:red; padding:20px; z-index:9999; position:fixed; top:200px; left:0; width:100%; word-wrap: break-word;';
            el.innerHTML = '<h1>Promise Rejection</h1><pre>' + (event.reason ? event.reason.stack || event.reason : 'Unknown') + '</pre>';
            document.body.appendChild(el);
        });
    </script>

    <!-- Monetization (Google AdSense) -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6228787275246149" crossorigin="anonymous"></script>

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    <div id="app" data-page="{{ json_encode($page) }}"></div>
</body>

</html>