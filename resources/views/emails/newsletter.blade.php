<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechyNews Weekly</title>
    <style>
        /* Modern Email Reset & Typography */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #02040a; /* Dark background */
            color: #ffffff;
            -webkit-font-smoothing: antialiased;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #0a0f1c;
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 16px;
            overflow: hidden;
            margin-top: 40px;
            margin-bottom: 40px;
        }
        /* Header section with glow effect */
        .header {
            background-color: #02040a;
            padding: 50px 30px;
            text-align: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            background-image: radial-gradient(circle at center, rgba(43, 124, 238, 0.15) 0%, transparent 70%);
        }
        .header img {
            height: 30px;
            margin-bottom: 20px;
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 32px;
            font-weight: 900;
            letter-spacing: -1px;
            line-height: 1.1;
        }
        .header h1 span {
            color: #2b7cee; /* TechyNews Primary Blue */
        }
        .header p {
            color: #888888;
            margin: 15px 0 0 0;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 3px;
            font-weight: 700;
        }
        /* Content Body */
        .content {
            padding: 40px 30px;
            background-color: #0a0f1c;
        }
        .article {
            margin-bottom: 45px;
            padding-bottom: 45px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .article:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
        }
        .article-img-wrapper {
            border-radius: 12px;
            overflow: hidden;
            margin-bottom: 20px;
            background-color: #111827;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .article img {
            width: 100%;
            height: auto;
            display: block;
        }
        .article h2 {
            margin: 0 0 12px 0;
            font-size: 24px;
            line-height: 1.3;
            font-weight: 800;
            letter-spacing: -0.5px;
        }
        .article h2 a {
            color: #ffffff;
            text-decoration: none;
        }
        .article p {
            color: #9ca3af;
            margin: 0 0 20px 0;
            font-size: 16px;
            line-height: 1.6;
        }
        /* Primary Button */
        .btn {
            display: inline-block;
            background-color: #ffffff;
            color: #000000;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 700;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: all 0.2s;
        }
        .btn:hover {
            background-color: #f3f4f6;
        }
        /* Footer */
        .footer {
            background-color: #02040a;
            padding: 40px 30px;
            text-align: center;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        .footer p {
            color: #6b7280;
            font-size: 12px;
            margin: 0 0 10px 0;
            line-height: 1.5;
        }
        .footer a {
            color: #2b7cee;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div style="background-color: #02040a; padding: 20px 0;">
        <div class="container">
            <div class="header">
                <!-- Using a placeholder logo if actual isn't passed, in email we need absolute URLs -->
                <h1>Intelligence <span>Delivered</span>.</h1>
                <p>Your Weekly Tech Signals</p>
            </div>
            
            <div class="content">
                @foreach($articles as $article)
                <div class="article">
                    @if($article->cover_image_path)
                    <div class="article-img-wrapper">
                        <img src="{{ url(str_starts_with($article->cover_image_path, 'http') ? $article->cover_image_path : '/storage/' . $article->cover_image_path) }}" alt="{{ $article->title }}">
                    </div>
                    @endif
                    <h2><a href="{{ url('/article/' . $article->slug) }}">{{ $article->title }}</a></h2>
                    <p>{{ $article->ai_summary ?? Str::limit(strip_tags($article->content), 150) }}</p>
                    <a href="{{ url('/article/' . $article->slug) }}" class="btn">Read Article</a>
                </div>
                @endforeach
            </div>
            
            <div class="footer">
                <p>You received this email because you are subscribed to the TechyNews weekly brief.</p>
                <p>To unsubscribe, <a href="{{ url('/') }}">manage your preferences here</a>.</p>
                <p>&copy; {{ date('Y') }} TechyNews. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>
</html>
