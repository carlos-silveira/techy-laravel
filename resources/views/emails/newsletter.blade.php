<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta name="color-scheme" content="dark">
    <meta name="supported-color-schemes" content="dark">
    <title>TechyNews Weekly Briefing</title>
    <!--[if mso]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <style>
        table {border-collapse: collapse;}
        .mso-font {font-family: Arial, sans-serif !important;}
    </style>
    <![endif]-->
    <style type="text/css">
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap');
        
        /* Reset */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
        
        /* Base */
        body { margin: 0; padding: 0; width: 100% !important; background-color: #02040a; }
        table { border-collapse: collapse !important; }
        a { text-decoration: none; }
        
        /* Typography */
        .text-main { font-family: 'Inter', -apple-system, BlinkMacSystemFont, Arial, sans-serif; }
        
        /* Hover Effects */
        .hover-scale:hover { transform: scale(1.05); }
        .btn-hover:hover { background-color: #e5e7eb !important; }
        
        /* Responsive */
        @media screen and (max-width: 600px) {
            .container { width: 100% !important; max-width: 100% !important; }
            .mobile-padding { padding: 20px !important; }
            .hero-title { font-size: 32px !important; line-height: 38px !important; }
            .article-title { font-size: 22px !important; }
            .stack-column { display: block !important; width: 100% !important; max-width: 100% !important; direction: ltr !important; }
            .stack-img { width: 100% !important; height: auto !important; margin-bottom: 15px !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #02040a; -webkit-font-smoothing: antialiased;">
    <!-- Preheader (Hidden) -->
    <div style="display: none; max-height: 0px; overflow: hidden; color: #02040a; font-size: 0px; line-height: 0px; mso-hide: all;">
        Your weekly dose of tech intelligence. {{ $articles->first()->title ?? 'Discover the latest signals in AI and tech.' }}
        &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
    </div>

    <center style="width: 100%; background-color: #02040a;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #02040a;">
            <tr>
                <td align="center" style="padding: 40px 0;">
                    <!--[if (gte mso 9)|(IE)]>
                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600"><tr><td align="center" valign="top">
                    <![endif]-->

                    <!-- MAIN CONTAINER -->
                    <table class="container" align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; width: 100%; background-color: #0a0f1c; border-radius: 24px; overflow: hidden; border: 1px solid #1f2937;">
                        
                        <!-- HEADER WITH NEON GLOW EFFECT -->
                        <tr>
                            <td align="center" style="padding: 60px 40px; background-color: #02040a; background-image: radial-gradient(circle at center, rgba(43, 124, 238, 0.25) 0%, transparent 60%); border-bottom: 1px solid #1f2937;" class="mobile-padding">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="center" style="padding-bottom: 25px;">
                                            <a href="{{ config('app.url') }}" target="_blank">
                                                <img src="{{ url('/img/logo_wbc.png') }}" alt="TechyNews" width="140" style="display: block; width: 140px; max-width: 100%; height: auto;" />
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center">
                                            <h1 class="text-main hero-title" style="margin: 0; color: #ffffff; font-size: 42px; font-weight: 900; letter-spacing: -1.5px; line-height: 48px;">
                                                Intelligence<br><span style="color: #2b7cee;">Delivered.</span>
                                            </h1>
                                            <p class="text-main" style="margin: 20px 0 0 0; color: #9ca3af; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 4px;">
                                                Weekly Signals // {{ date('M d, Y') }}
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- ARTICLES LOOP -->
                        @foreach($articles as $index => $article)
                        <tr>
                            <td align="center" style="padding: 40px; border-bottom: 1px solid #1f2937; background-color: #0a0f1c;" class="mobile-padding">
                                @if($index === 0)
                                    <!-- FEATURED ARTICLE (Full Width) -->
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr>
                                            <td align="left" style="padding-bottom: 15px;">
                                                <span class="text-main" style="background-color: rgba(43,124,238,0.15); color: #60a5fa; padding: 6px 12px; border-radius: 20px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; border: 1px solid rgba(43,124,238,0.3);">
                                                    ★ Featured Story
                                                </span>
                                            </td>
                                        </tr>
                                        @if($article->final_image_url)
                                        <tr>
                                            <td align="center" style="padding-bottom: 25px;">
                                                <a href="{{ url('/article/' . $article->slug) }}?utm_source=newsletter&utm_medium=email&utm_campaign=weekly_newsletter" target="_blank">
                                                    <img src="{{ $article->final_image_url }}" alt="{{ $article->title }}" width="520" style="display: block; width: 100%; max-width: 520px; height: auto; border-radius: 16px; border: 1px solid #1f2937;" />
                                                </a>
                                            </td>
                                        </tr>
                                        @endif
                                        <tr>
                                            <td align="left">
                                                <h2 class="text-main article-title" style="margin: 0 0 15px 0; font-size: 28px; font-weight: 800; line-height: 34px; letter-spacing: -0.5px;">
                                                    <a href="{{ url('/article/' . $article->slug) }}?utm_source=newsletter&utm_medium=email&utm_campaign=weekly_newsletter" style="color: #ffffff; text-decoration: none;">{{ $article->title }}</a>
                                                </h2>
                                                <p class="text-main" style="margin: 0 0 25px 0; color: #9ca3af; font-size: 16px; line-height: 26px;">
                                                    {{ $article->ai_summary ?? Str::limit(strip_tags($article->content), 200) }}
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="left">
                                                <!-- Bulletproof Button -->
                                                <table border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td align="center" style="border-radius: 8px;" bgcolor="#ffffff">
                                                            <a href="{{ url('/article/' . $article->slug) }}?utm_source=newsletter&utm_medium=email&utm_campaign=weekly_newsletter" target="_blank" class="text-main btn-hover" style="font-size: 14px; font-weight: 800; color: #02040a; text-decoration: none; padding: 14px 28px; border-radius: 8px; display: inline-block; text-transform: uppercase; letter-spacing: 1px;">
                                                                Read Full Signal &rarr;
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                @else
                                    <!-- STANDARD ARTICLE (Two Column Layout for Desktop, Stacked for Mobile) -->
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" dir="rtl">
                                        <tr>
                                            <!-- Right Column (Image) -->
                                            <th class="stack-column" width="220" align="right" valign="top" style="font-weight: normal; margin: 0; padding: 0;">
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%" dir="ltr">
                                                    <tr>
                                                        <td align="center">
                                                            @if($article->final_image_url)
                                                            <a href="{{ url('/article/' . $article->slug) }}?utm_source=newsletter&utm_medium=email&utm_campaign=weekly_newsletter" target="_blank">
                                                                <img class="stack-img" src="{{ $article->final_image_url }}" alt="{{ $article->title }}" width="220" style="display: block; width: 100%; max-width: 220px; height: auto; border-radius: 12px; border: 1px solid #1f2937;" />
                                                            </a>
                                                            @endif
                                                        </td>
                                                    </tr>
                                                </table>
                                            </th>
                                            
                                            <!-- Spacer -->
                                            <th class="stack-column" width="30" height="20" style="font-weight: normal; margin: 0; padding: 0;"></th>

                                            <!-- Left Column (Text) -->
                                            <th class="stack-column" width="270" align="left" valign="top" style="font-weight: normal; margin: 0; padding: 0;" dir="ltr">
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                    <tr>
                                                        <td align="left">
                                                            <span class="text-main" style="color: #6b7280; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">LATEST INTEL</span>
                                                            <h2 class="text-main" style="margin: 8px 0 10px 0; font-size: 18px; font-weight: 800; line-height: 24px; letter-spacing: -0.3px;">
                                                                <a href="{{ url('/article/' . $article->slug) }}?utm_source=newsletter&utm_medium=email&utm_campaign=weekly_newsletter" style="color: #ffffff; text-decoration: none;">{{ $article->title }}</a>
                                                            </h2>
                                                            <p class="text-main" style="margin: 0 0 15px 0; color: #9ca3af; font-size: 14px; line-height: 22px;">
                                                                {{ Str::limit($article->ai_summary ?? strip_tags($article->content), 90) }}
                                                            </p>
                                                            <a href="{{ url('/article/' . $article->slug) }}?utm_source=newsletter&utm_medium=email&utm_campaign=weekly_newsletter" target="_blank" class="text-main" style="color: #60a5fa; font-size: 13px; font-weight: 700; text-decoration: none;">
                                                                Dive deeper &rarr;
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </th>
                                        </tr>
                                    </table>
                                @endif
                            </td>
                        </tr>
                        @endforeach

                        <!-- FOOTER -->
                        <tr>
                            <td align="center" style="padding: 40px; background-color: #02040a;" class="mobile-padding">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="center" style="padding-bottom: 20px;">
                                            <a href="https://x.com/techynewslat" target="_blank" style="display: inline-block; margin: 0 10px;">
                                                <!-- X / Twitter Icon -->
                                                <img src="https://img.icons8.com/ios-filled/50/ffffff/twitterx--v1.png" width="24" height="24" alt="X" style="opacity: 0.6;" />
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center">
                                            <p class="text-main" style="margin: 0 0 10px 0; color: #6b7280; font-size: 12px; line-height: 18px;">
                                                This intelligence brief was sent to you because you joined the TechyNews network.
                                            </p>
                                            <p class="text-main" style="margin: 0 0 20px 0; color: #6b7280; font-size: 12px;">
                                                <a href="{{ url('/') }}" style="color: #60a5fa; text-decoration: underline;">Update Preferences</a> &nbsp;|&nbsp; <a href="{{ url('/') }}" style="color: #60a5fa; text-decoration: underline;">Unsubscribe</a>
                                            </p>
                                            <p class="text-main" style="margin: 0; color: #4b5563; font-size: 11px;">
                                                &copy; {{ date('Y') }} TechyNews. Distributed from the Matrix.
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                    </table>
                    <!--[if (gte mso 9)|(IE)]>
                    </td></tr></table>
                    <![endif]-->
                </td>
            </tr>
        </table>
    </center>
</body>
</html>
